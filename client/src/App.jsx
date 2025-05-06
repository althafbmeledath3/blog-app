import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {Routes,Route,BrowserRouter} from "react-router-dom"
import Home from './components/home/Home';
import Profile from './pages/profile/Profile';
import Signup from './pages/signup/signup';
import Login from './pages/login/Login';
import WriteBlog from './pages/write-section/write';



function App() {
 
  return (

    <>
    
    <BrowserRouter>
    
      <Navbar />

      <Routes>

        <Route path="/" element={<Home/>} />
        
        <Route path="/profile" Component={Profile} />

        <Route path='/signup' Component={Signup}/>

        <Route path='/login' Component={Login}/>

        <Route path='/write' Component={WriteBlog}/>
      </Routes>

    </BrowserRouter>

    </>
  );
}

export default App;






