import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const PostData = () => {
    fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.err) {
          M.toast({ html: data.err });
        } else {
          M.toast({ html: data.message });
          history.push("/login");
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
      <h5>Fill all the fields and then press Register </h5>
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
      <button className="btn" onClick={() => PostData()}>
        Register
      </button>
      <Link to="/login">Already registered?</Link>
    </div>
  );
}
