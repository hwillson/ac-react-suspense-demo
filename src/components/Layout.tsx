import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Header } from "./Header";
import { IssueList } from "./IssueList";
import { IssueDetail } from "./IssueDetail";

export function Layout() {
  return (
    <div className="layout">
      <Header />
      <Router>
        <Switch>
          <Route exact path="/">
            <IssueList />
          </Route>
          <Route path="/issue/:id">
            <IssueDetail />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
