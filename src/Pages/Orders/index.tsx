import React, { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
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
import SearchBar from "react-js-search";
import SearchField from "react-search-field";
import { Gestures } from "react-gesture-handler";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import HomeIcon from "@material-ui/icons/Home";
import BarChartIcon from "@material-ui/icons/BarChart";
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

  const byStatus = (criteria: any) => (order: Order) => {
    switch (criteria) {
      case filterType.new:
        return order.events[order.events.length - 1].event === "created";

      case filterType.confirmed:
        return order.events[order.events.length - 1].event !== "created";

      default:
        return true;
    }
  };

  const handleGesture = (event: HammerInput) => {
    if (event.type === "swiperight") {
      setCriteria(filterType.new);
    } else {
      setCriteria(filterType.confirmed);
    }
  };

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
    const { data } = await api.get(
      `portal/orders?date=${format(today, "yyyy-MM-dd")}`
    );
    return data;
  };

  const playAlert = () => {
    let src =
      "//s3.amazonaws.com/appforest_uf/f1598429253106x343351561325749800/apple_msg_tone.mp3";

    for (let x = 1; x <= 10; x++) {
      setTimeout(() => {
        let audio = new Audio(src);
        audio.play();
      }, 100 * x);
    }
  };

  useInterval(() => {
    getOrders()
      .then((fetchedOrders) => {
        if (fetchedOrders.length > orders.length) {
          playAlert();
        }
        setOrders(fetchedOrders);
      })
      .catch((err) => alert("Erro ao buscar Pedidos"));
  }, 30000);

  useEffect(() => {
    getOrders()
      .then((orders) => setOrders(orders))
      .catch((err) => alert("Erro ao buscar Pedidos"));
  }, []);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            style={{ paddingLeft: "0px" }}
            onClick={() => (window.location = window.location.origin)}
          >
            <HomeIcon />
          </IconButton>
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

      <AppContent bottomPadding={true}>
        <SearchField
          onChange={onSearchChange}
          placeholder={"Pesquise por cliente..."}
        />
        <List>
          {orders
            .filter(byStatus(criteria))
            .filter(byName(filterText))
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
        {criteria === filterType.new &&
          orders.filter(byStatus(criteria)).length === 0 && (
            <Row horizontalCenter>Aguardando novos pedidos...</Row>
          )}
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
