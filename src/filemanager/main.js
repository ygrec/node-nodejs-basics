import { stdin } from 'node:process';


const startFileManager = async () => {

  stdin.on('data', (chunk) => {
    console.log(`Received chunk ${chunk}`);
    const command = chunk.toString().trim().split(' ');
    switch (command[0]) {
      case 'up':
        console.log('cmd UP parsed');
        break;
      case 'cd':
        console.log('cmd CD parsed');
        break;
      case '.exit':
        console.log('cmd EXIT parsed, close the filemanager');
        stdin.destroy();
        break;
      default:
        console.log(`Unknown command \"${command[0]}\", please, try again!`);
        break;
    }
  })
    .on('end', () => {
      console.log("Good bye!");
    });
};

await startFileManager();
