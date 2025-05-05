import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here (e.g., API call)
    console.log("Form Data:", formData);
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h2 style={styles.title}>Log In</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              style={styles.input}
              placeholder="Enter your email"
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              style={styles.input}
              placeholder="Enter your password"
              required
            />
          </div>

          <div style={styles.forgotPassword}>
            <Link to="/forgot-password" style={styles.forgotLink}>
              Forgot Password?
            </Link>
          </div>

          <button type="submit" style={styles.button}>
            Log In
          </button>

          <p style={styles.signupText}>
            Don't have an account?{" "}
            <Link to="/signup" style={styles.signupLink}>
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #1a0b2e 0%, #2e1a47 100%)",
    padding: "20px",
  },
  formWrapper: {
    background: "rgba(42, 27, 71, 0.9)",
    backdropFilter: "blur(10px)",
    borderRadius: "15px",
    padding: "30px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 6px 20px rgba(147, 51, 234, 0.3)",
    border: "1px solid rgba(147, 51, 234, 0.5)",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#e0c3fc",
    textAlign: "center",
    marginBottom: "20px",
    textShadow: "0 0 8px rgba(147, 51, 234, 0.5)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  label: {
    fontSize: "14px",
    color: "#e0c3fc",
    fontWeight: "500",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid rgba(147, 51, 234, 0.5)",
    background: "rgba(255, 255, 255, 0.1)",
    color: "#e0c3fc",
    fontSize: "14px",
    outline: "none",
    boxShadow: "0 0 5px rgba(147, 51, 234, 0.2)",
  },
  forgotPassword: {
    textAlign: "right",
  },
  forgotLink: {
    color: "#00f7ff",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
  },
  button: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(135deg, #ff007a, #00f7ff)",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
    boxShadow: "0 0 10px rgba(0, 247, 255, 0.5)",
  },
  signupText: {
    textAlign: "center",
    color: "#e0c3fc",
    fontSize: "14px",
    marginTop: "10px",
  },
  signupLink: {
    color: "#00f7ff",
    textDecoration: "none",
    fontWeight: "500",
  },
};

export default Login;