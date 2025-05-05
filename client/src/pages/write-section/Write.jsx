import { useState } from "react";
import "./write.css";

const WriteBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add blog post submission logic here (e.g., API call)
    console.log("Form Data:", formData);
  };

  return (
    <div className="write-page">
      <div className="form-wrapper">
        <h2 className="title">Write Your Blog</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="input-group">
            <label className="label">Post Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="input"
              placeholder="Enter your blog title"
              required
            />
          </div>

          <div className="input-group">
            <label className="label">Tell Your Story</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="textarea"
              placeholder="Start writing your story..."
              required
            />
          </div>

          <div className="image-upload-container">
            <label htmlFor="image" className="label">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="image-preview"
                />
              ) : (
                <div className="image-placeholder">
                  Upload Blog Image
                </div>
              )}
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input"
            />
          </div>

          <button type="submit" className="button">
            Publish
          </button>
        </form>
      </div>
    </div>
  );
};

export default WriteBlog;