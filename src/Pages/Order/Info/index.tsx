import React from "react";
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

// import { Container } from './styles';

const InfoView: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { url, path, isExact, params } = useRouteMatch();
  const {} = useParams();
  const { search } = useLocation();
  const searchParamValue = new URLSearchParams(search).get("searchParamName");

  return (
    <View>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={6}>
          <ListItemText primary="João Cardoso" secondary="Nome" />
        </Grid>
        <Grid container xs={6} justify="center">
          <Button variant="contained" color="primary">
            Imprimir
          </Button>
        </Grid>
      </Grid>
      <Divider />
      <List>
        <ListItemText primary="(55) 9999-8888" secondary="Telefone" />
        <ListItemText
          primary="Rua Dr. pestana, 187 Luiz Fogliatto"
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
            R$ 20,00
          </Grid>
        </Grid>
      </Row>
      <Row>
        <Grid container alignItems="center">
          <Grid item xs={6}>
            Taxa de entrega
          </Grid>
          <Grid container xs={6} justify="flex-end">
            R$ 20,00
          </Grid>
        </Grid>
      </Row>
      <Row>
        <Grid container alignItems="center">
          <Grid item xs={6}>
            Total
          </Grid>
          <Grid container xs={6} justify="flex-end">
            R$ 40,00
          </Grid>
        </Grid>
      </Row>
    </View>
  );
};

export default InfoView;
