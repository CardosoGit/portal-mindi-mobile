import React from "react";
import { useHistory } from "react-router-dom";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  List,
  AppBar,
  Toolbar,
  Typography,
  Container,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

// import { Container } from './styles';

const Cardapio: React.FC = () => {
  const history = useHistory();
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Cardápio</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <List>
          <ListItem divider onClick={() => history.push("/categoria")}>
            <ListItemText primary="Pizzas" />
            <ListItemSecondaryAction>
              <IconButton>
                <ChevronRightIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem divider>
            <ListItemText primary="Bebidas" />
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

export default Cardapio;
