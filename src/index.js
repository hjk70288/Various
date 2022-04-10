import React from "react";
import "Styles/reset.scss";
import "Styles/common.scss";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from "Pages/Main/Main";
import Art1 from "Pages/Art1/Art1";
import Error from "Pages/Error/Error";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/art1" component={Art1} />
      <Route path="*" component={Error} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
