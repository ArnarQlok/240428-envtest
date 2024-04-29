/* Vi börjar med att: 

* klona repot
* Logga in på firebase
* Skapa ett projekt
- - Döp projekt: firebase-lektion
- - Nej till analytics onödig komplexitet just nu.
* Gå igenom menyn
* Välj webb setup
- - Registera vår app: firebase-lektion
* Vi får kod som vi ska lägga till i vår kod.
- - npm install firebase
- - /app/firebase.js

1-5. FIREBASE.JS

2. Firestore Database i console.firebase.google.com

6-11. MovieList - Skapa funktionalitet för get/read


12: VISA GROCERY APP SOM ÄR KOPPLAD MED FIREBASE:

13-14: FIREBASE
UTMANINGEN ÄR ATT NU KAN VEM SOM HELST LÄGGA IN FILMER I VÅR APP.
EN Enklare lösning på detta är att endast tillåta inloggade användare att skapa, radera, uppdatera.
* Vi behöver alltså skapa inloggnignsmöjlighet frö appen.
* Sen kan vi anpassa våra regler i databasen.
*

15-16 AUTH.

17-19 MovieList

20 AUTH

*/

import "./App.css";
import Auth from "./components/Auth";
import MovieList from "./components/MovieList";
import ProtectedRoute from "./components/ProtectedRoute";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Auth />} />
      <Route path="/" element={<MovieList />} />
    </Routes>
  );
}

export default App;
