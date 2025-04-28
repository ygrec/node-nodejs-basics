import fs, {
    createReadStream,
    createWriteStream,
  } from 'node:fs';

  import { createGzip } from 'node:zlib';
  import { pipeline } from 'node:stream/promises';
    
  
const compress = async () => {
    const inputFile = "./src/zip/files/fileToCompress.txt";
    const outputArchive = "./src/zip/files/archive.gz";
    
    try {
        if (!fs.existsSync(inputFile)) {
          throw new Error("Has no input file");
        }

        if(fs.existsSync(outputArchive)) {
            throw new Error("Output archieve already present on the file system");
        }

        const packedStream = createGzip();
        const inputStream = createReadStream(inputFile);
        const outputStream = createWriteStream(outputArchive);
    
        await pipeline(inputStream, packedStream, outputStream);
    
      } catch (err) {
        console.error(err);
      }
};

await compress();