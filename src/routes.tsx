import React from "react";
import {Route, Switch } from "react-router-dom";
import SectionRoute from "./comps/SectionRoute"
import NotFound from "./comps/NotFound"
import HomePage from "./pages/HomePage"
// import NotFoundPage from "./pages/NotFoundPage";

const Routes: React.FC = () => {
  return (
    <Switch>
      <SectionRoute exact path="/" component={HomePage} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;