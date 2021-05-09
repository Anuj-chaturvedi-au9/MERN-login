import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import M from "materialize-css";
export default function Login() {
  const { state, dispatch } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const loginHandler = () => {
    fetch("/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.err) {
          M.toast({ html: data.err });
        } else {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({ type: "USER", payload: data.user });
          M.toast({ html: "saved successfully" });
          history.push("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      className="card"
      style={{
        maxWidth: "40%",
        margin: "auto",
        padding: "30px",
        marginTop: "20px",
      }}
    >
      <h5>Fill all the fields and then press Login </h5>
      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn" onClick={() => loginHandler()}>
        Login
      </button>
      <Link to="/signup">New user register here</Link>
    </div>
  );
}
