import React, { Component } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import axios from "axios";

const styles = {
  Selector: {
    minWidth: 150,
    right: 95,
    bottom: 30
  },
  TextArea: {
    minWidth: 400,
    bottom: 50
  },
  location: {
    minWidth: 340,
    bottom: 30
  },
  estimate: {
    bottom: 98,
    left: 250,
    maxHeight: 1,
    maxWidth: 170
  },
  Grid: {
    maxWidth: 500
  }
};

class FormPersonalDetails extends Component {
  state = {
    open: false,
    addresses: [],
    address: "",
    isError: false,
    emptyService: "",
    emptyLoc: "",
    emptyChanges: "",
    emptyAddress: "",
    prices: []
  };

  componentWillMount() {
    axios
      .get("http://localhost:5000/api/prices")
      .then(res => this.setState({ prices: res.data[0] }));
  }

  // This closes up the selecter for dress changes
  handleClose = () => {
    this.setState({ open: false });
  };

  // This opens up the selecter for dress changes
  handleOpen = () => {
    this.setState({ open: true });
  };

  removeAddress = index => this.props.values.address.splice(index, 1);

  // This increments the steps opening up the previous form
  continue = async e => {
    e.preventDefault();
    await this.setState({
      isError: false,
      emptyService: "",
      emptyLoc: "",
      emptyChanges: "",
      emptyAddress: ""
    });
    if (this.props.values.adder !== "") {
    }
    if (this.props.values.service === "") {
      this.setState({ emptyService: "Please Select One" });
      this.setState({ isError: true });
    }
    if (this.props.values.location === "") {
      this.setState({ emptyLoc: "Please Select One" });
      this.setState({ isError: true });
    }
    if (this.props.values.changes === "") {
      this.setState({ emptyChanges: "Please Select One" });
      this.setState({ isError: true });
    }
    if (
      !(this.props.values.address.length >= 1) &&
      this.props.values.location !== "in-studio"
    ) {
      this.setState({ emptyAddress: "Please submit at least one Address" });
      this.setState({ isError: true });
    }
    if (!this.state.isError) {
      console.log(this.state.isError);
      this.props.nextStep();
    }
  };
  //this.props.nextStep();

  // This decrements the steps opening up the previous form
  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const def = true;
    const { values, handleChange, addItem } = this.props;
    const { classes } = this.props;
    var servicePrice =
      values.service === "portraiture"
        ? this.state.prices.portraiture // if portraiture use portraits price
        : values.service === "fashion"
        ? this.state.prices.fashion // if portraiture use fashions price
        : values.service === "headshot"
        ? this.state.prices.headshot
        : 0;
    var changesPrice =
      values.changes <= this.state.prices.freechange // checks if changes is in the free zone
        ? 0 //if they are don't charge them
        : (values.changes - this.state.prices.freechange) *
          this.state.prices.dresschanges; // adds in dresschange fee

    var locationPrice =
      values.location === "in-studio"
        ? this.state.prices.instudio
        : values.location === "out-of-studio"
        ? values.address.length <= this.state.prices.freelocation
          ? this.state.prices.outstudio
          : (values.address.length - this.state.prices.freelocation) *
              this.state.prices.location +
            this.state.prices.outstudio
        : 0;

