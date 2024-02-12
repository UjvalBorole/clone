import React, { useEffect, useState } from 'react'
import { useFirebase } from "../firebase/firebase"
import ReactStars from "react-stars";
import { Link } from 'react-router-dom';


const Cards = (props) => {
    const [url,setUrl] = useState();
    const firebase = useFirebase();

    useEffect(()=>{
    firebase.getImgURL(props.imageURL).then((url)=>{
    
    setUrl(url)
    });
    },[props.imageURL])

// console.log(url)
  return (
    <Link to={`/detail/${props.id}`}><div  className="card font-medium shadow-lg p-2 hover:-translate-y-3 cursor-pointer mt-6 transition-all duration-500">
             <img className="h-60 md:h-72" src={url} />
             <h1>
               {props.title}
             </h1>
             <h1 className="flex items-center">
               <span className="text-gray-500 mr-1">Rating:</span>
               <ReactStars
                 size={20}
                 half={true}
                 value={props.rating}
                 edit={false}
               />
             </h1>
             <h1>
               <span className="text-gray-500">Year:</span> {props.year}
             </h1>
           </div></Link> 
  )
}

export default Cards