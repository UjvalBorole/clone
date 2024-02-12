import { createContext, useContext, useState, useEffect } from "react"
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc,getDocs,getDoc,doc } from "firebase/firestore"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth"
import { useNavigate } from "react-router-dom";

const FirebaseContext = createContext(null);
export const useFirebase = ()=> useContext(FirebaseContext);


const firebaseConfig = {
    apiKey: "AIzaSyA2h6iRhJUwOyezYxdGgIKIHmazHfyGOv8",
    authDomain: "filmyverse-2fc0f.firebaseapp.com",
    projectId: "filmyverse-2fc0f",
    storageBucket: "filmyverse-2fc0f.appspot.com",
    messagingSenderId: "581011139478",
    appId: "1:581011139478:web:dbf1390e78d8aec6378bb7",
    measurementId: "G-KCY5YQLQR2"
};

//instances
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp)
const googleProvider = new GoogleAuthProvider();
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

//functions
export const FirebaseProvider = (props) => {
const [user,setUser] = useState(null);

useEffect(()=>{
    onAuthStateChanged(firebaseAuth, (user)=>{
        if(user)setUser(user);
        else setUser(null);
    })
},[])

const signUpWithEmailandPassword = (email,password) =>{
    createUserWithEmailAndPassword(firebaseAuth ,email,password)
}

const signIn = (email,password) =>{
    signInWithEmailAndPassword(firebaseAuth,email,password);
}

const signInWithGoogle = () =>signInWithPopup(firebaseAuth,googleProvider);

const handleCreateNewData= async(title, year,rating, coverpic, description)=>{
    const imageref = ref(storage,`uploads/images/${Date.now()}-${coverpic.name}`);
    const uploadResult = await uploadBytes(imageref,coverpic);
    await addDoc(collection(firestore,'movies'),{
        title,
        year,
        rating,
        description,
        imageURL: uploadResult.ref.fullPath,
    })
    
};

const listAllMovies = () =>{
    return getDocs(collection(firestore,"movies"))
}


const getMoviesById = async(id) =>{
    const docref = doc(firestore,'movies',id);
    const result = await getDoc(docref);
    return result;
}


const getImgURL = (path) => {
    return getDownloadURL(ref(storage, path));
  };
  const isLoggedIn = user ? true: false;

const signout = async() =>{
  await signOut(firebaseAuth).then(()=>{
    
  })
  
}

const userComments = async(id,comment,rating)=>{
    const collectionRef = collection(firestore,"movies",id,"userComment");
    const result = await addDoc(collectionRef,{
        userId:user.uid,
        user_email:user.email,
        user_comment:comment,
        user_rating:rating,
        timestamp:new Date().getTime(),
    })
    
}

const listAllMoviesComments = (id) =>{
    return getDocs(collection(firestore,"movies",id,"userComment"))
}

//exports
    return <FirebaseContext.Provider value={
        {
        signUpWithEmailandPassword,
        signIn,signout,
        isLoggedIn,
        signInWithGoogle,
            handleCreateNewData,
            listAllMovies,
            getImgURL,
            getMoviesById,
            userComments,
            listAllMoviesComments,
        }
    }>
        {props.children} 
    </FirebaseContext.Provider>
}
