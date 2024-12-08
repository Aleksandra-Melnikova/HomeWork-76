import FormAddNewMessage from "../../components/FormAddNewMessage/FormAddNewMessage.tsx";
import MessageItem from "../../components/MessageItem/MessageItem.tsx";
import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  selectFetchLoading,
  selectMessages,
} from "../../slices/MessagesSlice.ts";
import dayjs from "dayjs";

import {
  fetchAllMessages,
  fetchMessagesLsatDateTime,
} from "../../thunks/MessagesThunk.ts";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { animateScroll } from "react-scroll";
import { IMessageWithDate } from "../../types";

const Chat = () => {
  const messages = useAppSelector(selectMessages);
  const dispatch = useAppDispatch();
  const isAllFetchLoading = useAppSelector(selectFetchLoading);
  const messageWithDate: IMessageWithDate[] = [];

  const showMessageDateTime = (dateTime: string) => {
    const today = new Date();
    const yesterday = new Date();
    const roomLastMessageDate = new Date(dateTime);
    yesterday.setDate(today.getDate() - 1);

    if (dateTime) {
      if (yesterday.getDate() === roomLastMessageDate.getDate()) {
        return "yesterday";
      } else if (today.getDate() === roomLastMessageDate.getDate()) {
        return "today";
      } else if (today.getFullYear() === roomLastMessageDate.getFullYear()) {
        return dayjs(roomLastMessageDate).format("DD-MM hh:mm:ss");
      } else {
        return dayjs(roomLastMessageDate).format("DD-MM-YYYY hh:mm:ss");
      }
    }
  };

  messages.map((message) => {
    const newDate = showMessageDateTime(message.datetime);
    if (newDate) {
      messageWithDate.push({
        message: message.message,
        id: message.id,
        author: message.author,
        datetime: newDate,
      });
    }
  });

  const fetchMessages = useCallback(async () => {
    await dispatch(fetchAllMessages());
    const options = {
      duration: 500,
      smooth: true,
    };
    animateScroll.scrollToBottom(options);
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
  }, [date, dispatch]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      void getNewMessages();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [getNewMessages]);

  return (
    <Container maxWidth={"md"}>
      <Typography
        variant={"h3"}
        marginTop={3}
        marginBottom={3}
        align={"center"}
      >
        Chat
      </Typography>

      {isAllFetchLoading ? (
        <Box textAlign={"center"}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {" "}
          {messages.length === 0 && !isAllFetchLoading ? (
            <Typography align={"center"} variant="h6">
              No messages
            </Typography>
          ) : (
            <Box style={{ position: "relative" }}>
              {" "}
              {messageWithDate.map((message) => (
                <MessageItem
                  key={message.datetime + message.id}
                  message={message.message}
                  datetime={message.datetime}
                  author={message.author}
                />
              ))}
            </Box>
          )}
        </>
      )}
      <Box marginBottom={2} padding={3}>
        <FormAddNewMessage />
      </Box>
    </Container>
  );
};

export default Chat;
