export interface IInputMessage {
  author: string;
  message: string;
}

export interface IMessage {
  id: string;
  author: string;
  datetime: string;
  message: string;
}

export interface IMessageWithDate {
  id: string | undefined;
  author: string;
  datetime: string;
  message: string;
}
