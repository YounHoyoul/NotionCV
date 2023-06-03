import Storage from '@file-storage/core';
import S3Driver, { S3DiskConfig } from '@file-storage/s3';
import LocalDriver, { LocalDiskConfig } from '@file-storage/local';
import { Stream } from 'stream';
import type StorageServiceInterface from '@/services/StorageServiceInterface'

export default class StorageService implements StorageServiceInterface {
    constructor() {
        Storage.config({
            defaultDiskName: process.env.FILESYSTEM_DISK || 'local',
            diskConfigs: [
                {
                    driver: LocalDriver,
                    name: 'local',
                    root: 'storage/app',
                } as LocalDiskConfig,
                {
                    driver: S3Driver,
                    name: 's3',
                    bucketName: process.env.AWS_BUCKET,
                    region: process.env.AWS_DEFAULT_REGION,
                    credentials: {
                        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
                        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
                    },
                } as S3DiskConfig
            ],
        });
    }

    async get(path: string): Promise<string> {
        return await this.streamToString(await Storage.get(path));
    }

    async put(data: string, path: string): Promise<void> {
        await Storage.put(Buffer.from(data, "utf-8"), path);
    }

    private streamToString(stream: Stream): Promise<string> {
        const chunks: Uint8Array[] = [];

        return new Promise((resolve, reject) => {
            stream.on('data', (chunk: Uint8Array) => chunks.push(Buffer.from(chunk)));
            stream.on('error', (err: Error) => reject(err));
            stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
        });
    }
}