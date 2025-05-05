import { opendir, readdir } from 'node:fs/promises';
// import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import * as log from '../utils.js';

export const list = async () => {
    try {
        const dir = await opendir('./src/fs/files');
        for await (const dirent of dir)
            console.log(dirent.name);

    } catch (err) {
        throw new Error("FS operation failed");
    }
};

export async function status(curDir) {
    log.logInfo(`You are currently in ${curDir}`);
}

export async function listDir(curDir) {
    try {
        const dir = await opendir(curDir);
        let index = 0;
        for await (const dirent of dir) {
            console.log(`#${index}\t` + (dirent.isDirectory() ? "Directory" : "File\t") + '\t' + dirent.name);
            index += 1;
        }
    } catch (error) {
        log.logMsg(`${error.code}. ${error}`, 'error');
    }
}

export async function changeDir(currentPath, newPath) {
    if (newPath == undefined)
        newPath = os.homedir;

    try {
        newPath = path.resolve(newPath);
    }
    catch (error) {
    try {
        newPath = path.join(currentPath, newPath);
    }
    catch (error) {
        console.log("It is not a directory path!");
        return currentPath;
    }}


    return newPath;
}

export async function navigateUp(currentPath) {
    let newPath = path.dirname(currentPath);
    console.log('old path ' + currentPath + os.EOL + 'new path ' + newPath);
    return await changeDir(currentPath, newPath);
}