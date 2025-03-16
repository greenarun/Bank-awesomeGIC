import React from 'react'
import {Alert} from '@mui/material' 

const AlertBox = (props) => { 
    const {error,message} = props 
    return (
        <>
        <Alert severity={error ? "error" : "success"} sx={{mb:2}}>{message}</Alert> 
        </>
    )
}

export default AlertBox