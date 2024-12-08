import { promises as fs } from 'fs';
import crypto from 'crypto';
import {Message ,MessageWithoutIdAdnDate} from "./types";

const fileName = './db.json';
let data: Message[] = [];

const fileDb = {
    async init() {
        try {
            const fileContents = await fs.readFile(fileName);
            data = await JSON.parse(fileContents.toString()) as Message[];
        } catch (e) {
            data = [];
        }
    },
    async getItems() {
        return data;
    },
    async addItem(item: MessageWithoutIdAdnDate) {
        const id = crypto.randomUUID();
        const datetime = new Date().toISOString();
        const message = {id, datetime, ...item};
        data.push(message);
        await this.save();
        return message;
    },
    async save() {
        return fs.writeFile(fileName, JSON.stringify(data));
    }
};

export default fileDb;

