import FormAddNewMessage from "../../components/FormAddNewMessage/FormAddNewMessage.tsx";
import MessageItem from "../../components/MessageItem/MessageItem.tsx";
import { useCallback, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectMessages } from "../../slices/MessagesSlice.ts";
import {
  fetchAllMessages,
  fetchMessagesLsatDateTime,
} from "../../thunks/MessagesThunk.ts";

const Chat = () => {
  const messages = useAppSelector(selectMessages);
  const dispatch = useAppDispatch();

  const fetchMessages = useCallback(async () => {
    await dispatch(fetchAllMessages());
  }, [dispatch]);

  useEffect(() => {
    void fetchMessages();
  }, [fetchMessages]);

  let date = "";
  if (messages.length > 0) {
    date = messages[messages.length - 1].datetime;
  }

  const getNewMessages = useCallback(async () => {
    await dispatch(fetchMessagesLsatDateTime(date));
    // window.document.body.scrollHeight;

  }, [date, dispatch]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      void getNewMessages();
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
