import path from 'path';
import fs from "fs"
function scanDirectory(dir: string, apis: string[]): void {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
            scanDirectory(filePath, apis);
        } else if (filePath.endsWith('.ts') && !filePath.includes('.d.ts')) {
            apis.push(`./src/${path.relative('./src', filePath)}`);
        }
    }
}

const swaggerAPIsFiles: string[] = [];
scanDirectory('./src', swaggerAPIsFiles);
// console.log(swaggerAPIsFiles)
export default swaggerAPIsFiles