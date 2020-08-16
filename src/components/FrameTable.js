import React from 'react';
import './FrameTable.css';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const MonospaceTableCell = withStyles((theme) => ({
    body: {
        fontFamily: "monospace",
    }
}))(TableCell);

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 24,
    },
  }))(TableCell);

const FrameTable = (props) => {

    const frameList = props.frameList;

    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table stickyHeader className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Frame</StyledTableCell>
                        <StyledTableCell>PID</StyledTableCell>
                        <StyledTableCell align="right">!!!</StyledTableCell>
                        <StyledTableCell align="right">HP</StyledTableCell>
                        <StyledTableCell align="right">ATK</StyledTableCell>
                        <StyledTableCell align="right">DEF</StyledTableCell>
                        <StyledTableCell align="right">SPA</StyledTableCell>
                        <StyledTableCell align="right">SPD</StyledTableCell>
                        <StyledTableCell align="right">SPE</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {frameList.map((frame, index) => (
                        <TableRow key={index}>
                            <TableCell component="th" scope="row">
                                {index}
                            </TableCell>
                            <MonospaceTableCell>{frame.pid.toString(16)}</MonospaceTableCell>
                            <TableCell align="right">{frame.shiny ? "!!!" : ""}</TableCell>
                            <TableCell align="right">{frame.hp}</TableCell>
                            <TableCell align="right">{frame.atk}</TableCell>
                            <TableCell align="right">{frame.def}</TableCell>
                            <TableCell align="right">{frame.spa}</TableCell>
                            <TableCell align="right">{frame.spd}</TableCell>
                            <TableCell align="right">{frame.spe}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default FrameTable;