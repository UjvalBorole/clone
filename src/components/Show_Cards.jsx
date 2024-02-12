import React, { useEffect, useState } from "react";
// import { Audio, ThreeDots } from "react-loader-spinner";
import { useFirebase } from "../firebase/firebase"
import Cards from "./Cards";
import { Link,useNavigate } from "react-router-dom";
const Show_Cards = () => {

  const [movies,setMovies] = useState([]);

  const navigate = useNavigate();
  const firebase = useFirebase();
  useEffect(()=>{
    firebase.listAllMovies().then((movie)=>setMovies(movie.docs));
  },[])
  
  useEffect(()=>{
    if(!firebase.isLoggedIn){
      navigate("login")
    }
  },[])

  return (
    <div className="flex flex-wrap justify-between px-3 mt-2">
    {/* <div className="w-full flex justify-center items-center h-96"><ThreeDots height={40} color="white" /></div>   */}
          {movies.map((movie)=>(
          <Cards key={movie.id} {...movie.data()} id={movie.id}/>
     ))}
     </div>

  )
}

export default Show_Cards