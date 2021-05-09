import React, { useContext, useEffect } from "react";
import { UserContext } from "../App";
import { Link } from "react-router-dom";

export default function Profile() {
  const { state, dispatch } = useContext(UserContext);
  const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user.image);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        margin: "auto",
        width: "60%",
        marginTop: "30px",
      }}
    >
      <div>
        <img
          src={user.image}
          style={{
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            margn: "20px",
          }}
        />
      </div>
      <div>
        <h4>{user.name}</h4>
        <h4>{user.email}</h4>
      </div>
      <Link to="/updateprofile">Edit profile</Link>
    </div>
  );
}
