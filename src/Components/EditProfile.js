import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../App";

export default function EditProfile() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const { state, dispatch } = useContext(UserContext);
  const user = JSON.parse(localStorage.getItem("user"));

  const history = useHistory();

  const updateHandler = () => {
    fetch("/updateprofile", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        name,
        image,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "UPDATE",
          payload: {
            name: data.name,
            image: data.image,
            email: data.email,
          },
        });
        localStorage.setItem("user", JSON.stringify(data));
        history.push("/profile");
      });
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="new name"
      />
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="new image url"
      />
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="new password"
      />
      <input type="text" value={user.email} placeholder="email" readOnly />
      <center>
        <button className="btn" onClick={() => updateHandler()}>
          Update
        </button>
      </center>
    </div>
  );
}
