import React, { useState, useEffect, useRef } from "react";
//import SignOut from "./SignOut";
import { db, auth } from "../firebase";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import SendMessage from "./SendMessage";
import pp from "../img/pp.png"

function Chat() {
  const scroll = useRef();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const q = query(
        collection(db, "messages"),
        orderBy("createdAt"),
        limit(50)
      );

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
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-100 text-gray-800">
      <div className="flex flex-col flex-grow w-full bg-white shadow-xl rounded-lg overflow-hidden mb-28">
        <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
          {messages.map(({ id, text, photoURL, uid, email }) => (
            <div
              className={`${
                uid === auth.currentUser.uid
                  ? "flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end"
                  : "flex w-full mt-2 space-x-3 max-w-xs"
              }`}
              key={id}
            >
              <div className="lex-shrink-0 h-10 w-10 rounded-full bg-gray-300 ">
                <img
                  src={photoURL ? photoURL : pp}
                  alt=""
                  className="h-auto w-auto mt-{20px} rounded-full"
                />
              </div>
              <div
                className={`${
                  uid === auth.currentUser.uid
                    ? "bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg"
                    : "bg-gray-300 p-3 rounded-r-lg rounded-bl-lg"
                }`}
              >
                <p
                  className={`${
                    uid === auth.currentUser.uid
                      ? "text-sm text-white"
                      : "text-sm text-blue-500"
                  }`}
                >
                  {email}
                </p>
                <p className="text-lg">{text}</p>
              </div>
            </div>
          ))}
          <SendMessage />
        </div>
      </div>
    </div>
  );
}

export default Chat;
