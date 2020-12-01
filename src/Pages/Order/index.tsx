import React, { useEffect, useState } from "react";
import {
  useHistory,
  useRouteMatch,
  useParams,
  useLocation,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import ShoppingBasketOutlinedIcon from "@material-ui/icons/ShoppingBasketOutlined";
import useQueryString from "use-query-string";

import InfoView from "./Info";
import ProductsView from "./Products";
import { AppContent } from "Theme";
import { api } from "Services/Api";
import { Order } from "Types/Order";
// import { Container } from './styles';

function updateHistory(path: any) {
  window.history.pushState(null, document.title, path);
}

const OrderPage: React.FC = () => {
  const history = useHistory();
  const { url, path, isExact, params } = useRouteMatch();
  const dispatch = useDispatch();
  const {} = useParams();
  const { search, pathname } = useLocation();
  const [query, setQuery] = useQueryString(window.location, updateHistory, {
    parseBooleans: true,
  });

  const tab = Number(query.tab || 1);
  const id = query.id;

  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    api
      .get("orders/" + id)
      .then(({ data }) => {
        setOrder(data);
      })
      .catch((err) => alert(err));
  }, [id]);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            style={{ paddingLeft: "0px" }}
            onClick={() => history.replace("/pedidos")}
          >
            <ChevronLeftIcon />
          </IconButton>
          <Typography variant="h6">Detalhes do Pedido</Typography>
        </Toolbar>
      </AppBar>
      <AppContent>
        {!order && <div>buscando...</div>}
        {order && tab === 1 && <InfoView data={order} />}
        {order && tab === 2 && <ProductsView data={order} />}
      </AppContent>
      <AppBar position="fixed" style={{ top: "auto", bottom: 0 }}>
        <BottomNavigation
          showLabels
          value={tab - 1}
          onChange={(event, newValue) => {
            if (newValue === 0) {
              setQuery({
                tab: "1",
              });
            } else {
              setQuery({
                tab: "2",
              });
            }
          }}
        >
          <BottomNavigationAction
            label="Informações"
            icon={<InfoOutlinedIcon />}
          />
          <BottomNavigationAction
            label="Produtos"
            icon={<ShoppingBasketOutlinedIcon />}
          />
        </BottomNavigation>
      </AppBar>
    </>
  );
};

export default OrderPage;
