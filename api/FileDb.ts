import { promises as fs } from 'fs';
import {Product, ProductWithoutId} from "./types";
import crypto from 'crypto';


const fileName = './db.json';
let data: Product[] = [];

const fileDb = {
    async init() {
        try {
            const fileContents = await fs.readFile(fileName);
            data = await JSON.parse(fileContents.toString()) as Product[];
        } catch (e) {
            data = [];
        }
    },
    async getItems() {
        return data;
    },
    async addItem(item: ProductWithoutId) {
        const id = crypto.randomUUID();
        const product = {id, ...item}
        data.push(product);
        await this.save();
        return product;
    },
    async save() {
        return fs.writeFile(fileName, JSON.stringify(data));
    }
};



export default fileDb;

