const path =  require('path');
const  fs = require('fs');
const  csv = require('fast-csv');
const readline = require("readline");
const { createImageName, downloadAndSaveImage } = require('./util/DownloadImage');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function download(date = getDateFormatted()){
  console.log(' --- Begin ---');
  
  const newsDay =  path.resolve(__dirname, '..', 'tmp', 'CSVs', `${date ? date : getDateFormatted()}.csv`);
  const file = fs.createReadStream(newsDay);
  
  let news = new Array(); 

  const fileRead = csv.parse({ 
    headers: true, 
    delimiter: ','
    })
    .on('error', error => console.error(error))
    .on('data', (row) => {
    news.push(row);
    })
    .on('end', () => {

    news.forEach(async n => {
      const url = n.imageLink;
      const imageName = await createImageName(n.name, n.prefix, 6);
      
      try {
        await downloadAndSaveImage(url, imageName, date ? date : getDateFormatted(), 800, 450);
      } catch (error) {
        console.log(' --- ');
        console.log(`[imageLink]: ${url}`);
        console.log(`[name]: ${n.name}`);;
        console.log(' --- ');
        console.log(' ');
      }
    })
    });

    file.pipe(fileRead);

}

function getDateFormatted(){
  const now = new Date();

  const month = (now.getMonth() + 1) < 10 ? `0${now.getMonth() + 1}`: now.getMonth() + 1;
  const monthDay = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate();

  return `${month}_${monthDay}`;

}

function main(){

  rl.question("Digite o nome do arquivo CSV: ", async function(input) {
    file = input;
    await download(input);
  }); 

}

main();