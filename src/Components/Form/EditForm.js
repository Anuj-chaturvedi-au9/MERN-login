import React, { useContext } from "react";
import { UserContext } from "../../App";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

import { Paper, Typography } from "@material-ui/core";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FilterNoneIcon from "@material-ui/icons/FilterNone";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import HomeIcon from "@material-ui/icons/Home";

import QuestionsTab from "./QuestionsTab";
import ResponseTab from "./ResponseTab";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    minHeight: 128,
    alignItems: "flex-start",
    paddingTop: theme.spacing(1),
    //paddingBottom: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    alignSelf: "flex-end",
    justifySelf: "center",
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    display: "flex",
    alignContent: "space-between",
    alignItems: "center",
  },
}));

function EditForm(props) {
  const { state, dispatch } = useContext(UserContext);
  let history = useHistory();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const [formID, setFormID] = React.useState("");

  const [formDeatils, setFormDetails] = React.useState({});
  const [openOfAlert, setOpenOfAlert] = React.useState(false);

  const clipToClipboard = () => {
    navigator.clipboard.writeText(
      window.location.origin + "/respo/" + formDeatils._id
    );
    handleClickOfAlert();
    handleClose();
  };

  const handleClickOfAlert = () => {
    setOpenOfAlert(true);
  };

  const handleCloseOfAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenOfAlert(false);
  };
  const logout = () => {
    var logoutConfirmation = window.confirm("Really want to logout?");

    if (logoutConfirmation) {
      localStorage.clear();
      dispatch({ type: "CLEAR" });

      history.push("/login");
    }
  };

  function sendForm() {
    handleClickOpen();
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const homeHandler = () => {
    history.push("/");
  };
  const headers = {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token"),
  };

  React.useEffect(() => {
    var formId = props.match.params.formId;
    console.log(props);
    if (formId !== undefined) {
      setFormID(formId);
      axios.get("/form/" + formId, { headers: headers }).then((response) => {
        setFormDetails(response.data);
      });
    }
  }, [props.match.params.formId]);

  return (
    <div>
      {console.log(formDeatils)}
      {formDeatils.createdBy === user._id ? (
        <div>
          <div className={classes.root}>
            <AppBar
              position="static"
              style={{ backgroundColor: "white" }}
              elevation={2}
            >
              <Toolbar className={classes.toolbar}>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  aria-label="User form"
                  style={{ color: "#140078" }}
                  onClick={homeHandler}
                >
                  <HomeIcon />
                </IconButton>
                <Typography
                  variant="h6"
                  noWrap
                  style={{ marginTop: "8.5px", color: "black" }}
                >
                  {formDeatils.name}
                </Typography>

                <Tabs
                  className={classes.title}
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  centered
                >
                  <Tab label="Questions" />
                  <Tab label="Responses" />
                </Tabs>
                <IconButton aria-label="search" onClick={sendForm}>
                  <SendIcon />
                </IconButton>

                <IconButton
                  aria-label="display more actions"
                  edge="end"
                  onClick={logout}
                >
                  <AccountCircleIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
          </div>
          <div>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Copy and share link."}
              </DialogTitle>
              <DialogContent>
                <Paper className={classes.paper}>
                  <Grid
                    container
                    alignContent="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography variant="body1">
                        {window.location.origin + "/respo/" + formDeatils._id}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <IconButton
                        className={classes.button}
                        aria-label="Add"
                        size="medium"
                        onClick={clipToClipboard}
                      >
                        <FilterNoneIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Paper>

                <DialogContentText id="alert-dialog-description"></DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
            <Snackbar
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              open={openOfAlert}
              autoHideDuration={3000}
              onClose={handleCloseOfAlert}
              message="Copied to clipboard"
              action={
                <React.Fragment>
                  <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={handleCloseOfAlert}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </React.Fragment>
              }
            />
          </div>

          <div>
            <TabPanel value={value} index={0}>
              <QuestionsTab formData={formDeatils} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <ResponseTab formData={formDeatils} formId={formID} />
            </TabPanel>
          </div>
        </div>
      ) : (
        <p>you're not the owner of the form</p>
      )}
    </div>
  );
}

export default EditForm;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
