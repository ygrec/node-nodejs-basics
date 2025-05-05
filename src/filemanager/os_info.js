import { opendir, readdir } from 'node:fs/promises';
// import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import * as log from '../utils.js';

export async function osInfo(domainName) {
    if (!domainName.startsWith('--')) {
        log.logErr('Wrong request for OS info.');
        return undefined;
    }

    switch (domainName.trim().slice(2)) {
        case 'EOL':
            console.log(`System EOL symbol is ${JSON.stringify(os.EOL)}`);
            break;
        case 'cpus':
            let cpuInfo = os.cpus();
            console.log(`CPU info: Number ${os.cpus().length}\n`);
            for (let i = 0; i < cpuInfo.length; i++) {
                console.log(`CPU # ${i}, model ${cpuInfo[i].model}, current speed ${cpuInfo[i].speed/1000} Ghz`);
            }
            break;
        case 'homedir':
            console.log(`System EOL symbol is \"${os.homedir}\"`);
            break;
        case 'username':
            console.log(`System EOL symbol is \"${os.userInfo().username}\"`);
            break;
        case 'architecture':
            console.log(`System EOL symbol is \"${os.arch()}\"`);
            break;
    }
};
