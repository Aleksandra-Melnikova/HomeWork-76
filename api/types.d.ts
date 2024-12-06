export interface Message{
    message: string;
    author: string;
    id: string;
    datetime: string;
}

export interface  MessageWithoutIdAdnDate {
    message:string,
    author:string
}