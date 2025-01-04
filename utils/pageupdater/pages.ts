import * as fs from 'node:fs';
import * as path from 'node:path';
import * as crypto from 'node:crypto';
import fm, { type FrontMatterResult } from 'front-matter';

export interface PageInfoMetdata {
    title?: string;
    description?: string;
    date?: string;
    tags?: string[];
    background?: string;
    next?: string ;
    previous?: string;
}

// Type for metadata and page info
export interface PageInfo {
    local_path: string;
    absolute_path: string;
    metadata: PageInfoMetdata;
    hash: string;
    char_count: number;
    word_count: number;
    path: string;
}

// Function to get metadata from a file
function getMetadata(filePath: string): PageInfoMetdata {
    const fileContent = fs.readFileSync(filePath).toString();
    return fm(fileContent).attributes as PageInfoMetdata
}

// Function to get SHA-256 hash of a file
function getSha256Hash(filePath: string): string {
    const fileContent = fs.readFileSync(filePath);
    const hash = crypto.createHash('sha256');
    hash.update(fileContent.toString());
    return hash.digest('hex');
}

// Function to get character count of a file
function getCharCount(filePath: string): number {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return fileContent.length;
}

// Function to get word count of a file
function getWordCount(filePath: string): number {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return fileContent.split(/\s+/).length;
}

// Function to get pages info
export function getPagesInfo(searchDirectory: string, rootDirectory: string): Record<string, PageInfo> {
    const pageInfo: Record<string, PageInfo> = {};
    const currentDirectory = path.join(rootDirectory, searchDirectory);
    const files = fs.readdirSync(currentDirectory);

    files.forEach((file) => {
        const fullPath = path.join(currentDirectory, file);
        const localPath = fullPath.replace(rootDirectory, '');

        if (fs.lstatSync(fullPath).isDirectory()) {
            Object.assign(pageInfo, getPagesInfo(path.join(searchDirectory, file), rootDirectory));
        } else if (file.endsWith('.md')) {
            const metadata = getMetadata(fullPath);
            const sha256Hash = getSha256Hash(fullPath);
            const charCount = getCharCount(fullPath);
            const wordCount = getWordCount(fullPath);

            pageInfo[fullPath] = {
                local_path: localPath,
                absolute_path: fullPath,
                metadata: metadata,
                hash: sha256Hash,
                char_count: charCount,
                word_count: wordCount,
                path: fullPath
            };
        }
    });

    return pageInfo;
}
