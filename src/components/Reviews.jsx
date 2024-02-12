import React, { useContext, useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { TailSpin, ThreeDots } from 'react-loader-spinner'
import { useFirebase } from "../firebase/firebase"


const Reviews = ({id}) => {
    const firebase = useFirebase();
    const [comment,setComment] = useState();
    const [rating,setRating] = useState();
    const [loading,setLoading] = useState(false);
    const [commentloading,setCommentLoading] = useState(false);
    const [moviesComment,setMoviesComment] = useState([]);

    const handleShare = async()=>{
        setLoading(true)
        await firebase.userComments(id,comment,rating);
        setLoading(false)
    }

    useEffect(()=>{
        setCommentLoading(true)
         firebase.listAllMoviesComments(id).then((comment)=>setMoviesComment(comment.docs));
         setCommentLoading(false);
    },[loading])
    
    

  return (
    <div className='mt-4 border-t-2 border-gray-700 w-full'>
        <ReactStars
            size={30}
            half={true}
            value={rating}
            onChange={(rate)=>setRating(rate)}
        />
        <input 
            value={comment}
            onChange={(e)=>setComment(e.target.value)}
            placeholder='Share Your thoughts...'
            className='w-full p-2 outline-none header'
        />
        <button onClick={handleShare}  className='bg-green-600 flex justify-center w-full p-2'>
        {loading==true? <TailSpin height={20} color="white" /> :  'Share'}
        
        </button>

        
            {commentloading==true?<div className='mt-6 flex justify-center'><ThreeDots height={10} color="white" /></div>:''}
        
        <div className='mt-4'>
                
                
                    {moviesComment.map((movie)=>(
                        <div className=' p-2 w-full border-b header bg-opacity-50 border-gray-600 mt-2' >
                        <div className='flex items-center'>
                            <p className='text-blue-500'>{movie.data().user_email}</p>
                            <p className='ml-3 text-xs'>{new Date(movie.data().timestamp).toLocaleString()}</p>
                        </div>
                        <ReactStars
                            size={15}
                            half={true}
                            value={movie.data().user_rating}
                            edit={false}
                        />

                        <p>{movie.data().user_comment}</p>
                    </div> ))}    
                
            
        </div>
        
    </div>
  )
}

export default Reviews