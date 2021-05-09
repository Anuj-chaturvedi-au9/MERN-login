import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
// import "./profile.css";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      {
        <div className="main">
          <div className="profile-stats">
            {console.log(user)}
            <img
              className="image-container"
              src={user.profileObj.imageUrl}
              alt="loading"
            />

            <div className="nameAndEmail">
              <h4 style={{ fontFamily: "monospace" }}>
                {user.profileObj.name}
              </h4>
              <h5 style={{ fontFamily: "monospace" }}>
                {user.profileObj.email}
              </h5>
            </div>
          </div>
          <Link to="/editprofile">Click here to edit profile</Link>
        </div>
      }
    </>
  );
}
