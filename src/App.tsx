import { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  Timestamp,
} from 'firebase/firestore';

import { addMessage, deleteMessage, setMessages } from './redux/messagesSlice';


import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { db } from './firebase';
import Notification from './components/Notification';






function App() {
  const [inputValue, setInputValue] = useState('');

  const { messages, loading } = useSelector((state: any) => state.messages);

  const dispatch = useDispatch();


  useEffect(() => {
    const itemsRef = collection(db, "messages");

    // get messages real time from firebase
    const unsubscribe = onSnapshot(itemsRef, (querySnapshot) => {
      dispatch(setMessages(
        querySnapshot.docs.map((doc) => {
          const data = doc.data();
          const { timestamp } = data;
          const now = Timestamp.now().toMillis();
          const timeLeft = timestamp ? now - timestamp : 0;

          return ({ ...data, text: data.message, id: doc.id, timestamp, timeLeft })
        })
      ))
    })

    return () => unsubscribe();
  }, [dispatch]);


  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch<any>(addMessage(inputValue));
    setInputValue('');
  };


  const handleDelete = useCallback(async (id: string) => {

    dispatch<any>(deleteMessage(id));

  }, [dispatch]);


  return (
    <div className="container">
      <div className="notifications-space">
        <div className="notifications-list">
          {messages.length ? messages.toSorted((a, b) => b.timeLeft - a.timeLeft).map((item, index) => (
            <Notification msg={item} key={item.id} handleDelete={handleDelete} index={index} />
          )) : null}
        </div>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input
            className='input'
            autoFocus
            required
            type="text"
            placeholder="Enter a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button disabled={loading} type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;


