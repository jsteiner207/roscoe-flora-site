import React, { useEffect } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

const useStyles = makeStyles(theme => ({
  root: {
    width: "auto",
    marginTop: theme.spacing(3),
    overflowX: ""
  },
  table: {
    minWidth: "90%"
  }
}));

export default function Pricing() {
  const classes = useStyles();

  // fixed an issue
  const [state, setState] = React.useState({
    headshot: 0,
    portraiture: 0,
    fashion: 0,
    instudio: 0,
    outstudio: 0,
    location: 0,
    dresschanges: 0,
    freelocation: 0,
    freechange: 0
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.value });
  };

  const updatePrices = () => {
    axios.post("https://vast-wave-57983.herokuapp.com/api/prices", state);
  };

  useEffect(() => {
    axios
      .get("https://vast-wave-57983.herokuapp.com/api/prices")
      .then(res => setState(res.data[0]));
  }, []);

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Cost Type</StyledTableCell>
            <StyledTableCell>Price</StyledTableCell>
            <StyledTableCell>Amount Free</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell>Headshot</StyledTableCell>
            <StyledTableCell>
              $
              <input
                onChange={handleChange("headshot")}
                type="number"
                value={state.headshot}
              />
            </StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>Portraiture</StyledTableCell>
            <StyledTableCell>
              $
              <input
                onChange={handleChange("portraiture")}
                type="number"
                value={state.portraiture}
              />
            </StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>Fashion</StyledTableCell>
            <StyledTableCell>
              $
              <input
                onChange={handleChange("fashion")}
                type="number"
                value={state.fashion}
              />
            </StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>In-studio</StyledTableCell>
            <StyledTableCell>
              $
              <input
                onChange={handleChange("instudio")}
                type="number"
                value={state.instudio}
              />
            </StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>out-of-studio</StyledTableCell>
            <StyledTableCell>
              $
              <input
                onChange={handleChange("outstudio")}
                type="number"
                value={state.outstudio}
              />
            </StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>Dress Changes</StyledTableCell>
            <StyledTableCell>
              $
              <input
                onChange={handleChange("dresschanges")}
                type="number"
                value={state.dresschanges}
              />
            </StyledTableCell>
            <StyledTableCell>
              <input
                onChange={handleChange("freechange")}
                value={state.freechange}
              />
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>Locations</StyledTableCell>
            <StyledTableCell>
              <input
                onChange={handleChange("location")}
                type="number"
                value={state.location}
              />
            </StyledTableCell>
            <StyledTableCell>
              <input
                onChange={handleChange("freelocation")}
                type="number"
                value={state.freelocation}
              />
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
      <Button onClick={updatePrices} color="primary" variant="outlined">
        Set Prices
      </Button>
    </Paper>
  );
}
