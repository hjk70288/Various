import React from "react";
import "Styles/reset.scss";
import "Styles/common.scss";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from "Pages/Main/Main";
import Art1 from "Pages/Art1/Art1";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/art1" component={Art1} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
