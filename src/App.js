import "./App.css";
import Chat from "./components/Chat";
import SignIn from "./components/SignIn";
import { auth } from "./firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import Navbar from "./components/Navbar.js";
import { ToastContainer } from "react-toastify";

function App() {
  const [user] = useAuthState(auth);
  return (
    <>
        <Navbar />
        <ToastContainer />
      <div className="flex items-center my-[13rem] mx-[26rem]">{user ? <Chat /> : <SignIn />}</div>
    </>
  );
}

export default App;
