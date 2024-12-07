import React, { useCallback, useEffect, useState } from "react";
import { IInputMessage } from "../../types";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { createMessage } from "../../thunks/MessagesThunk.ts";
import { useAppDispatch } from "../../app/hooks.ts";
import { toast } from "react-toastify";

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
    <div className="mb-3">
      <Form onSubmit={submitForm}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label column={"lg"}> Your name</Form.Label>
          <Form.Control
            name="author"
            type="text"
            placeholder="Enter your name"
            value={inputMessage.author}
            onChange={changeInputMessage}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label column={"lg"}>Your message:</Form.Label>
          <Form.Control
            name="message"
            type="text"
            value={inputMessage.message}
            onChange={changeInputMessage}
            as="textarea"
            rows={3}
          />
        </Form.Group>
        <Button className="ps-4 pe-4" variant="primary" type="submit">
          Send
        </Button>{" "}
      </Form>
    </div>
  );
};

export default FormAddNewMessage;
