import React from "react";
import "./App.css";
import Cardapio from "./Pages/Cardapio";
import ProductPage from "./Pages/Product";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import CategoryPage from "./Pages/Category";
import OrdersPage from "./Pages/Orders";
import OrderPage from "./Pages/Order";
import StatsPage from "Pages/Stats";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/produto">
            <ProductPage />
          </Route>
          <Route exact path="/categoria">
            <CategoryPage />
          </Route>
          <Route exact path="/">
            <Cardapio />
          </Route>
          <Route exact path="/pedidos">
            <OrdersPage />
          </Route>
          <Route exact path="/pedido">
            <OrderPage />
          </Route>
          <Route exact path="/relatorio">
            <StatsPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
