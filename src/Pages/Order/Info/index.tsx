import React, { useState, useEffect } from "react";
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

  return (
    <View>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={6}>
          <ListItemText primary={data.identify.name} secondary="Nome" />
        </Grid>
        <Grid container xs={6} justify="center">
          <Button variant="contained" color="primary">
            Imprimir
          </Button>
        </Grid>
      </Grid>
      <Divider />
      <List>
        <ListItemText primary={data.identify.phone} secondary="Telefone" />
        <ListItemText
          primary={`${data.address?.publicPlace} ${data.address?.number} ${data.address?.neighborhood}`}
          secondary="Endereço"
        />
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
    </View>
  );
};

export default InfoView;
