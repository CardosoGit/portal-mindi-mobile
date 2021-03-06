import React, { useEffect, useState, useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { format, differenceInSeconds } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import useInterval from "@use-it/interval";
import {
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Container,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  BottomNavigation,
  BottomNavigationAction,
} from "@material-ui/core";
import SearchField from "react-search-field";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { api } from "Services/Api";
import { Order } from "Types/Order";
import { AppContent, Row } from "Theme";
import { setInterval } from "timers";

// import { Container } from './styles';

enum filterType {
  new = 0,
  confirmed = 1,
}

const OrdersPage: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [orders, setOrders] = useState<Order[]>([]);
  const [criteria, setCriteria] = useState<number>(filterType.new);
  const [filterText, setFilterText] = useState<string>("");

  const { search } = useLocation();

  const dateParam = new URLSearchParams(search).get("date");

  const onSearchChange = (event: string) => {
    setFilterText(event);
  };

  const byName = (textToFilter: string) => (order: Order) => {
    return (
      order.identify.name.toLowerCase().search(textToFilter.toLowerCase()) !==
      -1
    );
  };

  const getOrders = async (): Promise<Order[]> => {
    const today = new Date();
    const date = dateParam || format(today, "yyyy-MM-dd");
    const { data } = await api.get(`portal/orders?date=${date}`);
    return data;
  };

  useEffect(() => {
    getOrders()
      .then((orders) => setOrders(orders))
      .catch((err) => alert("Erro ao buscar Pedidos"));
  }, []);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton color="inherit" onClick={() => history.goBack()}>
            <ChevronLeftIcon />
          </IconButton>
          <Typography slot="start" variant="h6">
            Pedidos
          </Typography>
        </Toolbar>
      </AppBar>

      <AppContent bottomPadding={true}>
        <SearchField
          onChange={onSearchChange}
          placeholder={"Pesquise por cliente..."}
        />
        <List>
          {orders
            .filter(byName(filterText))
            .sort((a, b) =>
              differenceInSeconds(new Date(b.createdAt), new Date(a.createdAt))
            )
            .map((order) => (
              <ListItem
                style={{ cursor: "pointer" }}
                key={order._id}
                onClick={() => history.push(`/pedido?id=${order._id}`)}
                divider
              >
                <ListItemText
                  primary={order.identify.name}
                  secondary={order.address?.number ? "Entrega" : "Retirada"}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    color="primary"
                    onClick={() => history.push(`/pedido?id=${order._id}`)}
                  >
                    <ChevronRightIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
        </List>
        {orders.length === 0 && (
          <Row horizontalCenter>Nenhum pedido recebido.</Row>
        )}
      </AppContent>
    </>
  );
};

export default OrdersPage;
