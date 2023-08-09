
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInAnonymously , onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, onDisconnect, onValue, onChildAdded } from "firebase/database";

import Home from './Home';

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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase();

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Home/>
        
      </header>
    </div>
  );
}

function randomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getKeyString(x, y){
  return `${x}x${y}`;
}

const playerColors = ["red", "orange", "yellow", "banana", "lime", "green", "teal", "cyan", "blue", "purple", "violet", "pink", "white", "gray", "black", "brown", "beige"]



function createName() {
  const prefix = randomFromArray([
    "COOL",
    "RANDOM",
    "SILLY",
    "SMART",
    "UNDEAD",
    "SAVAGE",
    "VENOMOUS",
    "DUSK",
    "SPICY",
    "REGAL",
    "ENLIGHTENED",
    "MYSTERIOUS",
    "KING",
    "GREAT",
    "DARK",
    "BIG",
    "RICH"
  ]);
  const thing = randomFromArray([
    "ONE",
    "CODER",
    "MOUSE",
    "JOKER",
    "GOAT",
    "HOUND",
    "KITSUNE",
    "MENECE",
    "CHERRY",
    "RACER",
    "RABBIT",
    "SHEEP",
    "KINGHT",
    "EAGLE",
    "VULTURE",
    "ZEBRA",
    "SAUCE",
    "GALAXY",
    "ANARCH",
    "RAVEN"

  ]);
  return `${prefix} ${thing}`
}

(function () {
  
  let playerId;
  let playerRef;


  function initGame() {
    const allPlayerRef = ref(database, 'players');
    const allPointsRef = ref(database, 'points');
    
    onValue(allPointsRef, (snapshot) => {
      
    });
  
    onChildAdded(allPlayerRef, (data) => {
      const addedPlayer = data.val();
      const charElement = document.createElement("div");
      charElement.classList.add("Character", "grid-cell");
      if(addedPlayer.id === playerId){
        charElement.classList.add("you");
      }
    });
  }

  onAuthStateChanged(auth, (user) => {
    console.log(user)
    if (user) {
      //You're logged in
      playerId = user.uid;
      const name = createName();
      playerRef = ref(database, `players/${playerId}`)
      set(playerRef, {
        id: playerId,
        name,
        color: randomFromArray(playerColors),
        points: 0,
      });
      
      // Write a string when this client loses connection
      onDisconnect(playerRef).remove();
      // ...
      initGame();
    } else {
      //You're logged out
    }
  });
  signInAnonymously(auth)
  .then(() => {
    // Signed in..
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });
})();

export default App;
