import { stdin } from 'node:process';
import {
    createWriteStream,
  } from 'node:fs';

  const write = async () => {
    const filename = "./src/streams/files/fileToWrite.txt";
    const streamWrite = createWriteStream(filename);

    console.log("Enter test to save into the " + filename + ". Press Enter and Ctrl+C to finish");
    stdin.pipe(streamWrite);
};

await write();