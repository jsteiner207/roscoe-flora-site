import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Portfolio from "./Porfolio";
import About from "./About";

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  }
});

export default function CenteredTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = async (event, newValue) => {
    setValue(newValue);
    console.log(value);
  };

  return (
    <div>
      <Paper className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Home" />
          <Tab label="About" />
          <Tab label="Portfolio" />
          <Tab label="Contact" />
        </Tabs>
      </Paper>
      {value === 2 ? (
        <Portfolio />
      ) : value === 1 ? (
        <About />
      ) : (
        "under construction"
      )}
    </div>
  );
}
