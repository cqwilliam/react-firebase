import { useEffect, useState } from "react";
import "./styles.css";
import Auth from "./components/Auth";
import { db, auth, storage } from "./config/firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

const App = () => {
  const [movieList, setMovieList] = useState([]);

  //New movie states
  const [newMovietitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [newMovieOscar, setNewMovieOscar] = useState(true);

  //update movie state
  const [updateTitle, setUpdateTitle] = useState("");

  // File Upload state
  const [fileUpload, setFileUpload] = useState(null)

  const moviesCollectionRef = collection(db, "movies");

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovietitle,
        releaseDate: newReleaseDate,
        receivedAnOscar: newMovieOscar,
        userId: auth?.currentUser?.uid,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
  };

  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: updateTitle });
  };

  useEffect(() => {
    const getMovieList = async () => {
      try {
        const data = await getDocs(moviesCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setMovieList(filteredData);
      } catch (err) {
        console.error(err);
      }
    };
    getMovieList();
  }, [onSubmitMovie]);

const uploadFile =async ()=>{
  if (!fileUpload) return
  const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`)
try{

  await uploadBytes(filesFolderRef, fileUpload)
} catch(err){
  console.error(err)
}
}

  return (
    <div className="container">
      <Auth />
      <div>
        <input
          placeholder="Movie Date..."
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          placeholder="Releace Data..."
          type="number"
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
        />
        <input
          type="checkbox"
          checked={newMovieOscar}
          onChange={(e) => setNewMovieOscar(e.target.checked)}
        />
        <label htmlFor="Recivend an Oscar"></label>
        <button onClick={onSubmitMovie}>submit movie</button>
      </div>
      <div>
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h1 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>
              {movie.title}{" "}
            </h1>
            <p>Date: {movie.releaseDate} </p>
            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
            <input
              placeholder="new Title..."
              onChange={(e) => setUpdateTitle(e.target.value)}
            />
            <button onClick={() => updateMovieTitle(movie.id)}>update</button>
          </div>
        ))}
      </div>
      <div>
        <input type="file" onChange={(e)=> setFileUpload(e.target.files[0])}/>
        <button onClick={uploadFile}>Upload File</button>
      </div>
    </div>
  );
};

export default App;
