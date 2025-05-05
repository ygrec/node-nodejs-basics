import fs, {
  createReadStream,
  createWriteStream,
} from 'node:fs';

import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { pipeline } from 'node:stream/promises';


async function compress(currentPath, fileName, newFileName) {

  let fullPath = path.resolve(currentPath, currentFileName);
  let fullNewPath = path.resolve(currentPath, newFileName);

  try {
    if (!fs.existsSync(inputFile)) {
      throw new Error("Has no input file");
    }

    if (fs.existsSync(outputArchive)) {
      throw new Error("Output archieve already present on the file system");
    }

    const packedStream = createBrotliCompress();
    const inputStream = createReadStream(inputFile);
    const outputStream = createWriteStream(outputArchive);

    await pipeline(inputStream, packedStream, outputStream);

  } catch (err) {
    console.error(err);
  }
};


async function decompress(currentPath, fileName, newFileName) {

  let fullPath = path.resolve(currentPath, currentFileName);
  let fullNewPath = path.resolve(currentPath, newFileName);

  try {
    if (!fs.existsSync(fullPath)) {
      throw new Error("Has no input file");
    }

    if (fs.existsSync(fullNewPath)) {
      throw new Error("Output archieve already present on the file system");
    }

    const unpackedStream = createBrotliDecompress();
    const inputStream = createReadStream(fullPath);
    const outputStream = createWriteStream(fullNewPath);

    await pipeline(inputStream, unpackedStream, outputStream);

  } catch (err) {
    console.error(err);
  }

};