import React, { useCallback, useState } from "react";
import { IInputMessage } from "../../types";
import { createMessage } from "../../thunks/MessagesThunk.ts";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { toast } from "react-toastify";
import Grid from "@mui/material/Grid2";
import { Box, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { selectAddLoading } from "../../slices/MessagesSlice.ts";

const FormAddNewMessage = () => {
  const [inputMessage, setInputMessage] = useState<IInputMessage>({
    author: "",
    message: "",
  });
  const isAddLoading = useAppSelector(selectAddLoading);
  const dispatch = useAppDispatch();
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputMessage((prevState) => {
      return { ...prevState, [name]: value };
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
      postNewMessage().catch((e) => console.error(e));
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

  return (
    <Box marginBottom={2}>
      <form onSubmit={submitForm}>
        <Grid size={12} marginTop={3} marginBottom={1}>
          <TextField
            fullWidth
            rows={4}
            id="decoded"
            label="Your name"
            value={inputMessage.author}
            onChange={inputChangeHandler}
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
            onChange={inputChangeHandler}
            name="message"
          />
        </Grid>
        <Box marginTop={1} marginBottom={4}>
          <LoadingButton
            disabled={isAddLoading}
            loading={isAddLoading}
            variant={"contained"}
            type={"submit"}
          >
            Send
          </LoadingButton>
        </Box>
      </form>
    </Box>
  );
};

export default FormAddNewMessage;
