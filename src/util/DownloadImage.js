const path = require('path');
const imageDownload = require('image-downloader');
const gm = require('gm');

const replaceSpecialChars = (str) => {
	return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove accents
		.replace(/([^\w]+|\s+)/g, '_') //Replaces space and other characters with a hyphen
		.replace(/\-\-+/g, '_')	// Replace multiple hyphens with a single hyphen
		.replace(/(^_+|_+$)/, ''); // Remove extra hyphens from the end or beginning of the string
}

function createImageName(name, prefix, quantidadePalavras = 3){
  name = name.split(' ');

  prefix = prefix ? replaceSpecialChars(prefix) + '-' : '';

  var fullName = '';

  if(name.length - 1 < quantidadePalavras){
    quantidadePalavras = name.length;
  }

  for(var i = 0; i < quantidadePalavras; i++){
    fullName = fullName + ' ' + name[i];
  }
  
  fullName = replaceSpecialChars(fullName);

  fullName = prefix + fullName.trim() + '.png';

  return fullName;
  
}

async function downloadAndSaveImage(url, imageName, paste, width, height){
  try {
    if(await (imageDownload.image({
      url: url,
      dest: path.resolve(__dirname, '..', '..', 'tmp', 'image', paste, imageName)
    }))){
      console.log("- Success download " + imageName);
      await convertImage(imageName, paste, width, height);
    }
    return true;
  } catch (error) {
    throw new Error('- Error download: ' + imageName);
  }

}

async function convertImage(imageName, paste, width = 800, height = 450) {
  
  return new Promise((resolve, reject) => {
    const inputFile = path.resolve(__dirname, '..', '..', 'tmp', 'image', paste, imageName);
    const outputFile = path.resolve(__dirname, '..', '..', 'tmp', 'image', paste, 'converted', `${imageName}`);

    var imageMagick = gm.subClass({ imageMagick: true });


    imageMagick()
    .in(inputFile)
    .out('(')
      .out('-clone')
      .out('0')
      .out('-background', 'white')
      .out('-blur', '0x9')
      .out('-resize', `${width}x${height}^`)
    .out(')')
    .out('(')
      .out('-clone')
      .out('0')
      .out('-background', 'white')
      .out('-resize', `${width}x${height}`)
    .out(')')
    .out('-delete', '0')
    .out('-gravity', 'center')
    .out('-compose', 'over')
    .out('-composite')
    .out('-extent', `${width}x${height}`)
    .write(outputFile, (error) => {
      if (error) {
        console.log('- Error manipulated: ' + imageName + ' ');
      }else{
        console.log("- Success manipulated:  " + imageName);
      }
    })

  });
}


module.exports = { createImageName, downloadAndSaveImage}