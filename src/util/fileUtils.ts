import fs from 'fs';
import readline, { ReadLine } from 'readline';

/**
 * opens the file with UTF characters compatible with UTF-8
 * @param filePath 
 */
export function getFileReader(filePath: string): ReadLine {

    return readline.createInterface({
        
        input: fs.createReadStream(filePath, 'utf-8').on('error', (err) => {
            console.log(`not able to open the file ${filePath}`);
        })
    });
}
