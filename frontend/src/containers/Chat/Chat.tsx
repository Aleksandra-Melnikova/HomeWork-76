import FormAddNewMessage from "../../components/FormAddNewMessage/FormAddNewMessage.tsx";
import MessageItem from "../../components/MessageItem/MessageItem.tsx";
import { useCallback, useEffect, useState } from "react";
import { IMessage } from "../../types";
import Container from "react-bootstrap/Container";

const Chat = () => {
  const url = "http://146.185.154.90:8000/messages";
  const [messages, setMessages] = useState<IMessage[]>([]);

  const fetchData = async (url: string) => {
    const response = await fetch(url);
    if (response.ok) {
      let messages: IMessage[] = (await response.json()) as IMessage[];
      messages = messages.map((post) => {
        return {
          _id: post._id,
          datetime: post.datetime,
          author: post.author,
          number: 1,
          message: post.message,
        };
      });
      setMessages(messages);
      window.scrollTo(0, document.body.scrollHeight);
    }
  };

  useEffect(() => {
    fetchData(url).catch((e) => console.error(e));
  }, []);

  let date = "";
  if (messages.length > 0) {
    date = messages[messages.length - 1].datetime;
  }

  const getNewMessages = useCallback(async () => {
    try {
      const messagesNewItem = await fetch(url + `?datetime=${date}`);
      const messagesNew: IMessage[] =
        (await messagesNewItem.json()) as IMessage[];
      if (messagesNew.length === 0) {
        console.log("Новых сообщений нет");
      } else if (messagesNew.length !== 0) {
        const copyMessages = [...messages];

        for (let i = 0; i < messagesNew.length; i++) {
          copyMessages.push(messagesNew[i]);
        }
        setMessages(copyMessages);

        window.scrollTo(0, document.body.scrollHeight);
      }
    } catch (error) {
      alert(error);
    }
  }, [date, messages]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getNewMessages();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [getNewMessages]);

  return (
    <div>
      <Container>
        <h1 className="p-4 fs-2 text-center ">Chat</h1>
      </Container>
      <Container style={{ position: "relative" }}>
        <div id="messagesAll">
          {messages.map((message) => (
            <MessageItem
              key={message._id}
              message={message.message}
              _id={message._id}
              datetime={String(new Date(message.datetime))}
              author={message.author}
            />
          ))}
        </div>
        <div id="formBlock" className="mt-3 mb-2 pt-1">
          <FormAddNewMessage />
        </div>
      </Container>
    </div>
  );
};

export default Chat;
