import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import Reviews from './Reviews'
import { useParams } from 'react-router-dom'
import { useFirebase } from "../firebase/firebase";
import { ThreeCircles } from 'react-loader-spinner'
import { Link, useNavigate } from "react-router-dom";


const Detail = () => {
  const [data,setData] = useState(null);
  const param = useParams();
  const [url,setUrl] = useState();

  const firebase = useFirebase();
  const navigate = useNavigate();


  useEffect(()=>{
    firebase.getMoviesById(param.id).then((value)=>setData(value.data()));
  },[])
  // console.log(data);
  useEffect(()=>{
    if(!firebase.isLoggedIn){
      navigate("login")
    }
  },[])


  useEffect(()=>{
    if(data){
    firebase.getImgURL(data.imageURL).then((url)=>{
    setUrl(url)
    });
  }
    },[data])

  return (
    <div className='p-4 mt-4 flex flex-col md:flex-row items-center md:items-start w-full justify-center'>
      
    {data == null?<div className='h-96 flex w-full justify-center items-center'><ThreeCircles height={30} color="white" />Loading</div>  :
      <>
      <img className='h-96 block md:sticky top-24' src={url} />

      <div className='md:ml-4 ml-0 w-full md:w-1/2'>
        <h1 className='text-3xl font-bold text-gray-400'> <span className='text-xl'>{data.title}</span></h1>

        <ReactStars
          size={20}
          half={true}
          value={data.rating}
          edit={false}
        />

        <p className='mt-2'>{data.description}</p>

        <Reviews id={param.id} prevRating={data.rating} userRated={data.rating} />
      </div>
      </>}
    
    </div>
  )
}

export default Detail