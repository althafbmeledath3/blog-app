


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [menuOpen, setMenuOpen] = useState(null);

  const [reload,setReload] = useState(false)

  const [profile,setProfile] = useState()

  const [proname,setProname] = useState()

  useEffect(()=>{

    setReload(!reload)
    console.log("hey relooe")


  },[navigate])

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const id = localStorage.getItem("id");
        if (!id) {
          console.error("No user ID found in localStorage");
          setBlogs([]);
          return;
        }

        const response = await axios.get("http://localhost:3000/api/loadblogs");

        const response2 = await axios.get(`http://localhost:3000/api/getuser/${id}`)

        

        console.log("API Response:", response.data.blogs[0].profile_pic);

        setProfile(`http://localhost:3000/${response2.data.profile_pic}`)


        setProname(response2.data.username)

      

        const filteredBlogs = (response.data.blogs.reverse() || [])
          .filter(blog => blog.userid === id)
          .map(blog => ({
            id: blog._id, // Map blog._id to id
            username: blog.username || "Unknown",
            title: blog.description || "Untitled",
            imageUrl: blog.blog?.[0]
              ? `http://localhost:3000/${blog.blog[0]}`
              : "https://via.placeholder.com/150x100?text=Image+Not+Found",
            description: blog.description || ""
          }));

        console.log("Filtered blogs:", filteredBlogs);
        setBlogs(filteredBlogs);
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        console.error("Failed to load blogs:", errorMessage);
        setBlogs([]);
      }
    };

    loadProfile();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("id");
    navigate("/");
  };

  const handleEditProfile = () => {
    navigate("/editprofile");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const toggleMenu = (index) => {
    setMenuOpen(menuOpen === index ? null : index);
  };

  const handleDeleteBlog = async (blogId) => {
    try {
      await axios.get(`http://localhost:3000/api/deleteblog/${blogId}`);

      setBlogs(blogs.filter(blog => blog.id !== blogId));
      setMenuOpen(null);
      console.log(`Blog ${blogId} deleted successfully`);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.error("Failed to delete blog:", errorMessage);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-info">
          <img
            src={profile}
            alt="Profile"
            className="profile-pic-large"
          />
          <h1 className="profile-name">{proname}</h1>
          <p className="profile-bio">Passionate blogger sharing insights on life and the universe.</p>
          <div className="profile-actions">
            <button className="action-button edit-button" onClick={handleEditProfile}>
              Edit Profile
            </button>
            <button className="action-button signout-button" onClick={handleSignOut}>
              Sign Out
            </button>
            <button className="action-button home-button" onClick={handleGoHome}>
              Go to Home
            </button>
          </div>
        </div>
      </div>
      <div className="blogs-section">
        <h2 className="section-title">Your Blogs</h2>
        <div className="blogs-container">
          {blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <div key={index} className="blog-card">
                <div className="blog-card-header">
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="blog-image"
                    onError={(e) => {
                      console.error(`Failed to load image: ${blog.imageUrl}`);
                      e.target.src = "https://via.placeholder.com/150x100?text=Image+Not+Found";
                    }}
                  />
                  <div className="blog-menu">
                    <button
                      className="menu-button"
                      onClick={() => toggleMenu(index)}
                    >
                      ⋮
                    </button>
                    {menuOpen === index && (
                      <div className="menu-dropdown">
                        <button
                          className="delete-button"
                          onClick={() => handleDeleteBlog(blog.id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="blog-content">
                  <h3 className="blog-title">{blog.title}</h3>
                  <p className="blog-username">By {blog.username}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="no-blogs">No blogs yet. Start writing!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;







