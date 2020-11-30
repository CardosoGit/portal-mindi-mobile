import React from "react";
import {
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Button,
  TextField,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Row } from "../../Theme";
import { useHistory } from "react-router-dom";

// import { Container } from './styles';

const ProductPage: React.FC = () => {
  const history = useHistory();
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={() => history.goBack()}
            style={{ paddingLeft: "0px" }}
            color="inherit"
          >
            <ChevronLeftIcon style={{ fontSize: "30px" }} />
          </IconButton>
          <Typography variant="h6">Pizza G</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={6}>
            <img src="https://diariodorio.com/wp-content/uploads/2020/07/daleopizzaria_20200710_144435_0-1280x720.jpg" />
          </Grid>
          <Grid item xs={6}>
            <Button size="small" variant="contained" color="primary">
              Trocar imagem
            </Button>
          </Grid>
        </Grid>

        <Row>
          <TextField
            fullWidth
            label="Nome"
            variant="outlined"
            placeholder="digite aqui..."
          />
        </Row>
        <Row>
          <TextField
            fullWidth
            label="Detalhes"
            variant="outlined"
            placeholder="digite aqui..."
          />
        </Row>
        <Row>
          <TextField label="Preço" type="number" variant="outlined" />
        </Row>
        <Row>
          <Button fullWidth variant="contained" color="primary">
            Salvar
          </Button>
        </Row>
      </Container>
    </>
  );
};

export default ProductPage;
