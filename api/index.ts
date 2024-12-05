import express from 'express';
import productsRouter from "./routes/products";
import fileDb from "./FileDb";
import fs = require('fs');

const app = express();
const port = 8000;
app.use(express.json());
app.use('/products', productsRouter);

const run = async () => {
    if(fs.existsSync('./db.json')){
        await fileDb.init();
    } else{
        fs.writeFileSync('./db.json', JSON.stringify([]));
    }

    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port} port!`);
    });
};

run().catch(console.error);

