import os from 'node:os';
import path from 'path';
import { Worker, MessageChannel } from 'worker_threads';


const performCalculations = async () => {

    const workerScriptPath = import.meta.url;
    const startComputationValue = 10;

    console.log(os.cpus().length);

    const worker = new Worker('./src/wt/worker.js', {workerData: {number: startComputationValue}} );
    worker.on('message', (data) => {
        console.log("data from main: " + data);
    });

    worker.postMessage(10);
};

await performCalculations();
