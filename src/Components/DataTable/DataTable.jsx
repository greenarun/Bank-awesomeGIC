import * as React from 'react';
import { styled } from '@mui/material/styles';
import {Table,TableBody,TableContainer,TableHead,TableRow,Paper} from '@mui/material'; 
import TableCell, { tableCellClasses } from '@mui/material/TableCell'; 

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  }, 
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


const DataTable = (props) => {
    const {rows} = props
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell align="right">Amount</StyledTableCell>
            <StyledTableCell align="right">Balance</StyledTableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.date}>
              <StyledTableCell component="th" scope="row">
                {row.date}
              </StyledTableCell>
              <StyledTableCell align="right"><span style={row.type==='credit' ? {color:'green'} : {color:'red'} }>{row.type==='debit' && "-"}{row.amount}</span></StyledTableCell>
              <StyledTableCell align="right">{row.balance}</StyledTableCell> 
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


export default DataTable