import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import Button from "@material-ui/core/Button";
import AppointmentDialog from "./dashboardComponents/appointmentDialog";
import EditAppointment from "./dashboardComponents/editAppointment";
import AddAppointment from "./dashboardComponents/AddAppointment"
import DashboardAppbar from "./dashboardComponents/DashboardAppbar";
import ContactForm from "./dashboardComponents/contactForm";
import CustomerTable from "./dashboardComponents/customerTable";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';


// import AddAppointment from "./dashboardComponents/AddAppointment";

const useStyles = makeStyles(theme => ({
  div: {
    width: "-webkit-fill-available"
  },
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
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(3)
  },
  right: {
    marginLeft: "auto",
    left: "20px"
  }
}));

export default function Dashboard() {
  // These are the default values given to the appointment state hook


  const [page, setPage] = React.useState("Appointments")
  const [Delete, setDelete] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [add, setAdd] = React.useState(false);
  const [data, setData] = useState(null);
  const [bookedDates, setBookedDates] = React.useState(null)
  const [appointment, setAppointment] = React.useState({ n: null });


  const handleClickDelete = (item) => {
    setAppointment(item)
    setDelete(true);
  };
  const handleClose = () => {
    setDelete(false);
    setEdit(false);
    setAdd(false);
  };
  const mlist = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];


  const editHandleClick = item => {
    setAppointment(item);
    setEdit(true);
  };

  const addHandleClick = () => {
    setAdd(true);
  };

  const classes = useStyles();

  useEffect(() => {
    axios
      .get("https://vast-wave-57983.herokuapp.com/api/items")
      .then(res => {
        setData(res.data);
        setBookedDates(res.data.map(item => new Date(item.appointment_date))); //gets the dates
      });
  }, []);

  if (page === "Appointments")
    return (
      <div className={classes.div}>
        <DashboardAppbar page={page} setPage={setPage} />
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
                    {item.first_name} {item.last_name}
                  </Typography>
                  <Typography variant="h5" component="h2">
                    {mlist[new Date(item.appointment_date).getMonth()]},{" "}
                    {new Date(item.appointment_date).getDate()}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {new Date(item.appointment_date).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {item.location === "in-studio" ? item.location : item.address}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {item.photoshoot_type}
                    <br />
                    {"Dress changes: " + item.outfit_changes}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">View</Button>
                  <IconButton
                    className={classes.right}
                    onClick={() => editHandleClick(item)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleClickDelete(item._id)}>
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </div>
          ))}
        <Fab color="primary" aria-label="add"
          onClick={addHandleClick}
          className={classes.fab}
          handleClose={handleClose}>

          <AddIcon />
        </Fab>
        <AppointmentDialog appointment={appointment}
          open={Delete} handleClose={handleClose} />
        <EditAppointment
          bookedDates={bookedDates}
          open={edit}
          handleClose={handleClose}
          appointment={appointment}
        />
        <AddAppointment open={add} handleClose={handleClose} />

      </div>
    );
  else if (page === "Customers") {
    return (
      <div className={classes.div}>
        <DashboardAppbar page={page} setPage={setPage} />
        <CustomerTable />

      </div>
    )
  }
  else if (page === "Contact messages") {
    return (
      <div className={classes.div}>
        <DashboardAppbar page={page} setPage={setPage} />
        <ContactForm />
      </div>
    )
  }
}