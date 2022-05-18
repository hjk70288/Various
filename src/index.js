import React from "react";
import "Styles/reset.scss";
import "Styles/common.scss";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CheckTheme from "Components/HOC/CheckTheme";
import Main from "Pages/Main/Main";
import Art1 from "Pages/Art1/Art1";
import Art2 from "Pages/Art2/Art2";
import Art3 from "Pages/Art3/Art3";
import Error from "Pages/Error/Error";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={CheckTheme(Main)} />
      <Route path="/art1" component={CheckTheme(Art1)} />
      <Route path="/art2" component={CheckTheme(Art2)} />
      <Route path="/art3" component={CheckTheme(Art3)} />
      <Route path="*" component={Error} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
