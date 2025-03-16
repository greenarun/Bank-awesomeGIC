import React from 'react';
import {Box,Typography} from '@mui/material'
import {Link} from 'react-router-dom'
import styles from './LeftMenu.module.css'
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import ReceiptIcon from '@mui/icons-material/Receipt';

const LeftMenu = (props) => {
    const {active} = props

    return (
        <Box sx={{ width: "20%", p: 2 }} className={styles.bg} role="navigation"> 
                <Link to="/dashboard"  className={active==='dashboard' ? `${styles.active} ${styles.linkstyle}` : styles.linkstyle  }>
                    <Box sx={{ display: "flex", mt: 2, pt:1,cursor:"pointer" }}> 
                  <Box>
                    <SpaceDashboardIcon sx={{mt:"2px",color:`${active ==='dashboard'? "orange": "white"}`}}/>
                  </Box>
                  <Box>
                  <Typography variant="subtitle1" align="left" sx={{ pl: 1,fontSize:18}}>
                     Dashboard
                    </Typography>
                  </Box>
                  </Box>
                </Link>

                <Link to="/deposit" className={active==='deposit' ? `${styles.active} ${styles.linkstyle}` : styles.linkstyle  }>
                    <Box sx={{ display: "flex", mt: 2, pt:1,cursor:"pointer" }}>
                  <Box> 
                    <AccountBalanceWalletIcon sx={{mt:"2px",color:`${active ==='deposit'? "orange": "white"}`}}/>
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" align="left" sx={{ pl: 1,fontSize:18}}>
                      Deposit
                    </Typography>
                  </Box>
                  </Box>
                </Link>

                <Link to="/withdraw" className={active==='withdraw' ? `${styles.active} ${styles.linkstyle}` : styles.linkstyle  }>
                    <Box sx={{ display: "flex", mt: 2, pt:1,cursor:"pointer" }}>
                  <Box> 
                    <LocalAtmIcon  sx={{mt:"3px",color:`${active ==='withdraw'? "orange": "white"}`}}/>
                  </Box>
                  <Box>
                  <Typography variant="subtitle1" align="left" sx={{ pl: 1,fontSize:18}}>
                      Withdraw
                    </Typography>
                  </Box>
                  </Box>
                </Link>

                <Link to="/estatement" className={active==='estatement' ? `${styles.active} ${styles.linkstyle}` : styles.linkstyle  }>
                    <Box sx={{ display: "flex", mt: 2, pt:1,cursor:"pointer" }}>
                    <Box> 
                    <ReceiptIcon sx={{mt:"3px",color:`${active ==='estatement'? "orange": "white"}`}}/>
                  </Box>
                  
                  <Box>
                  <Typography variant="subtitle1" align="left" sx={{ pl: 1,fontSize:18}}>
                      e-statement
                    </Typography>
                  </Box>
                  </Box>
                </Link> 
          </Box>
    )
}

export default LeftMenu