import React from "react";
import { useHistory } from "react-router-dom";
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

// import { Container } from './styles';

const OrdersPage: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
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
          <ListItem onClick={() => history.push("/pedido")} divider>
            <ListItemText primary="João Cardoso" secondary="Retirada" />
            <ListItemSecondaryAction>
              <IconButton color="primary">
                <ChevronRightIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem divider>
            <ListItemText primary="Cleia brito" secondary="Entrega" />
            <ListItemSecondaryAction>
              <IconButton>
                <ChevronRightIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Container>
    </>
  );
};

export default OrdersPage;
