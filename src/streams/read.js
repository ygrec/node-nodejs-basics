import { stdout } from 'node:process';
import {
    createReadStream,
  } from 'node:fs';

  const read = async () => {
    const streamRead = createReadStream("./src/streams/files/fileToRead.txt");

    streamRead.pipe(process.stdout);
};

await read();