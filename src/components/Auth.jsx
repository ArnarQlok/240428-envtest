/* 
15. Vi importerar auth och googleProvider 
* Vi behöver importera en metod från firebase. signInWithPopUp
* Vi har en knapp, man vill säkert ha en ikon etc här.
signInWithGoogle.
* Skriv funktionen.
* Vi konsol loggar email så vi ser att vi är inloggade.
* Vi kan faktiskt komma åtm vår gmail bild bland annat.

16. Vi kan skapa en logga ut funktion när vi ändå är i farten.
* Vi har knappen för det.
* Vi importerar en metod som heter sighOut.
* I funktionen behöver vi bara skicka auth till signOut.
* Om vi är utloggade console.log = undefined

17. Snart kan vi skriva om reglerna i firestore så att inte alla kan skapa data här. Vi fixar först lite i MovieList
* 

19. För att kunna använda egen inloggning behöver vi först aktivera det i konsol.firebase.com - skipa passwordless
* Vi har redan importerat getAuth i Firebase.js och det är allt vi behöver så vi kan jobba från Auth.jsx

*20 Sen måste en användare kunna registrera sig innan den har något att logga in med JU.
Vi importerar en lång men logisk metod createUserWithEmailAndPassword
* Vi använder den i vår handleCreateUser funktion.
Vi skickar med auth objektet och state för email och password.
* Vi testar. Kolla vi är inloggade.
- Men om vi loggar ut kan vi inte logga in igen. VARFÖR?

* 21: Vi importerar signInWithEmailAndPassword,
Vi använder den i handleSignIn
* Samma tänk som createUser.

* 22: Skulle ni vilja använda users i er react app. SKulle ni kunna skapa en collection för user och skapa ett dokument för dem baserat på infon som händer i vår handleCreateUser. 
* Jag rekommenderar att skita i det denna gång och endast göra det om ni har tid.
* Imorgon är det extra lektion hur vi hanterar asynkrona metoder i Redux. Endast för dem som pallar ingen obligatorisk lektion och den spelas in. 
- Kommer nog bli kortare!

*/

import { useState } from "react";
//15
import { db, auth, googleProvider } from "../app/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut, //16
  signInWithPopup, //15
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 15
  console.log(auth?.currentUser?.email);
  console.log(auth?.currentUser?.photoURL);
  console.log(auth?.currentUser?.uid);

  const userCollectionReference = collection(db, "users");

  const handleCreateUser = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      await addDoc(userCollectionReference, {
        authId: auth?.currentUser?.uid,
        mail: email,
      });
    } catch (err) {
      console.error("Error creating user:", err);
    }
  };

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User signed in:", userCredential.user);
    } catch (err) {
      console.error("Error signing in:", err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      //15
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = async () => {
    try {
      //16
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main>
      <h1>Authentication Page</h1>
      {auth?.currentUser?.email ? (
        <p>Inloggad: {auth?.currentUser?.email}</p>
      ) : (
        <p>Inte inloggad</p>
      )}
      <input
        type="email"
        placeholder="Email..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <br />
      <button onClick={handleCreateUser}>Create Account</button>
      <button onClick={handleSignIn}>Sign In</button>
      <button onClick={signInWithGoogle}>Sign in With Google</button>

      <button onClick={logOut}>Sign out</button>
    </main>
  );
};

export default Auth;
