const { appendFile, readFile, mkdir, rm } = require('node:fs/promises');
const { existsSync } = require('node:fs');
const path = require('node:path');

async function DeleteFolder(folder) {
  try {
    //check if the folder "files" exists in the main project 
    if (existsSync(path.join(__dirname, folder)))
      await rm(path.join(__dirname, folder),{ recursive: true, force: true });

    console.log(`the folder ${folder} doesn't exists any more`);
  } catch (error) {
    console.error(error);
  }
}

async function Create(n, str) {
  try {
    //check if the folder "files" exists in the main project 
    if (!existsSync(path.join(__dirname, 'files')))
      await mkdir(path.join(__dirname, 'files'));

    await appendFile(path.join(__dirname, 'files', `file${n}.txt`), `${str}\n`);
    console.log(`file${n}.txt has been created/updated`);
  } catch (error) {
    console.error(error);
  }
}

async function Read(n) {
  try {
    let data = await readFile(path.join(__dirname, 'files', `file${n}.txt`));
    return data.toString();
  } catch (error) {
    console.error(error);
  }
}

//returns a number from 1 to 5
function GetRandNumber() {
  const MAX = 5, MIN = 1;
  return Math.round(Math.random() * (MAX - MIN) + MIN);
}





async function ReadFiles() {
  try {
    let txt = []
    //read all the files until file[n].txt
    for (let i = 1; i <= 5; i++) {
      txt[i] = await Read(i);
    }

    return(txt);

  } catch (error) {
    console.error(error);
    return txt;
  }

}

module.exports = { DeleteFolder, Create,Read,GetRandNumber,ReadFiles }