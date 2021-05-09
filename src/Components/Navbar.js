import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
// import MenuItem from "@material-ui/core/MenuItem";
// import IconButton from "@material-ui/core/IconButton";
// import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import PersonIcon from "@material-ui/icons/Person";

import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";

import MoreIcon from "@material-ui/icons/MoreVert";
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import Forms from "./Form/Forms";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export default function Navbar() {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState({});
  const [formTitle, setFormTitle] = React.useState("");
  const [formDescription, setFormDescription] = React.useState("");

  useEffect(() => {
    state && setUser(state);
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
    console.log(open);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const cancelAddForm = () => {
    handleClose();
    setFormTitle("");
    setFormDescription("");
  };

  const createForm = () => {
    var data = {
      name: formTitle,
      description: formDescription,
      createdBy: user._id,
    };
    if (data.name !== "") {
      axios.post(`/api/form`, data).then(
        (result) => {
          console.log(result);
          history.push("/form/" + result._id);
        },

        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          console.log(resMessage);
        }
      );
    }
  };
  const renderList = () => {
    if (state) {
      return [
        <MenuItem onClick={handleClickOpen}>
          <IconButton aria-label="show 11 new notifications" color="inherit">
            <AddIcon />
          </IconButton>
          {/* <p>Create </p> */}
        </MenuItem>,
        <li>
          <Link to="/profile">Profile</Link>
        </li>,
        <button
          className="btn"
          onClick={() => {
            localStorage.clear();
            dispatch({ type: "CLEAR" });
            history.push("/login");
          }}
        >
          Logout
        </button>,
      ];
    } else {
      return [
        <li>
          <Link to="/login">Login</Link>
        </li>,
        <li>
          <Link to="/signup">SignUp</Link>
        </li>,
      ];
    }
  };
  return (
    <div>
      <nav>
        <div className="nav-wrapper">
          <Link to={state ? "/" : "/login"} className="brand-logo left">
            Logo
          </Link>
          <ul id="nav-mobile" className="right ">
            {renderList()}
          </ul>
          <div>
            <div>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">Create Form</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Creating a new empty form, just add form name and
                    description if you want.
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Form Name"
                    type="text"
                    fullWidth={false}
                    value={formTitle}
                    onChange={(e) => {
                      setFormTitle(e.target.value);
                    }}
                  />
                  <br></br>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="description"
                    label="Form description"
                    type="text"
                    fullWidth
                    value={formDescription}
                    onChange={(e) => {
                      setFormDescription(e.target.value);
                    }}
                  />
                  <br></br>
                </DialogContent>
                <DialogActions>
                  <Button onClick={cancelAddForm} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={createForm} color="primary">
                    Create
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
            <div style={{ marginTop: "10px" }}>
              <Forms userId={user.id} />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
