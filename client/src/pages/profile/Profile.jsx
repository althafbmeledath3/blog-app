import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();

  const dummyBlogs = [
    {
      username: "John Doe",
      title: "Exploring the Cosmos",
      imageUrl: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "A journey through the stars and galaxies",
    },
    {
      username: "Jane Smith",
      title: "Healthy Living Tips",
      imageUrl: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Simple ways to stay fit and active",
    },
    {
        username: "Jane Smith",
        title: "Healthy Living Tips",
        imageUrl: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description: "Simple ways to stay fit and active",
      },
      
  ];
  

  const handleSignOut = () => {
    // Add sign-out logic here (e.g., clear auth token, redirect)
    navigate('/');
  };

  const handleEditProfile = () => {
    // Add edit profile logic or navigation here
    alert('Edit Profile functionality to be implemented');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-info">
          <img
            src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg"
            alt="Profile"
            className="profile-pic-large"
          />
          <h1 className="profile-name">John Doe</h1>
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
          {dummyBlogs.length > 0 ? (
            dummyBlogs.map((blog, index) => (
              <div key={index} className="blog-card">
                <img src={blog.imageUrl} alt={blog.title} className="blog-image" />
                <div className="blog-content">
                  <h3 className="blog-title">{blog.title}</h3>
                  <p className="blog-username">By {blog.username}</p>
                  <p className="blog-description">{blog.description}</p>
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