import * as React from 'react';
import {Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from '@mui/material';
import {Link} from 'react-router-dom'


export default function Modal(props) {
  const [open, setOpen] = React.useState(true);

 

  const handleClose = () => {
    setOpen(false);
    props.setShowDiv(false)
  };

  return (
    <React.Fragment>
       
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        Welcome to <strong>AwesomeGIC</strong> Bank!
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          What would you like to do? <br/>
          <Link to="/deposit" autoFocus>Deposit</Link><br/> 
          <Link to="/withdraw" >Withdraw</Link><br/> 
          <Link to="/estatement" >Print statement</Link><br/> 
          <Link to="/logout" >Quit</Link><br/> 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}