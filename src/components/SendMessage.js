import React, { useState } from 'react'
import { db, auth } from '../firebase'
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Input, Button } from '@mui/material'
 

function SendMessage({ scroll }) {
    const [msg, setMsg] = useState('')
    const sendMessage = async (event) => {
        event.preventDefault();
        if (msg.trim() === "") {
          alert("Enter valid message");
          return;
        }
        const { uid,   photoURL , email } = auth.currentUser;
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
        <form onSubmit={(event) => sendMessage(event)} className="send-message">
                <Input style={{ width: '78%', fontSize: '15px', fontWeight: '550', marginLeft: '5px', marginBottom: '-3px' }} placeholder='Message...' type="text" value={msg} onChange={(e) => setMsg(e.target.value)} />
                 <Button variant="contained" type='submit' mr-sm-2>Send</Button> 
      </form>

    )
}

export default SendMessage