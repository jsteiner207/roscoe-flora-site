import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";

const useStyles = makeStyles({
  Card: {
    backgroundColor: "lightgray",
    color: "black",
    minWidth: 275,
    marginRight: 50,
    marginTop: 60
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  right: {
    marginLeft: "auto",
    left: "20px"
  }
});

const deleteCard = id => {
  axios
    .delete(`https://vast-wave-57983.herokuapp.com/api/items/${id}`)
    .then(console.log("success"))
    .catch(err => console.log(err));
  console.log(id);
};

export default function Dashboard() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
  const [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get("https://vast-wave-57983.herokuapp.com/api/items")
      .then(res => setData(res.data));
  }, []);
  return (
    <div>
      {data &&
        data.map(item => (
          <div key={item._id} style={{ display: "inline-block" }}>
            <Card className={classes.Card}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  {item.first_name}
                </Typography>
                <Typography variant="h5" component="h2">
                  {item.last_name}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  adjective
                </Typography>
                <Typography variant="body2" component="p">
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
                <IconButton className={classes.right}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleClickOpen()}>
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </div>
        ))}
    </div>
  );
}
