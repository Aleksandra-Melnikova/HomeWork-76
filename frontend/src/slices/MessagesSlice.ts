import { createSlice } from "@reduxjs/toolkit";
import { IMessage } from "../types";
import { RootState } from "../app/store.ts";
import {
  createMessage,
  fetchAllMessages,
  fetchMessagesLsatDateTime,
} from "../thunks/MessagesThunk.ts";

interface MessagesState {
  messages: IMessage[];
  isFetchLoading: boolean;
  isAddLoading: boolean;
  isFetchMessagesLastDatetime: boolean;
}

const initialState: MessagesState = {
  messages: [],
  isFetchLoading: false,
  isAddLoading: false,
  isFetchMessagesLastDatetime: false,
};

export const selectFetchLoading = (state: RootState) =>
  state.messages.isFetchLoading;
export const selectAddLoading = (state: RootState) =>
  state.messages.isAddLoading;
export const selectMessages = (state: RootState) => state.messages.messages;

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllMessages.pending, (state) => {
      state.isFetchLoading = true;
    });
    builder.addCase(
      fetchAllMessages.fulfilled,
      (state, { payload: messages }) => {
        state.isFetchLoading = false;
        state.messages = messages;
      },
    );
    builder.addCase(fetchAllMessages.rejected, (state) => {
      state.isFetchLoading = false;
    });
    builder.addCase(fetchMessagesLsatDateTime.pending, (state) => {
      state.isFetchMessagesLastDatetime = true;
    });
    builder.addCase(
      fetchMessagesLsatDateTime.fulfilled,
      (state, { payload: messages }) => {
        state.isFetchMessagesLastDatetime = false;
        if (messages.length === 0) {
          console.log("No new messages");
        } else {
          messages.map((message) => {
            state.messages.push(message);
          });
        }
      },
    );
    builder.addCase(fetchMessagesLsatDateTime.rejected, (state) => {
      state.isFetchMessagesLastDatetime = false;
    });
    builder.addCase(createMessage.pending, (state) => {
      state.isAddLoading = true;
    });

    builder.addCase(createMessage.fulfilled, (state) => {
      state.isAddLoading = false;
    });

    builder.addCase(createMessage.rejected, (state) => {
      state.isAddLoading = false;
    });
  },
});
export const messagesReducer = messagesSlice.reducer;
