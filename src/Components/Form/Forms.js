import React, { useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import OneForm from "./OneForm";
import CircularProgress from "@material-ui/core/CircularProgress";
import { UserContext } from "../../App";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

function Forms() {
  const classes = useStyles();
  // console.log(props.userId);

  const user = JSON.parse(localStorage.getItem("user"));
  const [forms, setForms] = React.useState([]);
  const [loadingForms, setLoadingForms] = React.useState(true);
  const { state, dispatch } = useContext(UserContext);

  React.useEffect(() => {
    axios
      .get("/forms", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response.data);
        setForms(response.data);
        setLoadingForms(false);
      });
  }, []);

  return (
    <div>
      <div>
        <CssBaseline />
        {loadingForms ? <CircularProgress /> : ""}
        <Container className={classes.cardGrid} maxWidth="lg">
          <Grid container spacing={6}>
            {forms.length !== 0 &&
              forms.map((form) => <OneForm formData={form} />)}
            {console.log(forms)}
          </Grid>
        </Container>
      </div>
      <div></div>
    </div>
  );
}

export default Forms;
