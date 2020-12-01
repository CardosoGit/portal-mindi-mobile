import React, { useEffect, useState } from "react";
import {
  useHistory,
  useRouteMatch,
  useLocation,
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { format } from "date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ptBrLocale from "date-fns/locale/pt-BR";

import { AppContent, Row } from "Theme";
import { api } from "Services/Api";
import { Order } from "Types/Order";

// import { Container } from './styles';

const StatsPage: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { url, path, isExact, params } = useRouteMatch();
  const {} = useParams();
  const { search } = useLocation();
  const searchParamValue = new URLSearchParams(search).get("searchParamName");

  const [selectedDate, handleDateChange] = React.useState<Date | null>(
    new Date()
  );

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

  const count = orders.length;
  const total = orders.reduce((acum, order) => acum + order.total, 0);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            style={{ paddingLeft: "0px" }}
            onClick={() => history.goBack()}
          >
            <ChevronLeftIcon />
          </IconButton>
          <Typography variant="h6">Relatório</Typography>
        </Toolbar>
      </AppBar>
      <AppContent>
        <Row horizontalCenter>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBrLocale}>
            <DatePicker
              disableFuture
              openTo="date"
              format="dd/MM/yyyy"
              label="Escolha o dia"
              views={["month", "date"]}
              value={selectedDate}
              onChange={handleDateChange}
            />
          </MuiPickersUtilsProvider>
        </Row>
        <List>
          <ListItem>
            <ListItemText primary="Pedidos recebidos" />
            <ListItemSecondaryAction>{count}</ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemText primary="Total de pedidos" />
            <ListItemSecondaryAction>
              {total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemText primary="Ticket médio" />
            <ListItemSecondaryAction>
              {(total / count).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </AppContent>
    </>
  );
};

export default StatsPage;
