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
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

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
    open: false
  };

  // This closes up the selecter for dress changes
  handleClose = () => {
    this.setState({ open: false });
  };

  // This opens up the selecter for dress changes
  handleOpen = () => {
    this.setState({ open: true });
  };

  // This increments the steps opening up the previous form
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  // This decrements the steps opening up the previous form
  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, handleChange } = this.props;
    const { classes } = this.props;
    return (
      <MuiThemeProvider>
        <div>
          <Grid className={classes.Grid} container spacing={1}>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  What type of photoshoot are you interested in{" "}
                </FormLabel>
                <RadioGroup aria-label="position" name="position" row>
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
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
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
                    value={"off-studio"}
                    onChange={handleChange("location")}
                    control={
                      <Radio
                        checked={values.location === "off-studio"}
                        color="primary"
                        onChange={handleChange("location")}
                      />
                    }
                    label="off-studio"
                    labelPlacement="start"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
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
              />
            </Grid>
            <br />
            <Grid item xs={12}>
              <FormControl className={classes.Selector}>
                <InputLabel id="demo-controlled-open-select-label">
                  Dress changes
                </InputLabel>
                <Select
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
              </FormControl>
            </Grid>

            <TextField
              id="outlined-basic"
              label="Estimated cost"
              className={classes.estimate}
              margin="normal"
              value={"$" + (150 + 30 * values.changes) + ".00"}
            />
            <Grid item xs={12}>
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
            </Grid>
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
