import React, { useContext, useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useFirebase } from "../firebase/firebase"
import { Link, useNavigate } from "react-router-dom";


const Login = () => {
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [loading,setLoading] = useState(false);
  const firebase = useFirebase();
  const navigate = useNavigate();

    const handleSignIn = ()=>{
      setLoading(true)
      firebase.signIn(email,password).then((userCredential) => {
        // Signed up 
        navigate("/")
        // ...
      })
      setLoading(false);
    }

    console.log(loading);
    

  return (
    <div className="w-full flex flex-col mt-8 items-center">
      <h1 className="text-xl font-bold">Login</h1>
      <div className="p-2 w-full md:w-1/3">
        <div className="relative">
          <label htmlFor="message" className="leading-7 text-sm text-gray-300">
            Email
          </label>
          <input
            type={"email"}
            id="email"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <div className="p-2 w-full md:w-1/3">
        <div className="relative">
          <label htmlFor="message" className="leading-7 text-sm text-gray-300">
            Password
          </label>
          <input
            id="password"
            name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <div className="p-2 w-full">
        <button
        onClick={handleSignIn}
          className="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg"
        >
          {loading==true?<TailSpin height={25} color="white" /> : "Login"}
        </button>
      </div>
      <div>
        <p>Do not have account? <Link to=""><span className="text-blue-500">Sign Up</span></Link></p>
      </div>
    </div>
  );
};

export default Login;
