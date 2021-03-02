import React from "react";
import GraphqlReact, { GraphQL, GraphQLContext } from "graphql-react";
import "./App.css";
import Cardapio from "./Pages/Cardapio";
import ProductPage from "./Pages/Product";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import CategoryPage from "./Pages/Category";
import OrdersPage from "./Pages/Orders";
import OrderPage from "./Pages/Order";
import StatsPage from "Pages/Stats";
import NotFoundPage from "Pages/404";
import OnboardingPage from "Pages/Onboarding";
import CreateLinkPage from "Pages/Onboarding/CreateLink";
import ChooseProductsPage from "Pages/Onboarding/ChooseProducts";
import FinishPage from "Pages/Onboarding/Finish";
import HomePage from "Pages/Home";
import OrdersTodayPage from "Pages/OrdersToday";

const graphql = new GraphQL();

function App() {
  return (
    <div className="App">
      <GraphQLContext.Provider value={graphql}>
        <Router basename="/m">
          <Switch>
            {/* <Route exact path="/produto">
              <ProductPage />
            </Route>
            <Route exact path="/categoria">
              <CategoryPage />
            </Route> */}
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/pedidos">
              <OrdersPage />
            </Route>
            <Route exact path="/pedidos-hoje">
              <OrdersTodayPage />
            </Route>
            <Route exact path="/pedido">
              <OrderPage />
            </Route>
            <Route exact path="/relatorio">
              <StatsPage />
            </Route>
            {/* <Route exact path="/onboarding/link">
              <CreateLinkPage />
            </Route>
            <Route exact path="/onboarding/choose-products">
              <ChooseProductsPage />
            </Route>
            <Route exact path="/onboarding/finish">
              <FinishPage />
            </Route> */}
            <Route component={NotFoundPage} />
          </Switch>
        </Router>
      </GraphQLContext.Provider>
    </div>
  );
}

export default App;
