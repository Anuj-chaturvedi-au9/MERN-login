import React from "react";

import HomeLoggedIn from "./HomeLoggedIn";
import HomeWithoutLoggedIn from "./HomeWithoutLoggedIn";

function Home() {
  const isAuthenticated = localStorage.getItem("user");
  console.log(isAuthenticated);
  return isAuthenticated ? <HomeLoggedIn /> : <HomeWithoutLoggedIn />;
}

export default Home;
