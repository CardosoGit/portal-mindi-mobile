import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";
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
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import BarChartIcon from "@material-ui/icons/BarChart";
import { api } from "Services/Api";
import { Order } from "Types/Order";

// import { Container } from './styles';

const OrdersPage: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [orders, setOrders] = useState<Order[]>([]);

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
      <AppBar position="static">
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
      <Container maxWidth="sm">
        <List>
          {orders.map((order) => (
            <ListItem
              key={order._id}
              onClick={() => history.push(`/pedido?id=${order._id}`)}
              divider
            >
              <ListItemText
                primary={order.identify.name}
                secondary="Retirada"
              />
              <ListItemSecondaryAction>
                <IconButton color="primary">
                  <ChevronRightIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Container>
    </>
  );
};

export default OrdersPage;
