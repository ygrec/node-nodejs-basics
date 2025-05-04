// n should be received from main thread
import { workerData, parentPort, MessagePort  } from 'worker_threads';

const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {
    console.log(workerData.number);

    const result = nthFibonacci(10);
    console.log("result from worker: " + result);
    
    parentPort.postMessage(result);
};

sendResult();