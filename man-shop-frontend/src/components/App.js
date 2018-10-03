import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { Door, Musinsa, MusinsaItems, NotFound } from "pages";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Musinsa} />
          <Route exact path="/musinsa" component={Musinsa} />
          <Route path="/musinsa/items" component={MusinsaItems} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
