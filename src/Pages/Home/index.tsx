import React from "react";
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
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Divider,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import HomeIcon from "@material-ui/icons/Home";
import Paper from "@material-ui/core/Paper";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import { AppContent } from "Theme";

// import { Container } from './styles';

const HomePage: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { url, path, isExact, params } = useRouteMatch();
  const {} = useParams();
  const { search } = useLocation();
  const searchParamValue = new URLSearchParams(search).get("searchParamName");

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={() => (window.location.href = window.location.origin)}
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6">Gestor de Pedidos</Typography>
        </Toolbar>
      </AppBar>
      <AppContent>
        <List>
          <Paper elevation={3}>
            <ListItem
              style={{ cursor: "pointer" }}
              onClick={() => history.push(`/pedidos-hoje`)}
            >
              <ListItemText
                primary={"Acompanhar pedidos"}
                secondary={"Monitore os pedidos do dia"}
              />
              <ListItemSecondaryAction>
                <IconButton color="primary">
                  <ChevronRightIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </Paper>

          <Paper style={{ marginTop: "10px" }} elevation={3}>
            <ListItem
              style={{ cursor: "pointer" }}
              onClick={() => history.push(`/relatorio`)}
            >
              <ListItemText
                primary={"Relatórios"}
                secondary={"Veja o que foi vendido nos outros dias"}
              />
              <ListItemSecondaryAction>
                <IconButton color="primary">
                  <ChevronRightIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </Paper>
        </List>
      </AppContent>
    </>
  );
};

export default HomePage;
