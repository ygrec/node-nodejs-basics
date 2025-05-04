import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { dirname } from 'path';
import { argv, env, stdin, stdout } from 'node:process';

import { logMsg, logInfo, logDbg } from '../utils.js';

var username = '';
const greetingString = 'Welcome to the File Manager';


function parseAgrsAndEnv() {
  // username can be passed to the NPM and loaded to the ENV of script
  const resultEnv = Object.entries(env)
    .filter(([key]) => key.startsWith('npm_config_username'))
    .map(([key, value]) => `${value}`);

  if (resultEnv[0]) {
    username = resultEnv[0];
    logDbg('Found the arg, passed through the NPM: ' + os.EOL + resultEnv, 'debug');
    return;
  }

  // username can be passed to the script via the CLI args or package.json
  // node main.js --username User1
  const args = argv.slice(2);
  const result = args
    .reduce((accumulator, nextValue, index) => {
      const key = nextValue;
      const value = args[index + 1];
      if (index % 2 === 0) accumulator.push(`${key} is ${value}`);
      return accumulator;
    }, [])
    .join(', ');

  if(result) {
    username = result;
    logDbg('Node ARGS is: ' + result, 'debug');
    return;
  }

  username = 'guest';
}

process.stdin.resume();

// We are using this single function to handle multiple signals
function exitHandler(signal) {
  const farewellString = `Thank you for using File Manager, ${username}, goodbye!`;

  logMsg(farewellString, 'important');
  process.exit();
}
 
process.on('SIGINT', exitHandler);


const startFileManager = async () => {

  parseAgrsAndEnv();

  logMsg(`${greetingString}, ${username}`, 'important');

  let currentPath = dirname(fileURLToPath(import.meta.url));
  logMsg("Current Path is " + currentPath + os.EOL + 'import as ' + import.meta.dirname,);

  stdin.on('data', (chunk) => {
    logDbg(`Received chunk ${chunk}`);
    const command = chunk.toString().trim().split(' ');
    switch (command[0]) {
      case 'up':
        logDbg('cmd UP parsed');
        break;
      case 'cd':
        logDbg('cmd CD parsed');
        break;
      case '.exit':
        logDbg('cmd EXIT parsed, close the filemanager');
        // stdin.destroy();
        exitHandler();
        break;
      default:
        logMsg(`Unknown command \"${command[0]}\", please, try again!`, 'important');
        break;
    }
  });
};

await startFileManager();
