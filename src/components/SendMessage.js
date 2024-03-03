import React, { useState } from "react";
import { db, auth } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Input, Button } from "@mui/material";

function SendMessage({ scroll }) {
  const [msg, setMsg] = useState("");
  const sendMessage = async (event) => {
    event.preventDefault();
    if (msg.trim() === "") {
      alert("Enter valid message");
      return;
    }
    const { uid, photoURL, email } = auth.currentUser;
    await addDoc(collection(db, "messages"), {
      text: msg,
      photoURL,
      uid,
      email,
      createdAt: serverTimestamp(),
    });
    setMsg("");
  };
  return (
    <form onSubmit={(event) => sendMessage(event)}>
      <div className="bg-gray-300 p-4 fixed bottom-0 w-full">
        <input
          className="flex items-center h-10 w-full rounded px-3 text-sm"
          type="text"
          placeholder="Type your message…"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <Button variant="contained" type="submit" mr-sm-2>
          Send
        </Button>
      </div>
    </form>
  );
}

export default SendMessage;
