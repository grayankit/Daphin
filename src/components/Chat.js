import React, { useState, useEffect ,useRef } from "react";
//import SignOut from "./SignOut";
import { db ,auth } from "../firebase";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import SendMessage from "./SendMessage";
import Navbar from "./Navbar";
 

function Chat() {
  const scroll = useRef()
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const q = query(collection(db, "messages"), orderBy("createdAt"), limit(50));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const messageData = [];
        snapshot.forEach((doc) => {
          messageData.push({ id: doc.id, ...doc.data() });
          // console.log(messageData)
        });
        setMessages(messageData);
      });

      return unsubscribe;
    };

    fetchMessages();
  }, []);

  return (
    <div>
    <Navbar/>
     
    <div className="msgs">
        {messages.map(({ id, text, photoURL, uid , email }) => (
            <div>
              
              {/* <h1>{localStorage.getItem('user')}</h1> */}
                <div key={id} className={`msg ${uid === auth.currentUser.uid ? 'sent' : 'received'}`}>
                    <h4>{email}</h4>
                    <img src={photoURL}   />
                    <p>{text}</p>
                </div>
            </div>
        ))}
    </div>
    <SendMessage scroll={scroll} />
    <div ref={scroll}></div>
</div>
  );
}

export default Chat;
