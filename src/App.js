import { useEffect, useContext, useReducer, createContext } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import SignUp from "./Components/SignUp";
import EditProfile from "./Components/EditProfile";
import UserView from "./Components/Form/UserView";

import EditForm from "./Components/Form/EditForm";

import { BrowserRouter, Route, useHistory } from "react-router-dom";
import { reducer, initialState } from "./reducers/userReducer";
import Forms from "./Components/Form/Forms";

export const UserContext = createContext();
const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      // history.push("/login");
    } else {
      dispatch({ type: "USER", payload: user });
    }
  }, []);
  return (
    <>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/profile" component={Profile} />
      <Route path="/updateprofile" component={EditProfile} />
      <Route path="/editprofile" component={EditProfile} />
      <Route path="/allforms" component={Forms} />
      <Route path="/form/:formId" component={EditForm} />
      <Route exact path="/respo/:formId" component={UserView} />
    </>
  );
};
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
