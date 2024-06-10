import { configureStore } from '@reduxjs/toolkit';
import messagesReducer from './redux/messagesSlice';

const store = configureStore({
    reducer: {
        messages: messagesReducer,
    },
});

export default store;
