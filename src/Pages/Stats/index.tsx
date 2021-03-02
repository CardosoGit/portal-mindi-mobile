import React, { useEffect, useState, useCallback } from "react";
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
  Paper,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { format, isToday } from "date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ptBrLocale from "date-fns/locale/pt-BR";
import useQueryString from "use-query-string";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import { AppContent, Row } from "Theme";
import { api } from "Services/Api";
import { Order } from "Types/Order";
import BoxResume from "Components/BoxResume";
import getListByCategories from "./getListByCategories";
import getListByProducts from "./getListByProducts";
import getListByPaymentMethod from "./getListByPaymentMethod";
import getListByDeliveryType from "./getListByDeliveryType";

// import { Container } from './styles';

function updateHistory(path: any) {
  window.history.replaceState(null, document.title, path);
}

const StatsPage: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { url, path, isExact, params } = useRouteMatch();
  const {} = useParams();
  const { search } = useLocation();
  const searchParamValue = new URLSearchParams(search).get("searchParamName");

  const [query, setQuery] = useQueryString(window.location, updateHistory, {
    parseBooleans: true,
  });

  const [selectedDate, handleDateChange] = React.useState<Date | null>(
    query.date ? new Date(`${query.date}T00:00:00-03:00`) : new Date()
  );

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const date = format(selectedDate || new Date(), "yyyy-MM-dd");
    setQuery({
      date: date,
    });

    api
      .get(`portal/orders?date=${date}`)
      .then(({ data }) => {
        setOrders(data);
        setIsLoading(false);
      })
      .catch((err) => alert("Erro ao buscar cardapio"));
  }, [selectedDate]);

  function ehHoje(date: Date | null) {
    return isToday(date as Date);
  }

  const count = orders.length;
  const faturamentoProdutos = orders.reduce(
    (acum, order) => acum + order.totalProducts,
    0
  );
  const taxDelivery = orders.reduce(
    (acum, order) => acum + (order.deliveryFee || 0),
    0
  );
  const total = orders.reduce((acum, order) => acum + order.total, 0);

  const byCategoriesList = useCallback(() => {
    return getListByCategories(orders);
  }, [orders]);

  const byProductsList = useCallback(() => {
    return getListByProducts(orders);
  }, [orders]);

  const byPaymentMethodList = useCallback(() => {
    return getListByPaymentMethod(orders);
  }, [orders]);

  const byDeliveryType = useCallback(() => {
    return getListByDeliveryType(orders);
  }, [orders]);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton color="inherit" onClick={() => history.goBack()}>
            <ChevronLeftIcon />
          </IconButton>
          <Typography variant="h6">Relatório por dia</Typography>
        </Toolbar>
      </AppBar>

      <AppContent>
        {isLoading && <Row horizontalCenter>Gerando Relatório...</Row>}
        {isLoading === false && (
          <>
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
            {ehHoje(selectedDate) === true && count === 0 && (
              <Row horizontalCenter>Você ainda não recebeu pedidos hoje.</Row>
            )}
            {count === 0 && ehHoje(selectedDate) === false && (
              <Row horizontalCenter>Você não recebeu pedidos neste dia.</Row>
            )}

            {count > 0 && (
              <List>
                <Paper elevation={3}>
                  <ListItem
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      history.push(
                        `/pedidos?date=${format(
                          selectedDate as Date,
                          "yyyy-MM-dd"
                        )}`
                      )
                    }
                  >
                    <ListItemText
                      primary={`Você recebeu ${count} pedidos`}
                      secondary={"Clique aqui para ver"}
                    />

                    <ListItemSecondaryAction>
                      <IconButton color="primary">
                        <ChevronRightIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </Paper>
                <ListItem>
                  <ListItemText primary="Total em produtos" />
                  <ListItemSecondaryAction>
                    {faturamentoProdutos.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Taxas de entrega" />
                  <ListItemSecondaryAction>
                    {taxDelivery.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Faturamento Total" />
                  <ListItemSecondaryAction>
                    {total.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Ticket médio (produtos)" />
                  <ListItemSecondaryAction>
                    {(faturamentoProdutos / count).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            )}
            <BoxResume title="Por categorias" list={byCategoriesList()} />
            <BoxResume title="Por produtos" list={byProductsList()} />
            <BoxResume
              title="Por método de entrega"
              list={byDeliveryType()}
            />
            <BoxResume
              title="Por forma de pagamento"
              list={byPaymentMethodList()}
            />
          </>
        )}
      </AppContent>
    </>
  );
};

export default StatsPage;
