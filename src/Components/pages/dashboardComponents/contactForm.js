import React, { useEffect } from 'react';
import axios from "axios";

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);



const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
}));

export default function CustomizedTables() {
    const classes = useStyles();
    const [rows, setRows] = React.useState(null)

    useEffect(() => {
        axios.get("https://vast-wave-57983.herokuapp.com/api/contacts")
            .then(res => setRows(res.data));
    }, []);


    return (
        <Paper className={classes.root}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>name</StyledTableCell>
                        <StyledTableCell >email</StyledTableCell>
                        <StyledTableCell align="left">message</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows && rows.map(row => (
                        <StyledTableRow key={row.full_name}>
                            <StyledTableCell >{row.full_name}</StyledTableCell>
                            <StyledTableCell >{row.email}</StyledTableCell>
                            <StyledTableCell>{row.message}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}
