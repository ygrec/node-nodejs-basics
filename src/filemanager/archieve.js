import fs, {
  createReadStream,
  createWriteStream,
} from 'node:fs';
import path from 'node:path';
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { pipeline } from 'node:stream/promises';


export async function compress(currentPath, currentFileName, newFileName) {

  if( currentFileName == undefined || newFileName == undefined)
    return undefined;

  let fullPath = path.resolve(currentPath, currentFileName);
  let fullNewPath = path.resolve(currentPath, newFileName);

  try {
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Has no input file ${fullPath}`);
    }

    if (fs.existsSync(fullNewPath)) {
      throw new Error("Output archieve already present on the file system");
    }

    const packedStream = createBrotliCompress();
    const inputStream = createReadStream(fullPath);
    const outputStream = createWriteStream(fullNewPath);

    await pipeline(inputStream, packedStream, outputStream);

  } catch (err) {
    console.error(err);
  }
};

export async function decompress(currentPath, currentFileName, newFileName) {

  if( currentFileName == undefined || newFileName == undefined)
    return undefined;

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