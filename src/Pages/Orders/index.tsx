import React, { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { format, differenceInSeconds } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
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
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import BarChartIcon from "@material-ui/icons/BarChart";
import { api } from "Services/Api";
import { Order } from "Types/Order";
import { AppContent } from "Theme";

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

  const filter = useCallback(() => {
    switch (criteria) {
      case filterType.new:
        return orders.filter(
          (order) => order.events[order.events.length - 1].event === "created"
        );
      case filterType.confirmed:
        return orders.filter(
          (order) => order.events[order.events.length - 1].event !== "created"
        );

      default:
        return orders;
    }
  }, [criteria, orders]);

  useEffect(() => {
    const today = new Date();
    api
      .get(`portal/orders?date=${format(today, "yyyy-MM-dd")}`)
      .then(({ data }) => {
        setOrders(data);
      })
      .catch((err) => alert("Erro ao buscar cardapio"));
  }, []);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography slot="start" variant="h6">
            Pedidos
          </Typography>
          <IconButton
            onClick={() => history.push("/relatorio")}
            color="inherit"
          >
            <BarChartIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <AppContent>
        <List>
          {filter()
            .sort((a, b) =>
              differenceInSeconds(new Date(b.createdAt), new Date(a.createdAt))
            )
            .map((order) => (
              <ListItem
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
      </AppContent>
      <AppBar position="fixed" style={{ top: "auto", bottom: 0 }}>
        <BottomNavigation
          showLabels
          value={criteria}
          onChange={(event, newValue) => setCriteria(newValue)}
        >
          <BottomNavigationAction label="Novos" />
          <BottomNavigationAction label="Confirmados" />
        </BottomNavigation>
      </AppBar>
    </>
  );
};

export default OrdersPage;
