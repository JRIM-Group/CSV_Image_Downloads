# CSV Image Downloads

<img src="https://img.shields.io/badge/Versão-1.0.0-orange" alt="Version">

## Objetivo

 O objetivo desde script é levar um csv é baixar todas as imagens listadas.

## Dependências de nativas

* [NodeJs](https://nodejs.org/en/download/)
* [ImageMagick](https://imagemagick.org/script/download.php)

## Instruções

### Para clonar o repositório: 

* SSH: `git clone git@github.com:JRIM-Group/Download-and-edit-the-image.git`.
* HTTP: `git clone https://github.com/JRIM-Group/Download-and-edit-the-image.git`

### Para instalar as dependências

Executar na pasta de projeto: `yarn` ou `npm install`

### Instruções para o uso

#### Iniciar Script

Executar na pasta de projeto: `yarn start` ou `npm start`.

Entrar com o nome do arquivos de leitura (.csv). 

*Nome padrão é mês_dia da execução (Exemplo: 07_30)*

#### Estrutura de pastas

Os arquivos para leitura devem estar dentro da pasta: **tmp/CSVs**

Para que o download seja efetuado com sucesso é preciso ter uma pasta como o mesmo nome do arquivo lido em **tmp/image**

A pasta de destilo precisar ter uma pasta **converted** dentro dela. *Como a pasta de **exemple***

#### Estrutura do CSV

prefix | name | imageLink
--- | --- | --- |
Exemplo | Minha imagem de exemplo | https://avatars0.githubusercontent.com/u/67236922?s=200&v=4

As únicas "colunas" obrigatórias para estar no CSV são:  *prefix*; *name*; *imageLink*

**OBS:** O CSV preciso estar deparado por vírgula.

Dentro da pasta **tmp/CSVs** tem um arquivo de exemplo **exemple.csv** como a mesma esctrutura da tabela apresentada.
