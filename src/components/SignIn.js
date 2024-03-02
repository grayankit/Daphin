import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
//import { auth } from "../firebase";
import { Button } from "@mui/material";
//import image from "../img/log_bac.jpg";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";

function SignIn() {
  const auth = getAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(+user.email);
        alert("Succesfully created Account");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        //const errorMessage = error.message;
        alert(errorCode);
        // ..
      });
  };
  const signIn = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user.email;
        console.log(user);

        alert("Succesfully SignIn");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        //const errorMessage = error.message;
        alert(errorCode);
      });
  };

  function signInWithGoogle() {
    console.log("Attempting Google Sign In...");
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // Handle successful sign-in
        console.log("Sign-in successful:", result.user);
      })
      .catch((error) => {
        // Handle sign-in errors
        console.error("Error signing in with Google:", error);
      });
  }

  return (
    <div className="main">
      <div className="App">
        <input
          type="text"
          placeholder="Enter Your Email.."
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Enter Your Password.."
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button onClick={signUp}>Create Account</button>
        <button onClick={signIn}>Sign In</button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100vh",
          alignItems: "center",
        }}
      >
        <Button
          style={{
            padding: "7px",
            fontSize: "20px",
            borderRadius: "0",
            fontWeight: "60",
          }}
          variant="contained"
          onClick={signInWithGoogle}
        >
          Sign In With Google
        </Button>
      </div>
    </div>
  );
}

export default SignIn;