    return (
      <MuiThemeProvider>
        <div>
          <Grid className={classes.Grid} container spacing={1}>
            <Grid item xs={12}>
              <FormControl error={this.state.isError} component="fieldset">
                <FormLabel component="legend">
                  What type of photoshoot are you interested in{" "}
                </FormLabel>
                <RadioGroup
                  defaultValu="headshot"
                  aria-label="position"
                  name="position"
                  row
                >
                  <FormControlLabel
                    onChange={handleChange("service")}
                    value="headshot"
                    control={
                      <Radio
                        checked={values.service === "headshot"}
                        color="primary"
                        onChange={handleChange("service")}
                      />
                    }
                    label="Headshot"
                    labelPlacement="Headshot"
                  />
                  <FormControlLabel
                    onChange={handleChange("service")}
                    value="portraiture"
                    control={
                      <Radio
                        checked={values.service === "portraiture"}
                        color="primary"
                        onChange={handleChange("service")}
                      />
                    }
                    label="Portraiture"
                    labelPlacement="Portraiture"
                  />
                  <FormControlLabel
                    onChange={handleChange("service")}
                    value="fashion"
                    control={
                      <Radio
                        checked={values.service === "fashion"}
                        color="primary"
                        onChange={handleChange("service")}
                      />
                    }
                    label="Fashion"
                    labelPlacement="Fashion"
                  />
                </RadioGroup>
                <FormHelperText error>{this.state.emptyService}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl error={this.state.isError} component="fieldset">
                <FormLabel component="legend">
                  where would you like your photos taken
                </FormLabel>
                <RadioGroup aria-label="position" name="position" row>
                  <FormControlLabel
                    value={"in-studio"}
                    onChange={handleChange("location")}
                    control={
                      <Radio
                        checked={values.location === "in-studio"}
                        color="primary"
                        onChange={handleChange("location")}
                      />
                    }
                    label="in-studio"
                    labelPlacement="start"
                  />
                  <FormControlLabel
                    value={"out-of-studio"}
                    onChange={handleChange("location")}
                    control={
                      <Radio
                        checked={values.location === "out-of-studio"}
                        color="primary"
                        onChange={handleChange("location")}
                      />
                    }
                    label="out-of-studio"
                    labelPlacement="start"
                  />
                </RadioGroup>
                <FormHelperText error>{this.state.emptyLoc}</FormHelperText>
              </FormControl>
            </Grid>

            <List dense={true}>
              {values.address &&
                values.address.map((address, i) => (
                  <ListItem>
                    <ListItemText primary={address} />
                    <ListItemSecondaryAction>
                      <IconButton
                        onClick={() => this.removeAddress(i)}
                        edge="end"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
            </List>

            <Grid item xs={12}>
              <FormControl
                className={classes.location}
                error={this.state.isError}
              >
                <InputLabel htmlFor="standard-adornment-password">
                  Photoshoot Address(s) Max: 4
                </InputLabel>
                <Input
                  classname={classes.location}
                  value={
                    values.location === "in-studio"
                      ? "207 England Dr, O'Fallon MO"
                      : values.adder
                  }
                  disabled={values.location === "in-studio" ? true : false}
                  onChange={handleChange("adder")}
                  id="standard-adornment-password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={addItem}
                        disabled={
                          values.location === "in-studio" ? true : false
                        }
                      >
                        <AddCircleOutlineIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText error>{this.state.emptyAddress}</FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              {/* <TextField
                value={
                  values.location === "in-studio"
                    ? "207 England Dr, O'Fallon MO"
                    : values.address
                }
                disabled={values.location === "in-studio" ? true : false}
                onChange={handleChange("address")}
                className={classes.location}
                placeholder="put in the address here"
                label="Photoshoot address"
                defaultValue={values.email}
                margin="normal"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={this.addItem}>
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </InputAdornment>
                }
              /> */}
            </Grid>
            <br />
            <Grid item xs={12}>
              <FormControl className={classes.Selector}>
                <InputLabel id="demo-controlled-open-select-label">
                  Dress changes
                </InputLabel>
                <Select
                  error={this.state.isError}
                  open={this.state.open}
                  onClose={this.handleClose}
                  onOpen={this.handleOpen}
                  value={values.changes}
                  onChange={handleChange("changes")}
                >
                  <MenuItem value={0}></MenuItem>
                  <MenuItem value={0}>None</MenuItem>
                  <MenuItem value={1}>One</MenuItem>
                  <MenuItem value={2}>Two</MenuItem>
                  <MenuItem value={3}>Three</MenuItem>
                  <MenuItem value={4}>Four</MenuItem>
                </Select>
                <FormHelperText error>{this.state.emptyChanges}</FormHelperText>
              </FormControl>
            </Grid>
            <TextField
              error={true}
              id="outlined-basic"
              label="Estimated cost"
              className={classes.estimate}
              margin="normal"
              value={
                "$" + (locationPrice + changesPrice + servicePrice) + ".00"
              }
            />
            <TextField
              className={classes.TextArea}
              id="outlined-multiline-static"
              defaultValue={values.specrec}
              onChange={handleChange("specrec")}
              label="Special requests"
              multiline
              rows="5"
              margin="normal"
              variant="outlined"
            />
            <Grid item xs={12}>
              <Button color="secondary" variant="contained" onClick={this.back}>
                Back
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                color="primary"
                variant="contained"
                onClick={this.continue}
              >
                Continue
              </Button>
            </Grid>
          </Grid>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(FormPersonalDetails);
