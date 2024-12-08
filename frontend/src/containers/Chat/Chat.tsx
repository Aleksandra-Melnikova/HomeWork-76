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

const Chat = () => {
  const messages = useAppSelector(selectMessages);
  const dispatch = useAppDispatch();
  const isAllFetchLoading = useAppSelector(selectFetchLoading);

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
    const options = {
      duration: 500,
      smooth: true,
    };
    animateScroll.scrollToBottom(options);
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
              {messages.map((message) => (
                <MessageItem
                  key={message.datetime + message.id}
                  message={message.message}
                  datetime={dayjs(message.datetime).format(
                    "YYYY-MM-DD hh:mm:ss",
                  )}
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
