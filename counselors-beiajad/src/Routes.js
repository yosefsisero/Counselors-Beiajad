import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Contact from './Pages/Contact/Contact'
import Events from './Pages/Events/Events'
import Experiences from './Pages/Experiences/Experiences'
import Faq from './Pages/Faq/Faq'
import WeAre from './Pages/WeAre/WeAre'

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/events" component={Events} />
        <Route exact path="/experiences" component={Experiences} />
        <Route exact path="/faq" component={Faq} />
        <Route exact path="/weare" component={WeAre} />
        
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
