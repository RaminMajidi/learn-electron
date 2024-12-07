import osUtils from "os-utils";
import fs from "fs";
import os from "os";


const POLLING_INTERVAL = 500;

export function pollResource() {
    setInterval(async () => {
        const cpuUsage = await getCpuUsage();
        const ramUasge = getRamUsage();
        const storageData = getStorageData();
        console.log({ cpuUsage, ramUasge, storageUsage: storageData.usage });
    }, POLLING_INTERVAL);
}

export function getStaticData() {
    const totalStorage = getStorageData().total;
    const cpuModel = os.cpus()[0].model;
    const totalMemoryGB = Math.floor(osUtils.totalmem() / 1024);

    return {
        totalStorage,
        totalMemoryGB,
        cpuModel
    }
}

function getCpuUsage() {
    return new Promise(resolve => {
        osUtils.cpuUsage(resolve);
    });

}

function getRamUsage() {
    //freememPercentage()
    // این تابع میزان رم آزاد را بر میگرداند که یک عدد اعشاری بین 0 و 1 است
    // به همین دلیل آن را منهای 1 می کنیم تا میزان رم استفاده شده را بدست بیاوریم
    // 1 -  0.6814786991374752 = 0.3209190978865091
    return 1 - osUtils.freememPercentage();
}

function getStorageData() {
    // requires node 18
    const stats = fs.statfsSync(process.platform === 'win32' ? 'C://' : '/');
    const total = stats.bsize * stats.blocks;
    const free = stats.bsize * stats.bfree;

    return {
        total: Math.floor(total / 1_000_000_000),
        usage: 1 - free / total
    }
}