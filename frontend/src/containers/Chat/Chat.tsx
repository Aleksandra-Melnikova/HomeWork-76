import FormAddNewMessage from "../../components/FormAddNewMessage/FormAddNewMessage.tsx";
import MessageItem from "../../components/MessageItem/MessageItem.tsx";
import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectMessages } from "../../slices/MessagesSlice.ts";
import dayjs from "dayjs";
import {
  fetchAllMessages,
  fetchMessagesLsatDateTime,
} from "../../thunks/MessagesThunk.ts";
import { Box, Container, Typography } from '@mui/material';



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
    <Container maxWidth={'md'}>
      <Typography variant={'h3'} marginTop={3} marginBottom={3} align={'center'} >Chat
      </Typography>
      <Box style={{ position: "relative" }}>
        <Box>
          {messages.map((message) => (
            <MessageItem
              key={message._id}
              message={message.message}
              _id={message._id}
              datetime={dayjs(message.datetime).format('YYYY-MM-DD hh:mm:ss') }
              author={message.author}
            />
          ))}
        </Box>
        <Box marginBottom={2} padding={3}>
          <FormAddNewMessage />
        </Box>
      </Box>
    </Container>
  );
};

export default Chat;
