import React, { useEffect, useState } from "react";
import { IInputMessage } from "../../types";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const FormAddNewMessage = () => {
  const url = "http://146.185.154.90:8000/messages";
  const [inputMessage, setInputMessage] = useState<IInputMessage>({
    name: "",
    message: "",
  });
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
      inputMessage.name.trim().length > 0 &&
      inputMessage.message.trim().length > 0
    ) {
      setInputMessage({
        ...inputMessage,
        name: inputMessage.name,
        message: inputMessage.message,
      });
      setButtonClicked((prevState) => !prevState);
    } else {
      alert("Поле не должно быть пустым");
    }
  };
  useEffect(() => {
    const postNewMessage = async () => {
      const data = new URLSearchParams();
      if (
        inputMessage.name.trim().length > 0 &&
        inputMessage.message.trim().length > 0
      ) {
        data.set("message", inputMessage.message);
        data.set("author", inputMessage.name);

        await fetch(url, {
          method: "post",
          body: data,
        });
      }
    };
    postNewMessage().catch((e) => console.error(e));
    setInputMessage({
      name: "",
      message: "",
    });
  }, [buttonClicked]);

  return (
    <div className="mb-3">
      <Form onSubmit={submitForm}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label column={"lg"}> Your name</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="Enter your name"
            value={inputMessage.name}
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
