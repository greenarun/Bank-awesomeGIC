import React, { useState, useEffect } from "react";
import { 
  Typography,
  Chip,
  Box, 
} from "@mui/material"; 
import axios from "axios";
import Loader from "../../Components/Loader"; 
import { url } from "../../envconstants";
import PaidIcon from "@mui/icons-material/Paid";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import CreditCardIcon from "@mui/icons-material/CreditCard";  
import LeftMenu from "../../Components/LeftMenu/LeftMenu";
import Header from "../../Components/Header/Header"; 
import { constants } from "../../utils/constants";
import Modal from '../../Components/Modal/Modal'

const Dashboard = ({ user, logout, setShowDiv, showDiv }) => {
  console.log(user, logout, setShowDiv, showDiv )
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
          <LeftMenu active="dashboard" />
          <Box sx={{ width: "80%", p: 2, bgcolor: "#fff" }}>
          <Box
              sx={{
                p: 2,
                bgcolor: "#fff",
                border: "1px solid #ddd",
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" component="h6">
                  {constants.dashboard.welcomeText} 
                </Typography>


            </Box>
            <Box
              sx={{
                p: 2,
                bgcolor: "#fff",
                border: "1px solid #ddd",
                borderRadius: 2,
                mt:2
              }}
            >
               
              <Box >
            {!loading && userdata.length !== 0 ? (
              <>
                <Typography variant="h6" component="h6">
                  {constants.dashboard.accountStatus}
                  <Chip label={`as of ${new Date().toLocaleString()}`} sx={{ml:1}} />
                </Typography>

                <Box sx={{ display: "flex", mt: 3 }}>
                  <Box>
                    <PersonPinIcon />
                  </Box>
                  <Box>
                    <Typography
                      variant="subtitle1"
                      align="left"
                      gutterBottom
                      sx={{ pl: 1 }}
                    >
                      {constants.dashboard.welcome},
                      {userdata.username.charAt(0).toUpperCase() +
                        userdata.username.slice(1)}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", mt: 1 }}>
                  <Box>
                    <CreditCardIcon />
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" align="left" sx={{ pl: 1 }}>
                    {constants.dashboard.accountNumber}: {userdata.accountNumber}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", mt: 1 }}>
                  <Box>
                    <PaidIcon />
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" align="left" sx={{ pl: 1 }}>
                    {constants.dashboard.accountBalance}: {userdata.creditHistory}
                    </Typography>
                  </Box>
                </Box>
              </>
            ) : (
              <Loader />
            )}
          </Box> 
            </Box> 
           {showDiv && <Modal setShowDiv={setShowDiv}/>}
          </Box> 
          
        </Box>
      </div>
    </>
  );
};

export default Dashboard;
