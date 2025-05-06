import { useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/loadblogs");
        console.log(response.data.blogs[0].blog)//this is the array
        const newBlogs = response.data.blogs || [];

        // Update only if blogs are different to avoid re-renders
        setBlogs((prevBlogs) => {
          const sameLength = prevBlogs.length === newBlogs.length;
          const isSame = sameLength && prevBlogs.every((b, i) => b._id === newBlogs[i]._id);
          return isSame ? prevBlogs : newBlogs;
        });
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        console.error("Failed to load blogs:", errorMessage);
      }
    };

    loadBlogs();
  }, []);

  const handleLike = (index) => {
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog, i) =>
        i === index
          ? { ...blog, likes: [...(blog.likes || []), "like"] }
          : blog
      )
    );
  };


  useEffect(()=>{

    const id = localStorage.getItem("id")

    if(!id){

      navigate("/login")
    }
  })

  return (
    <div className="home-page">
      <h1 className="home-title">Featured Blogs</h1>
      <div className="blog-list">
        {blogs.length === 0 ? (
          <p className="no-blogs">No blogs available</p>
        ) : (
          blogs.map((blog, index) => (
            <div key={blog._id || index} className="blog-card">
              <div className="blog-content">
                <div className="blog-meta">
                  <img
                    src={`http://localhost:3000/${blog.profile_pic}`}
                    alt={blog.username || "Author"}
                    className="profile-pic"
                   
                  />
                  <span className="blog-author">{blog.username || "Unknown"}</span>
                </div>
                <h2 className="blog-title1">{blog.title}</h2>
                <p className="blog-description1">{blog.description}</p>
                <div className="blog-actions">
                  <span className="blog-date">Unknown date</span>
                  <button
                    className="like-button"
                    onClick={() => handleLike(index)}
                  >
                    <svg
                      className="like-icon"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      ></path>
                    </svg>
                    <span>{blog.likes?.length || 0}</span>
                  </button>
                </div>
              </div>
              <img
                src={`http://localhost:3000/${blog.blog[0]}`}
                alt={blog.title}
                className="blog-image"
               
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
