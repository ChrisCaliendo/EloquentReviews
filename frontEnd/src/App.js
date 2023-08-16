
import { initializeApp } from "firebase/app";
import { Link } from "react-router-dom";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInAnonymously , onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, onDisconnect, onValue, onChildAdded } from "firebase/database";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './Home';
import ContentSettings from "./ContentSettings";
import NotFound from "./NotFound";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBPl2coccaktInR57SckWlbLXNwBYuFcI4",
  authDomain: "multiplayerdemo-80025.firebaseapp.com",
  databaseURL: "https://multiplayerdemo-80025-default-rtdb.firebaseio.com",
  projectId: "multiplayerdemo-80025",
  storageBucket: "multiplayerdemo-80025.appspot.com",
  messagingSenderId: "1009403325624",
  appId: "1:1009403325624:web:c03822b0c99dece61ad84d",
  measurementId: "G-B0LMJ4DP4N"
};


// Initialize Firebase


function App() {
  return (
    
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route path="/settings" element={<ContentSettings />}/>
          <Route path="*" element={<NotFound/>} />// Make Not Found Element Later
        </Routes>
      </Router>
    </div>
  );
}



export default App;
