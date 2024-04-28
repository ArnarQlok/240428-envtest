// useEffect(() => {
//   // const movieCollectionReference = collection(db, "movies");

//   const unsubscribe = onSnapshot(
//     movieCollectionReference,
//     (snapshot) => {
//       const updatedMovieList = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setMovieList(updatedMovieList);
//       setNewMovieTitle("");
//       setNewReleaseDate("");
//       setIsNewMovieOscar(false);
//     },
//     (error) => {
//       console.error("Error fetching movie data:", error);
//     }
//   );

//   // Cleanup-funktion för att avbryta prenumerationen när komponenten avmonteras
//   return () => {
//     unsubscribe();
//   };
// }, []); // Tom beroendelista, så denna useEffect körs endast en gång vid första renderingen
