import React, { useEffect, useState } from "react";
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
import { api } from "Services/Api";
import { Category } from "Types/Category";

// import { Container } from './styles';

const Cardapio: React.FC = () => {
  const history = useHistory();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    api
      .get("menu/categories")
      .then(({ data }) => {
        setCategories(data);
      })
      .catch((err) => alert("Erro ao buscar cardapio"));
  }, []);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Cardápio</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <List>
          {categories.map((category) => (
            <ListItem
              divider
              onClick={() =>
                history.push(`/categoria?categoryId=${category._id}`)
              }
            >
              <ListItemText primary={category.nameShow} />
              <ListItemSecondaryAction>
                <IconButton>
                  <ChevronRightIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Container>
    </>
  );
};

export default Cardapio;
