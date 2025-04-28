import fs, {

    createReadStream,
    createWriteStream,
} from 'node:fs';

import { createGunzip } from 'node:zlib';
import { pipeline } from 'node:stream/promises';


const decompress = async () => {
    const inputArchive = "./src/zip/files/archive.gz";
    const outputFile = "./src/zip/files/fileToCompress.txt";

    try {
        if (!fs.existsSync(inputArchive)) {
            throw new Error("Has no input file");
        }

        if (fs.existsSync(outputFile)) {
            throw new Error("Output archieve already present on the file system");
        }

        const unpackedStream = createGunzip();
        const inputStream = createReadStream(inputArchive);
        const outputStream = createWriteStream(outputFile);

        await pipeline(inputStream, unpackedStream, outputStream);
    } catch (err) {
        console.error(err);
    }

};

await decompress();