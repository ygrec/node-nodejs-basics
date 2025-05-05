import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { argv, env, stdin, stdout } from 'node:process';

import * as navigation from './navigation.js';
import * as files from './file_operations.js';
import { osInfo } from './os_info.js';
import { calculateHash } from './calcHash.js';

import * as log from '../utils.js';

var username = '';
var currentPath = import.meta.dirname;
const greetingString = 'Welcome to the File Manager';


function parseAgrsAndEnv() {
  // username can be passed to the NPM and loaded to the ENV of script
  const resultEnv = Object.entries(env)
    .filter(([key]) => key.startsWith('npm_config_username'))
    .map(([key, value]) => `${value}`);

  if (resultEnv[0]) {
    username = resultEnv[0];
    log.logDbg('Found the arg, passed through the NPM: ' + os.EOL + resultEnv, 'debug');
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

  if (result) {
    username = result;
    log.logDbg('Node ARGS is: ' + result, 'debug');
    return;
  }

  username = 'guest';
}

process.stdin.resume();

// We are using this single function to handle multiple signals
function exitHandler(signal) {
  const farewellString = `Thank you for using File Manager, ${username}, goodbye!`;

  log.logMsg(farewellString, 'important');
  process.exit();
}

process.on('SIGINT', exitHandler);


const startFileManager = async () => {

  parseAgrsAndEnv();

  log.logMsg(`${greetingString}, ${username}`, 'important');
  navigation.status(currentPath);

  stdin.on('data', async (chunk) => {
    log.logDbg(`Received chunk ${chunk}`);
    const command = chunk.toString().trim().split(' ');
    switch (command[0]) {
      case 'up':
        log.logDbg('cmd UP parsed');

        await navigation.navigateUp(currentPath)
          .then((newPath) => {
            currentPath = newPath;
          })
          .catch((error) => {
            log.logErr(error + 'Can`t navigate UP! keep currentPath ' + currentPath);
          });

        break;
      case 'cd':
        let newPath = command[1];
        log.logDbg('cmd CD parsed, new path is ' + newPath);

        await navigation.changeDir(currentPath, newPath)
          .then((newPath) => {
            currentPath = newPath;
          })
          .catch(() => {
            log.logMsg('Error!!!!!');
          });

        break;
      case 'ls':
        navigation.listDir(currentPath);
        break;

      case 'cat':
        await files.listFile(currentPath, command[1]);
        break;
      case 'add':
        await files.createFile(currentPath, command[1]);
        break;
      case 'mkdir':
        await files.createDir(currentPath, command[1]);
        break;
      case 'rn':
        await files.renameFile(currentPath, command[1]);
        break;
      case 'cp':
        await files.copyFile(currentPath, command[1], command[2]);     //Stream
        break;
      case 'mv':
        await files.moveFile(currentPath, command[1], command[2]);     //Stream
        break;
      case 'rm':
        await files.deleteFile(currentPath, command[1]);
        break;

      case 'os':
        await osInfo(command[1]);
        break;

      case 'hash':
        await calculateHash(currentPath, command[1]);
        break;

      case 'compress':
        await compress(currentPath, command[1], command[2]);
        break;
      case 'decompress':
        await decompress(currentPath, command[1], command[2]);
        break;

      case '.exit':
        log.logDbg('cmd EXIT parsed, close the filemanager');
        // stdin.destroy();
        exitHandler();
        break;
      default:
        log.logMsg(`Unknown command \"${command[0]}\", please, try again!`, 'important');
        break;
    }
    navigation.status(currentPath);
  });
};

await startFileManager();
