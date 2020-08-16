import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AuthContextProvider  from './contexts/AuthContext'
//Views
import Home from "./Pages/Home/Home";
import Contact from './Pages/Contact/Contact'
import Events from './Pages/Events/Events'
import Experiences from './Pages/Experiences/Experiences'
import Faq from './Pages/Faq/Faq'
import WeAre from './Pages/WeAre/WeAre'
import Login from "./Components/Users/Login.jsx";
import Logout from "./Components/Users/Logout.jsx";
import Register from "./Components/Users/Signup.jsx";
import UsersList from "./Components/Users/UsersList.jsx"; 
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
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/events" component={Events} />
        <Route exact path="/experiences" component={Experiences} />
        <Route exact path="/faq" component={Faq} />
        <Route exact path="/weare" component={WeAre} />
        
      </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default Routes;
