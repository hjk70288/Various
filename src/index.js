import React from "react";
import "Styles/reset.scss";
import "Styles/common.scss";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CheckTheme from "Components/HOC/CheckTheme";
import Main from "Pages/Main/Main";
import Love from "Pages/Love/Love";
import Anxious from "Pages/Anxious/Anxious";
import Painful from "Pages/Painful/Painful";
import Error from "Pages/Error/Error";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={CheckTheme(Main)} />
      <Route path="/love" component={CheckTheme(Love)} />
      <Route path="/anxious" component={CheckTheme(Anxious)} />
      <Route path="/painful" component={CheckTheme(Painful)} />
      <Route path="*" component={Error} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
