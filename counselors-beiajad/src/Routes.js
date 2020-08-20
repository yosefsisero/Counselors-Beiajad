import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AuthContextProvider  from './contexts/AuthContext'
//Views
import Home from "./Pages/Home/Home";
import Login from "./Components/Users/Login.jsx";
import Logout from "./Components/Users/Logout.jsx";
import Register from "./Components/Users/Signup.jsx";
import UsersList from "./Components/Users/UsersList.jsx";
import ScheduleList from "./Components/Users/ScheduleList.jsx"; 
import ScheduleUser from "./Components/Users/ScheduleUser.jsx";
import Faq from './Pages/Faq/Faq';

function Routes() {
  return (
    <BrowserRouter>
     <AuthContextProvider>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/users" component={UsersList} />
        <Route exact path="/schedule" component={ScheduleList} />
        <Route exact path="/schedule/user" component={ScheduleUser} />
        <Route exact path="/faq" component={Faq} />
 
      </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default Routes;
