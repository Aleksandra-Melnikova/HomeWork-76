import {promises as fs} from 'fs';

const fileName = './test.json';

interface FileContents {
    message: string;
}


const run = async () => {
    try {
        const fileContents = await fs.readFile(fileName);
        const result = await JSON.parse(fileContents.toString()) as FileContents;
        console.log('Message is:', result.message);
    } catch (err) {
        console.error(err);
    }
};

run().catch(console.error);