import { useState } from "react";
import "./Home.css";

const Home = () => {
  const initialBlogs = [
    {
      title: "How I Became Unemployable as a Software Engineer & What I Learned",
      author: "Dr. Derek Austin",
      date: "Dec 4, 2024",
      description: "Being a developer is a creative, highly-paid profession that can even be fun, but it’s also still a job. Here’s what you need to know.",
      imageUrl: "https://media.istockphoto.com/id/1317323736/photo/a-view-up-into-the-trees-direction-sky.jpg?s=612x612&w=0&k=20&c=i4HYO7xhao7CkGy7Zc_8XSNX_iqG0vAwNsrH1ERmw2Q=",
      profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
      likes: 2900,
    },
    {
      title: "Sharing Data Between Microservices",
      author: "Denat Hoxha",
      date: "Oct 24, 2022",
      description: "Robust distributed systems embrace eventual consistency to share data between their services.",
      imageUrl: "https://media.istockphoto.com/id/1317323736/photo/a-view-up-into-the-trees-direction-sky.jpg?s=612x612&w=0&k=20&c=i4HYO7xhao7CkGy7Zc_8XSNX_iqG0vAwNsrH1ERmw2Q=",
      profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
      likes: 2700,
    },
    {
      title: "Coding the VIBE Coding",
      author: "Adarsh Gupta",
      date: "Jan 15, 2025",
      description: "Vibe Coding is just what you need to replace your job.",
      imageUrl: "https://media.istockphoto.com/id/1317323736/photo/a-view-up-into-the-trees-direction-sky.jpg?s=612x612&w=0&k=20&c=i4HYO7xhao7CkGy7Zc_8XSNX_iqG0vAwNsrH1ERmw2Q=",
      profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
      likes: 380,
    },
  ];

  const [blogs, setBlogs] = useState(initialBlogs);

  const handleLike = (index) => {
    const updatedBlogs = [...blogs];
    updatedBlogs[index].likes += 1;
    setBlogs(updatedBlogs);
  };

  return (
    <div className="home-page">
      <h1 className="home-title">Featured Blogs</h1>
      <div className="blog-list">
        {blogs.map((blog, index) => (
          <div key={index} className="blog-card">
            <div className="blog-content">
              <div className="blog-meta">
                <img src={blog.profilePic} alt={blog.author} className="profile-pic" />
                <span className="blog-author">{blog.author}</span>
              </div>
              <h2 className="blog-title1">{blog.title}</h2>
              <p className="blog-description1">{blog.description}</p>
              <div className="blog-actions">
                <span className="blog-date">{blog.date}</span>
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
                  <span>{blog.likes.toLocaleString()}</span>
                </button>
              </div>
            </div>
            <img src={blog.imageUrl} alt={blog.title} className="blog-image" onError={(e) => e.target.src = "https://via.placeholder.com/150x100?text=Image+Not+Found"} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;