import React, { useState, useEffect } from "react";
import {
  Button,
  Typography, 
  Box, 
} from "@mui/material";
import PrintIcon from '@mui/icons-material/Print';
import { url } from "../../envconstants";
import Loader from "../../Components/Loader"; 
import axios from "axios";
import LeftMenu from "../../Components/LeftMenu/LeftMenu";
import Header from "../../Components/Header/Header";
import DataTable from "../../Components/DataTable/DataTable";

const Estatement = ({ user, logout }) => {
  const [userdata, setUserdata] = useState([]);
  const [loading, setLoading] = useState(false); 

  const fetchUserData = (id) => {
    setLoading(true);
    axios
      .get(`${url}/users/${id}`)
      .then((res) => {
        setUserdata(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    let id = user.id;
    fetchUserData(id);
  }, [user]);

  

  return (
    <>
      <Header logout={logout} />
      <div style={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            bgcolor: "background.paper",
            borderRadius: 1,
            pt: 8,
            height: "100vh",
          }}
        > 
          <LeftMenu active="estatement" />
          <Box sx={{ width: "80%", p: 2, bgcolor: "#fff" }}> 
 
            <Box
              sx={{
                p: 2,
                mt:2,
                bgcolor: "#fff",
                border: "1px solid #ddd",
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" component="h6">
                E-Statement
              </Typography>
              <Box sx={{mt:2}}>
                {
                  loading ?
                  <Loader /> :
                  userdata.length!==0 && <DataTable rows={userdata?.statement} />  
                }
              
              </Box>
              <Button
                variant="contained"
                startIcon={<PrintIcon />}
                sx={{ mt: 2 }}
                 
              >
                Print
              </Button>
            </Box>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default Estatement;
