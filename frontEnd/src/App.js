

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import Home from './Home';
import ContentSettings from "./ContentSettings";
import NotFound from "./NotFound";
import Header from "./Header";
import About from './About';
import DisplaySettings from './DisplaySettings';

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

  const [contentConfig, updateCC] = useState();
  const [displayConfig, updateDC] = useState();
  return (
    
    <div className="App">
      <Header/>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home contentSettings={contentConfig} displaySettings={displayConfig} />}/>
          <Route exact path="/about" element={<About />}/>
          <Route path="/content_settings" element={<ContentSettings contentConfig={contentConfig} updateCC={updateCC} />}/>
          <Route path="/display_settings" element={<DisplaySettings displayConfig={displayConfig} updateDC={updateDC} />}/>
          <Route path="*" element={<NotFound/>} />// Make Not Found Element Later
        </Routes>
      </Router>
    </div>
  );
}



export default App;
