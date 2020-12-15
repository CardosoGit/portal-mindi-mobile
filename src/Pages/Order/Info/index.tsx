import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  useHistory,
  useRouteMatch,
  useLocation,
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, View } from "Theme";
import {
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { Order } from "Types/Order";
import { api } from "Services/Api";
import { getPaymentMethod } from "Utils/indes";

// import { Container } from './styles';

type InfoViewType = {
  data: Order;
};

const InfoView: React.FC<InfoViewType> = ({ data }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { url, path, isExact, params } = useRouteMatch();
  const {} = useParams();
  const { search } = useLocation();

  const isConfirmed = data.events.some((event) => event.event === "printed");

  function handleConfirm() {
    api
      .post(`orders/${data._id}/events`, { name: "printed" })
      .then(() => {
        history.push("/pedidos");
      })
      .catch((err) => alert("Não foi possível confirmar. Tente novamente"));
  }

  return (
    <View>
      <Row>Pedido recebido às {format(new Date(data.createdAt), "HH:mm")}</Row>
      <Divider />
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={6}>
          <ListItemText primary={data.identify.name} secondary="Nome" />
        </Grid>
        <Grid container xs={6} justify="center">
          {!isConfirmed && (
            <Button onClick={handleConfirm} variant="contained" color="primary">
              Confirmar
            </Button>
          )}
        </Grid>
      </Grid>
      <Divider />
      <List>
        <ListItemText primary={data.identify.phone} secondary="Telefone" />
        {data.address?.number && (
          <ListItemText
            primary={`${data.address?.publicPlace} ${data.address?.number} ${data.address?.neighborhood}`}
            secondary="Endereço"
          />
        )}
      </List>
      <Divider />
      <Row>
        <Grid container alignItems="center">
          <Grid item xs={6}>
            Total de Produtos
          </Grid>
          <Grid container xs={6} justify="flex-end">
            {data.totalProducts.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Grid>
        </Grid>
      </Row>
      {data.address?.number && (
        <Row>
          <Grid container alignItems="center">
            <Grid item xs={6}>
              Taxa de entrega
            </Grid>
            <Grid container xs={6} justify="flex-end">
              {data.deliveryFee?.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </Grid>
          </Grid>
        </Row>
      )}
      <Row>
        <Grid container alignItems="center">
          <Grid item xs={6}>
            Total
          </Grid>
          <Grid container xs={6} justify="flex-end">
            {data.total.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Grid>
        </Grid>
      </Row>
      <Divider />
      {data.address?.number && (
        <Row>
          Pagamento com{" "}
          {getPaymentMethod(data.payment?.paymentMethod as string)}
        </Row>
      )}
      {data.address?.number && data.payment?.change && (
        <Row>
          Troco para{" "}
          {data.payment.change.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </Row>
      )}
      {data.note && <Row>Observação do pedido: {data.note}</Row>}
    </View>
  );
};

export default InfoView;
