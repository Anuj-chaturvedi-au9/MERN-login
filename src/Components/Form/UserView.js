import React, { useContext, useEffect } from "react";
import { UserContext } from "../../App";

import { Grid } from "@material-ui/core";

import { Paper, Typography } from "@material-ui/core";

import CircularProgress from "@material-ui/core/CircularProgress";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import RadioGroup from "@material-ui/core/RadioGroup";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";

const useStyles = makeStyles((theme) => ({}));

function UserView(props) {
  const { state, dispatch } = useContext(UserContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const classes = useStyles();

  const [userId, setUserId] = React.useState("");
  const [formData, setFormData] = React.useState({});
  const [responseData, setResponseData] = React.useState([]);
  //console.log(responseData);

  const [optionValue, setOptionValue] = React.useState([]);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const [questions, setQuestions] = React.useState([]);
  const [value, setValue] = React.useState("");
  //console.log(value);
  useEffect(() => {
    if (user) {
      setUserId(user._id);
    } else {
      var anonymousUserId =
        "anonymous" +
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
      console.log(anonymousUserId);
      setUserId(anonymousUserId);
    }
  }, []);

  const handleRadioChange = (j, i) => {
    var questionId = questions[i]._id;
    var optionId = questions[i].options[j]._id;

    var data = {
      questionId,
      optionId,
    };

    setValue(j);

    var fakeRData = [...responseData];

    var indexOfResponse = fakeRData.findIndex(
      (x) => x.questionId === questionId
    );
    if (indexOfResponse === -1) {
      setResponseData((responseData) => [...responseData, data]);
    } else {
      fakeRData[indexOfResponse].questionId = questionId;
      setResponseData(fakeRData);
    }
  };

  useEffect(() => {
    var formId = props.match.params.formId;
    console.log(formId);

    axios.get("/form/" + formId).then((response) => {
      console.log(response.data);
      setFormData(response.data);
      setQuestions(response.data.questions);
      return;
    });
  }, [props.match.params.formId]);

  function submitResponse() {
    var submissionData = {
      formId: formData._id,
      userId: userId,
      response: responseData,
    };
    console.log(submissionData);

    axios.post("/addresponse", submissionData).then((response) => {
      console.log(response.data);
      setIsSubmitted(true);
    });
  }

  function reloadForAnotherResponse() {
    window.location.reload(true);
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      <div>
        <AppBar position="static" style={{ backgroundColor: "#ff8a80" }}>
          <Toolbar>
            <IconButton
              edge="start"
              style={{ marginRight: "10px", marginBottom: "5px" }}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" style={{}}>
              Forms
            </Typography>
          </Toolbar>
        </AppBar>
        <br></br>

        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item xs={12} sm={5} style={{ width: "100%" }}>
            <Grid style={{ borderTop: "10px solid #ff8a80", borderRadius: 10 }}>
              <div>
                <div>
                  <Paper elevation={2} style={{ width: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        marginLeft: "15px",
                        paddingTop: "20px",
                        paddingBottom: "20px",
                      }}
                    >
                      <Typography
                        variant="h4"
                        style={{
                          fontFamily: "sans-serif Roboto",
                          marginBottom: "15px",
                        }}
                      >
                        {formData.name}
                      </Typography>
                      <Typography variant="subtitle1">
                        {formData.description}
                      </Typography>
                    </div>
                  </Paper>
                </div>
              </div>
            </Grid>

            {!isSubmitted ? (
              <div>
                <Grid>
                  {questions.map((ques, i) => (
                    <div key={i}>
                      <br></br>
                      <Paper>
                        <div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              marginLeft: "6px",
                              paddingTop: "15px",
                              paddingBottom: "15px",
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              style={{ marginLeft: "10px" }}
                            >
                              {i + 1}. {ques.questionText}
                            </Typography>

                            {ques.questionImage !== "" ? (
                              <div>
                                <img
                                  src={ques.questionImage}
                                  width="80%"
                                  height="auto"
                                />
                                <br></br>
                                <br></br>
                              </div>
                            ) : (
                              ""
                            )}

                            <div>
                              <RadioGroup
                                aria-label="quiz"
                                name="quiz"
                                value={value}
                                onChange={(e) => {
                                  handleRadioChange(e.target.value, i);
                                }}
                              >
                                {ques.options.map((op, j) => (
                                  <div key={j}>
                                    <div
                                      style={{
                                        display: "flex",
                                        marginLeft: "7px",
                                      }}
                                    >
                                      <FormControlLabel
                                        value={j}
                                        control={<Radio />}
                                        label={op.optionText}
                                      />
                                    </div>

                                    <div
                                      style={{
                                        display: "flex",
                                        marginLeft: "10px",
                                      }}
                                    >
                                      {op.optionImage !== "" ? (
                                        <img
                                          src={op.optionImage}
                                          width="64%"
                                          height="auto"
                                        />
                                      ) : (
                                        ""
                                      )}
                                      <Divider />
                                    </div>
                                  </div>
                                ))}
                              </RadioGroup>
                            </div>
                          </div>
                        </div>
                      </Paper>
                    </div>
                  ))}
                </Grid>
                <Grid>
                  <br></br>
                  <div style={{ display: "flex" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={submitResponse}
                    >
                      Submit
                    </Button>
                  </div>
                  <br></br>

                  <br></br>
                </Grid>
              </div>
            ) : (
              <div>
                <Typography variant="body1">Form submitted</Typography>
                <Typography variant="body2">
                  Thanks for submiting form
                </Typography>

                <Button onClick={reloadForAnotherResponse}>
                  Submit another response
                </Button>
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default UserView;
