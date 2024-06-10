import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase';


export interface Message {
  text: string;
  id: string;
  timeLeft: number;
  timestamp: number;
}

export interface MessagesState {
  messages: Message[];
  loading: boolean;
}

const initialState: MessagesState = {
  messages: [],
  loading: false,
};


export const addMessage = createAsyncThunk<void, string, { rejectValue: string }>(
  'messages/addMessage',
  async (text, { rejectWithValue }) => {
    try {
      const itemsRef = collection(db, 'messages');
      const timestamp = Timestamp.now().toMillis();


      await addDoc(itemsRef, { text, timestamp });
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteMessage = createAsyncThunk<void, string, { rejectValue: string }>(
  'messages/deleteMessage',
  async (id, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, 'messages', id));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(addMessage.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addMessage.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = state.messages.filter((msg) => msg.id !== action.meta.arg);
      })
      .addCase(deleteMessage.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
