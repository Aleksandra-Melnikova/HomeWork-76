import express from "express";
import fileDb from "../FileDb";
import { MessageWithoutIdAdnDate} from "../types";

const messageRouter = express.Router();

messageRouter.get('/', async (req, res) => {
    const dateQuery = req.query.datetime as string;
    const date = new Date(dateQuery);

    if(dateQuery){
        if(isNaN(date.getDate())) {
            res.status(400).send({"error": "Datetime is incorrect"});
        } else{
            const messagesLastDate = [];
            const messages = await fileDb.getItems();
            const index = messages.findIndex(message => message.datetime === dateQuery);
            if(index === -1){
                res.status(400).send({"error": "Is no such datetime "});
            }
            else{
                for(let i = index+1; i < messages.length; i++){
                    messagesLastDate.push(messages[i]);
                }
                res.send(messagesLastDate);
            }

        }
    } else{
        const messages = await fileDb.getItems();
        const messagesNew =[]
        for(let i=messages.length-1;i>=0;i--){
            if(messagesNew.length<30){
                messagesNew.push(messages[i]);
            }
        }
        res.send(messages);
    }

});

messageRouter.post('/', async (req, res) => {

    if(req.body.message && req.body.message.trim().length > 0 && req.body.author && req.body.author.trim().length > 0 ) {
        const message: MessageWithoutIdAdnDate= {
            message: req.body.message,
            author: req.body.author,
        };
        const savedMessages = await fileDb.addItem(message);
        res.send(savedMessages);
    }
    else {
        res.status(400).send({"error": "Author and message must be present in the request"});
    }



});

export default messageRouter;