/*
1. Vi npm install firebase
* Vi ser i package.json och att firebase är installerat
Vi klistrar in koden från firebaste
* Vi kollar på koden
- - initializeApp används för att koppla upp oss mot firebase.
- - Vi kan installera cli om vi vill men inte resten kring hosting.

2. Firestore Database i console.firebase.google.com
- Vi går in till Firstore sidan och klickar create database
- Vi väljer Europa som region
- Här är lite regler kring tillåtelse att hämta och skriva till databasen.
- -  Vi går igenom det mer om en stund.

3. Nu är vi inne i panel vyn för vår nya databas
- Collection är en tabell, vi kan jämföra det med en endpoint till ett API
- - Det heter collection i MongoDB som ni ska lära er nästa kurs också.
- - Vi skapar en som heter movies för vi ska lista filmer.

4. Nu vill den ha ett dokument.
* Det är en film helt enkelt
* En collection innehåller documents.
- - Vi skapar en film: The imitation game
* Vi sparar och nu blir det mer synligt för oss med vår databas

5. - Nu vill vi bygga/read funktionalitet för att displaya datan från databasen i vår app.
* Vi importerar metoden getFireStore från firebase.
Vi skapar en constant som heter db = getFireStore(app). Här finns vår databas.

6. Nu kan vi hämta data från vår databas, så låt oss gå till MovieList komponenten så vi kan list ut våra filmer.

13: FIREBASE
* VI backar i konsol.firebase.com
* Build > Authentication.
* Den lättaste är faktiskt Google så vi börjar med den.
Klicka på Google.
Klicka på enable
Skriv en random email här.
* Det var allez

*14. Vi behöver importera auth från firebase i firebase.js
*Med den kan vi skicka med app objektet och sätta upp auth på vår sida.
*Utöver det hämtar vi GoogleAuthProvider för att hantera specifikt gmail inloggnign.
* Vi lagrar den i en constant som vi exporterar och går sen över till Auth.jsx

*/

//1 
import { initializeApp } from "firebase/app";

//14
import { getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_REACT_APP_FIREBASE_APP_ID
};


//1
const app = initializeApp(firebaseConfig);
// console.log(app);

// 5
export const db = getFirestore(app);
// console.log(db)

export const auth = getAuth(app);
//14
export const googleProvider = new GoogleAuthProvider();