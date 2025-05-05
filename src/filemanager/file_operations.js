import fs_p from 'node:fs/promises';
import path from 'node:path';

import * as log from '../utils.js';

export async function listFile(currentPath, filename) {
    try {
        let fullPath = path.resolve(currentPath, filename);
        await fs_p.access(fullPath);

        const content = await fs_p.readFile(fullPath, { encoding: 'utf8' });
        console.log(content.toString());

        return fullPath;
    } catch (err) {
        log.logErr(`Operation failed ${err} - List the file content \"${filename}\"`);
    }
}

export async function createFile(currentPath, fileName) {
    // try {
    //     let fullPath = path.resolve(currentPath, filename);
    //     if (!fs.existsSync(fullPath)) {
    //         throw new Error("FS operation failed");
    //     }
    //     readFile(fullPath, (err, data) => {
    //         if (err) throw err;
    //         console.log(data.toString());
    //     });

    // } catch (err) {
    //     throw new Error("FS operation failed");
    // }
}


export async function createDir(currentPath, dirName) {
    try {
        let fullPath = path.resolve(currentPath, dirName);
        await fs_p.mkdir(fullPath, { recursive: true });

        return fullPath;
    } catch (err) {
        log.logErr(`Operation failed ${err} - Create dir \"${dirName}\"`);
    }
}

export async function renameFile(currentPath, currentFileName, newFileName) {
    // try {
    //     let fullPath = path.resolve(currentPath, currentFileName);
    //     let fullNewPath = path.resolve(currentPath, newFileName);

    //     await fs_p.copyFile(fullPath, fullNewPath);

    // } catch (err) {
    //     log.logErr(`Pperation failed - Move file \"${fullPath}\" to the \"${fullNewPath}\"`);
    // }
}

export async function copyFile(currentPath, currentFileName, newFileName) {
    // try {
    //     let fullPath = path.resolve(currentPath, currentFileName);
    //     let fullNewPath = path.resolve(currentPath, newFileName);

    //     // TODO refactor to use the Stream API
    //     await fs_p.copyFile(fullPath, fullNewPath);

    // } catch (err) {
    //     log.logErr(`Operation failed ${err} - Copy file \"${fullPath}\" to the \"${fullNewPath}\"`);
    // }
}

export async function moveFile(currentPath, currentFileName, newFileName) {
    try {
        let fullPath = path.resolve(currentPath, currentFileName);
        let fullNewPath = path.resolve(currentPath, newFileName);

        // TODO refactor to use the Stream API
        await fs_p.copyFile(fullPath, fullNewPath);

        return fullNewPath;
    } catch (err) {
        log.logErr(`Operation failed ${err} - Move file \"${currentFileName}\" to the \"${newFileName}\"`);
    }
}


export async function deleteFile(currentPath, fileName) {
    try {
        let fullPath = path.resolve(currentPath, fileName);

        await fs_p.rm(fullPath);
    } catch (err) {
        log.logErr(`Operation failed ${err} - Delete file \"${fullPath}\"`);
    }
}
