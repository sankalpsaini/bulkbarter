import logo from "./logo.svg";
import "./App.css";

import SignIn from "./pages/login";
import Dashboard from "./pages/dashboard";
import { collection, addDoc } from "firebase/firestore";
import {db} from './firebase_setup/firebase';

import Landing from "./pages/landing";


function App() {
  return (
    <main>
      <Landing />
    </main>
  );
}

export default App;
