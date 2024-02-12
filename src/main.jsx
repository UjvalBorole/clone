import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Link,
} from "react-router-dom";
import Show_Cards from './components/Show_Cards.jsx';
import AddMovie from './components/AddMovie.jsx';
import Detail from './components/Detail.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import { FirebaseProvider } from './firebase/firebase.jsx';





const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<App/>}>
      <Route path="/" element={<Show_Cards />} />
      <Route path="addmovie" element={<AddMovie />}/>
      <Route path="/detail/:id" element={<Detail />}/>
      <Route path="login" element={<Login />}/>
      <Route path="signup" element={<Signup />}/>
      
    </Route>
  )
);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FirebaseProvider>
      <RouterProvider router={router} />
    </FirebaseProvider>
  </React.StrictMode>
)
