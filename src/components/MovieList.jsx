/* 
6. Nu kan vi importera db constanten som vi nyss skapade.
* Vi importerar en specifik metod som vi kan använda för att hämta datan i vår databas. getDocs!

7. Vi laddar in datan i en const med hjälp av getDocs.
* Vi kommer behöva skicka med och specificera vilken collection den ska hämta dokument ifrån.
* Detta gör vi genom att importera en till metod från firebase som praktiskt nog heter collection.
* Vi skapar en constmovieCollection = collection(db, "movies");
- Vi testar att konsol loggar.
- - Vi har inte permission.
- -  Det har med reglerna att göra. Byt false till true.
_ _ Vi fixar det och nu får vi console.

8. vi kan skapa en constant som heter data där vi mappar upp alla filmer i en egen array vi kan använda i appen.
- console.log
* VI sätter vår movieList state med den här datan. Då kommer vi kunna mappa ut filmerna.
* Nu visar vi våra filmer! Vår READ är KLAR

// CREATE
9. Nu bygger kopplingen till skapandet av filmer. Vår CREATE.
* Som vi lärt oss under kursens gång. Vi kommer behöva ta state från alla inputs och skapa ett nytt objekt som vi skickar till databasen.
* Vi bygger funktionaliteten i vår handleAddMovie.
- Vi behöver importera en till metod från firebase. addDoc
- - Det blir en hel del importer men som tur är är de bra döpta så det är lätt att förstå vad som händer.
* I vår try gör vi await addDoc
- Vi skickar med collection referensen vi gjort tidigre.
- Vi skickar med ett objekt med rätt properties enligt vad vi döpt det till i firebase och sedan fyller med våra states
* Vi behöver inte sätta id för firebase gör det åt oss automatiskt.
* SNAPSHOT ELLER LÖSNINGEN ATT TA UT UR USEEFFECT.
* NU TESTAR VI ATT SKAPA EN FILM OCH DET GÖR DET:
* Nu har vi Update och Delete kvar.

// DElETE
10. För att radera behöver vi återigen importera en metod. Och föga förvånande heter den deleteDoc
* Som vanligt behöver vi leta upp den specifika filmen/dokumentet som ska raderas från databasen med hjälp av ID vi skickat med.
*Vi behöver dock importera en till funktion för att hämta ett enda dokument från databasen. DOC
*TIll den skickar vi db, movies och id.
*Nu kan vi radera den som vi hämtat med DOc

// Update
*11. Detsamma gäller i vår handleUpdateMovie.
* Vi använder samma doc
* Vi importerar updateDoc
* Men utöver måste vi skicka med ett objekt med specifikt de parameterarna som ska uppdateras.
* Firebase ser till så att inte de övriga parameterarna skrivs över när vi bara skickar en property.
Det här är en buggig lösning dock, men vi ska fokusera på firebase så försöker skriva allt i den här komponenten.
VI ÄR KLARA MED VÅR CRUD.

12.VISA GROCERY APP lösning.
13. RULES


17. 
* Vi behöver importera auth objektet från firebase.js filen i vårt projekt
* Vi hämtar userId med hjälp av auth och skickar med det som ett property i våra filmobjekt i handleAddMovie.
* Vi raderar våra tidigare filmer och skapar en ny, så ser vi om den har ett userID

* 18. Nu kan vi skriva om reglerna i vår firestore med hjälp av userId 
* allow read if false. Då ser vi inget men kan skapa.
* Vi låter alla reada.
* Sen sätter vi inloggningskrav på write, update och delete.
* VI testar skapa och radera inloggad och utloggad.

19. Vi har tid över så vi kan även skapa möjlighet att skapa egna användare med autentisering.
För att kunna använda egen inloggning behöver vi först aktivera det i konsol.firebase.com - skipa passwordless
* Vi har redan importerat getAuth i Firebase.js och det är allt vi behöver så vi kan jobba från Auth.jsx


*/

import { useEffect, useState } from "react";

// 6
import { db, auth /* 17 */ } from "../app/firebase";
import {
  getDocs, //6
  collection, //7
  addDoc, //9
  onSnapshot, //9,5
  deleteDoc, //10
  updateDoc,
  doc,
} from "firebase/firestore";

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);

  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);

  const [updatedTitle, setUpdatedTitle] = useState("");

  // 7
  const movieCollectionReference = collection(db, "movies");

  const getMovieList = async () => {
    try {
      // 7
      const response = await getDocs(movieCollectionReference);
      //console.log(data);

      // 8
      const data = response.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(data);
      setMovieList(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const handleAddMovie = async () => {
    try {
      // 9
      await addDoc(movieCollectionReference, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedAnOscar: isNewMovieOscar,
        //17
        userId: auth?.currentUser?.uid, //17
      });
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteMovie = async (id) => {
    try {
      //10
      const movieDoc = doc(db, "movies", id);
      await deleteDoc(movieDoc);
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };
  const handleUpdateMovie = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await updateDoc(movieDoc, { title: updatedTitle });
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main>
      <h1>Movie List</h1>
      <div>
        <input
          type="text"
          placeholder="Movie title..."
          value={newMovieTitle}
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Release Date..."
          value={newReleaseDate}
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
        />
        <input
          id="checkbox"
          type="checkbox"
          checked={isNewMovieOscar}
          onChange={(e) => setIsNewMovieOscar(e.target.checked)}
        />
        <label htmlFor="checkbox">Recieved an Oscar</label>
        <button onClick={handleAddMovie}>Submit Movie</button>
      </div>
      <ul style={{ listStyle: "none" }}>
        {movieList.map((movie) => (
          <li key={movie.id}>
            <h3>
              {movie.title} ({movie.releaseDate})
            </h3>
            <p>{movie.receivedAnOscar ? "Has an Oscar" : "No Oscar"}</p>
            <button onClick={() => handleDeleteMovie(movie.id)}>
              Delete Movie
            </button>
            <br />
            <input
              type="text"
              placeholder="update title"
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <button onClick={() => handleUpdateMovie(movie.id)}>
              Update Title
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default MovieList;
