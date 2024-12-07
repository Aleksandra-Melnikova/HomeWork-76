import React, { useCallback, useEffect, useState } from "react";
import { IInputMessage } from "../../types";
import { createMessage } from "../../thunks/MessagesThunk.ts";
import { useAppDispatch } from "../../app/hooks.ts";
import { toast } from "react-toastify";
import Grid from "@mui/material/Grid2";
import { Box, Button, TextField } from '@mui/material';

const FormAddNewMessage = () => {
  const [inputMessage, setInputMessage] = useState<IInputMessage>({
    author: "",
    message: "",
  });
  const dispatch = useAppDispatch();
  // const isAddLoading = useAppSelector(selectAddLoading);
  const [buttonClicked, setButtonClicked] = useState(false);

  const changeInputMessage = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setInputMessage((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      inputMessage.author.trim().length > 0 &&
      inputMessage.message.trim().length > 0
    ) {
      setInputMessage({
        ...inputMessage,
        author: inputMessage.author,
        message: inputMessage.message,
      });
      setButtonClicked((prevState) => !prevState);
    } else {
      alert("Fill all fields.");
    }
  };

  const postNewMessage = useCallback(async () => {
    if (
      inputMessage.author.trim().length > 0 &&
      inputMessage.message.trim().length > 0
    ) {
      await dispatch(createMessage(inputMessage));
      toast.success("Message added successfully!");
      setInputMessage({
        author: "",
        message: "",
      });
    }
  }, [dispatch, inputMessage]);

  useEffect(() => {
    postNewMessage().catch((e) => console.error(e));
  }, [buttonClicked, postNewMessage]);

  return (
    <Box marginBottom={2} >
      <form onSubmit={submitForm}>
        <Grid size={12} marginTop={3} marginBottom={1}>
          <TextField
            fullWidth
            rows={4}
            id="decoded"
            label="Your name"
            value={inputMessage.author}
            onChange={changeInputMessage}
            name="author"
          />
        </Grid>
        <Grid size={8}>
          <TextField
            fullWidth
            multiline
            rows={4}
            id="message"
            label="Your message:"
            value={inputMessage.message}
            onChange={changeInputMessage}
            name="message"
          />
        </Grid>
        <Box marginTop={1} marginBottom={4}><Button variant={'contained'} type={"submit"} >Send</Button></Box>
      </form>
    </Box>
  );
};

export default FormAddNewMessage;
