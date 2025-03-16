import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { url } from "../../envconstants";
import axios from "axios";
import styles from "./Signup.module.css";
import Logo from '../../assets/logo.png'
import { useNavigate,Link } from "react-router-dom";

const Signup = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();
  const uniqueId = React.useId();

  const generateAccountNumber = () => {
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    return `${uniqueId.slice(2, 3)}${randomDigits}${randomDigits}`;
  };

  
  const handleSignup = () => {
    if (!username || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const accountNumber = generateAccountNumber(); 

    const user = {
      username,
      password,
      accountNumber,
      creditHistory:0,
      statement:[]
    };

    axios
      .post(`${url}/users`, user)
      .then(function (response) {
        setSuccessMessage(
          "Account created successfully! Redirecting to Login..."
        );
      })
      .catch(function (error) {
        console.log(error);
        setError(error);
      });

    setUser(user);
    setTimeout(() => {
      navigate("/");
    }, 2000); // Redirect to Login page after 2 seconds
  };

  return (
    <div className={styles.bg}>
      <Container
        maxWidth="xs"
        sx={{
          bgcolor: "#fff",
          overflow: "hidden",
          p: 3,
          borderRadius: 1,
          boxShadow: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 5,
          }}
        >
          <img src={Logo} height="150"  alt="logo"/> 
          <Typography variant="h5" sx={{mt:3}}>Sign up form </Typography>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSignup}
            fullWidth
            sx={{backgroundColor:"#3aad7a", m: 2, p: 2 }}
          >
            Sign Up
          </Button>

          <Link to="/">Back to Login</Link>

          {error && (
            <Typography color="error" sx={{ marginTop: 2 }}>
              {error}
            </Typography>
          )}
          {successMessage && (
            <Typography color="primary" sx={{ marginTop: 2 }}>
              {successMessage}
            </Typography>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default Signup;
