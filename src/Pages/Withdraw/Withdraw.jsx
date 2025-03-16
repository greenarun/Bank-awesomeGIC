import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  TextField,
  Box, 
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"; 
import axios from "axios";
import LeftMenu from "../../Components/LeftMenu/LeftMenu";
import Header from "../../Components/Header/Header";
import AlertBox from "../../Components/AlertBox/AlertBox";
import { url } from "../../envconstants"; 
import {constants} from "../../utils/constants";

const Withdraw = ({ user, logout }) => {
  const [userdata, setUserdata] = useState([]); 
  const [error, setError] = useState(null); 
  const [success, setSuccess] = useState(null); 
  const [amount, setAmount] = useState(null)

  const fetchUserData = (id) => { 
    axios
      .get(`${url}/users/${id}`)
      .then((res) => {
        setUserdata(res.data);
      })
      .catch((err) => console.log(err))
  };

  useEffect(() => {
    let id = user.id;
    fetchUserData(id);
  }, [user]);

  const handleChange = (e) => {
    let amt = e.target.value
    setAmount(amt)
    setError(null)
    setSuccess(null)
  }

  const handleCredit = (user) => {
    if(amount) {
      let total = parseFloat(userdata.creditHistory) - parseFloat(amount)
      let data = {
        ...userdata,
        creditHistory: total,
        statement:[ ...userdata.statement, {id:userdata.statement.length+1,date:new Date().toLocaleString(),amount:parseFloat(amount),type:"debit",balance:total}]
      };

      let id = user.id;
      let headers = { headers: { "Content-Type": "application/json" } };
      axios
        .put(`${url}/users/${id}`, data, headers)
        .then((res) => setSuccess(`${constants.common.thankyou} $${amount} ${constants.withdraw.successfulWithdraw}`))
        .catch((error) => console.log(error));
          
  } else {
    setError(constants.withdraw.amountFieldMandatory)
  }
  setAmount(0) 
  };

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
          <LeftMenu active="withdraw" />
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
                {constants.withdraw.withdrawAmount}
              </Typography>
              <Box sx={{mt:3}}>
                {error && <AlertBox error={true} message={error}/> }
                {(!error && success) && <AlertBox error={false} message={success}/>}
              <TextField
                required
                id="outlined-required"
                label={constants.withdraw.amount}
                onChange={handleChange}
                value={amount}
                sx={{width:"400px"}}
                slotProps={{
                  input: {
                    "aria-label": "Amount",
                    "data-testid": "amount-input", // Add data-testid here
                  },
                }}
              />
              </Box>
              <Button
                variant="contained"
                startIcon={<AttachMoneyIcon />}
                sx={{ mt: 2 }}
                onClick={() => handleCredit(user)}
              >
                {constants.withdraw.withdraw}
              </Button>
            </Box>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default Withdraw;
