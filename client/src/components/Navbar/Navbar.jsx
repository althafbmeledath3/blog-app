import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import axios from "axios";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleProfileClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleWriteClick = () => {
    navigate('/write');
  };

  const logout = ()=>{
    localStorage.clear()
    navigate("/login")
  }

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const [username, setUsername] = useState("");

    useEffect(() => {
      async function getuser() {
        const id = localStorage.getItem('id');
        try {
          const response = await axios.get(`http://localhost:3000/api/getuser/${id}`);
          setUsername(response.data.username); 
        } catch (error) {
          console.error("Failed to fetch user:", error);
        }
      }

      getuser();
    }, []); 


  return (
    <nav className="navbar">
      <div className="nav-left">
        <h1 className="logo">Blog Spot</h1>
        <div className="search-container">
          <svg
            className="search-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
          <input
            type="text"
            placeholder="Search blogs"
            className="search-input"
          />
        </div>
        <span className="welcome-message">Welcome , {username} </span>
      </div>
      <div className="nav-right">
        <button className="icon-button write-button" onClick={handleWriteClick}>
          <svg
            className="icon write-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 4H7a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3v-4m-1.586-8.586a2 2 0 010 2.828L12.828 13H12v-2.828l6.586-6.586a2 2 0 012.828 0z"
            ></path>
          </svg>
          <span className="write-text">Write</span>
        </button>
        <button className="icon-button">
          <svg
            className="icon bell-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            ></path>
          </svg>
        </button>

        <div className="profile-container" ref={dropdownRef}>
          <img
            src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg"
            alt="Profile"
            className="profile-pic"
            onClick={handleProfileClick}
          />
          {dropdownOpen && (
            <div className="dropdown-menu">
              <button
                className="dropdown-item"
                onClick={() => {
                  navigate('/profile');
                  setDropdownOpen(false);
                }}
              >
                Profile
              </button>
              <button onClick={logout} className="dropdown-item">Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;