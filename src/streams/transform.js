import { stdin, stdout } from 'node:process';
import {
    Transform,
} from 'node:stream';

const streamTransform = new Transform({ decodeStrings: true,
    transform(chunk, encoding, done) {
        if(chunk.byteLength <= 2 ) {
            process.stdin.destroy();
            done();
        }
        else {
            console.log("Origin  is " + chunk.toString());     
            const reverseChunk = chunk.toString().split("").reverse().join("");
            console.log("Reverse is " + reverseChunk);
            this.push(reverseChunk);
            done();
        }
    },
});

const transform = async () => {
    stdin.pipe(streamTransform).pipe(stdout);
    stdin.on('end', () => process.exit(exitCode));
};

await transform();