import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { url } from "../../envconstants";
import { useNavigate } from "react-router-dom";
import Logo from '../../assets/logo.png'
import styles from "./Login.module.css";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch(`${url}/users`);
    const users = await res.json() 

    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      setUser(user);
      navigate("/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className={styles.bg}>
      <Container
        maxWidth="xs"
        sx={{
          bgcolor: "#fff",
          overflow: "hidden",
          p: 3,
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={Logo} height="150" alt="logo"/> 
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

          <Button
            variant="contained" 
            onClick={handleLogin}
            fullWidth
            sx={{backgroundColor:"#3aad7a", m: 2, p: 2 }}
          >
            Login
          </Button>
          <Button
            variant="contained" 
            onClick={handleSignup}
            fullWidth
            sx={{backgroundColor:"#503cbd", m: 2, p: 2 }}
          >
            SignUp ! Open Your Savings Account Now !
          </Button>
          {error && <Typography color="error">{error}</Typography>}
        </Box>
      </Container>
    </div>
  );
};

export default Login;
