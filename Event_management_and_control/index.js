const { EventHandler } = require('./utils/EventHandler');
const { Create, DeleteFolder,Read,GetRandNumber,ReadFiles } = require('./functions');


async function Main() {



  await DeleteFolder('files');

  for (let i = 1; i <= 5; i++) {
    await Create(i, `text${i}text${i}text${i}`);
  }

  EventHandler.CreateEvent('READ_FILE', (msg) => { console.log(msg) });

  EventHandler.CreateEvent('END_PROGRAM', (msg) => { console.log(msg) });

  EventHandler.RunEvent('READ_FILE', [await Read(GetRandNumber())]);

  EventHandler.RunEvent('END_PROGRAM', await ReadFiles());

}

Main();
