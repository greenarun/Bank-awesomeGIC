import React,{useEffect} from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Logo from '../../assets/logo.png'
import styles from "./Logout.module.css";

const Logout = ({ setUser }) => {
   
  const navigate = useNavigate();
 
  useEffect(()=> {
    setTimeout(()=> {
      navigate("/");
    }, 2000)
    // eslint-disable-next-line
  },[])

  const handleLogin = () => {
    navigate("/");
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
          <img src={Logo} height="150" alt="logo" /> <br/>
          <Typography>Thank you for banking with <strong>AwesomeGIC</strong> Bank.<br/>
Have a nice day!</Typography>

          <Button
            variant="contained" 
            onClick={handleLogin}
            fullWidth
            sx={{backgroundColor:"#3aad7a", m: 2, p: 2 }}
          >
            Login
          </Button> 
        </Box>
      </Container>
    </div>
  );
};

export default Logout;
