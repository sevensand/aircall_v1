import React from "react";
import {Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { PublicPages } from "./Router";
import {HeaderLayout} from '../containers'
export const history = createBrowserHistory();
const RouterConfig = () => {
  return (
    <Router history={history}>
                <HeaderLayout />
      <Switch>
      {PublicPages.map((R, k) => {
        return <Route key={k} {...R} />;
        })}
      </Switch>
    </Router>
  );
};

export const AppRouter = RouterConfig;
