import React, {useState,useRef } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Login from './Pages/Login/Login';
import Dashboard from './Pages/Dashboard/Dashboard'; 
import Signup from './Pages/Signup/Signup';
import Logout from './Pages/Logout/Logout';
import Deposit from './Pages/Deposit/Deposit';
import Withdraw from './Pages/Withdraw/Withdraw';
import Estatement from './Pages/Estatement/Estatement';

const App = () => {
  const [user, setUser] = useState(null); 
  const [showDiv, setShowDiv] = useState(false);
  const hasDivBeenShown = useRef(false);

  if (!hasDivBeenShown.current) {
    setShowDiv(true);
    hasDivBeenShown.current = true;
  }

  const logout = () => {
    setUser(null);
  }; 

  return (
    <BrowserRouter>
      <CssBaseline />
      <Routes>
        <Route exact path="/" element={<Login setUser={setUser}/>} />
        <Route exact path="/signup" element={<Signup setUser={setUser}/>} />
        <Route exact path="/logout" element={<Logout setUser={setUser}/>} />
        <Route path="/dashboard" element={user ? <Dashboard user={user} logout={logout} setShowDiv={setShowDiv} showDiv={showDiv}/> : <Login setUser={setUser} />} />
        <Route path="/deposit" element={user ? <Deposit user={user} logout={logout} /> : <Login setUser={setUser} />} />
        <Route path="/withdraw" element={user ? <Withdraw user={user} logout={logout} /> : <Login setUser={setUser} />} />
        <Route path="/estatement" element={user ? <Estatement user={user} logout={logout} /> : <Login setUser={setUser} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;


