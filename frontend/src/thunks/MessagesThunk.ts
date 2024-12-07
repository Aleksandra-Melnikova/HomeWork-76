import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../axiosApi.ts";
import { IInputMessage, IMessage } from "../types";

export const fetchAllMessages = createAsyncThunk<IMessage[], void>(
  "messages/fetchAllMessages",
  async () => {
    const productsResponse = await axiosApi.get<IMessage[]>("/messages");
    return productsResponse.data || [];
  },
);

export const fetchMessagesLsatDateTime = createAsyncThunk<IMessage[], string>(
  "messages/fetchMessagesLsatDateTime",
  async (date) => {
    const productsResponse = await axiosApi.get<IMessage[]>(
      "/messages" + `?datetime=${date}`,
    );
    return productsResponse.data || [];
  },
);

export const createMessage = createAsyncThunk<void, IInputMessage>(
  "messages/createMessage",
  async (IInputMessage) => {
    return axiosApi.post("/messages", IInputMessage);
  },
);
