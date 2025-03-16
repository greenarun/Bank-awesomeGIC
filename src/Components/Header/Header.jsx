import React from 'react'
import {
    Button,
    Typography,
    Box,
    Toolbar,
    AppBar,
    IconButton,
    Link
  } from "@mui/material";
  import { useNavigate } from "react-router-dom";
  import Logo from '../../assets/logo-green.png'

const Header = (props) => {
const {logout} = props;
const navigate = useNavigate();

const handleLogout = () => {
    logout();
    navigate("/logout");
    };

    return (
        <>
        <AppBar component="nav" sx={{backgroundColor:"#3bad7a"}} role="banner">
        <Toolbar>
        <Link href="/">
      <Box
        component="img"
        sx={{ height: 54 }}
        alt="Logo"
        src={Logo}
      />
    </Link>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2, display: { sm: "none" } }}
          ></IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1,fontWeight:"bold",ml:1, display: { xs: "none", sm: "block" } }}
          >
            AwesomeGIC
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button sx={{ color: "#fff" }} onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
        </>
    )
}

export default Header