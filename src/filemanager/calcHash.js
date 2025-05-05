import createReadStream from 'node:fs';
import createHash from 'node:crypto';

export async function calculateHash(filePath) {
  try {
    const hash = createHash('sha256');

    const input = createReadStream(filePath);
    input.on('readable', () => {
      const data = input.read();
      if (data)
        hash.update(data);
      else {
        console.log(`${hash.digest('hex')}`);
      }
    });
  } catch (error) {
     log.logMsg(`Hash calculation error ${error.code}`);
  }
};
