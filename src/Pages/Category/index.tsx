import React from "react";
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
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { useHistory } from "react-router-dom";

// import { Container } from './styles';

const CategoryPage: React.FC = () => {
  const history = useHistory();
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            style={{ paddingLeft: "0px" }}
            color="inherit"
            onClick={() => history.goBack()}
          >
            <ChevronLeftIcon style={{ fontSize: "30px" }} />
          </IconButton>
          <Typography variant="h6">Title</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <List>
          <ListItem divider onClick={() => history.push("/produto")}>
            <ListItemText primary="Tamanho P" />
            <ListItemSecondaryAction>
              <IconButton>
                <ChevronRightIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemText primary="Tamanho M" />
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

export default CategoryPage;
