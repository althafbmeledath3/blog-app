import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Routes, Route, BrowserRouter, useLocation } from 'react-router-dom';
import Home from './components/home/Home';
import Profile from './pages/profile/Profile';
import Signup from './pages/signup/signup';
import Login from './pages/login/Login';
import WriteBlog from './pages/write-section/write';
import axios from 'axios';
import EditProfile from './pages/editprofile/editprofile';
function App() {
  
  function MainLayout() {
    const location = useLocation();
   
    const hideNavbarRoutes = ['/login', '/signup'];

    return (
      <>
        {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/write" element={<WriteBlog />} />
          <Route path="/editprofile" element={<EditProfile />} />

        </Routes>
      </>
    );
  }

  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}

export default App;