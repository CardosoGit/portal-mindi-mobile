import React, { useState } from "react";
import {
  useHistory,
  useRouteMatch,
  useLocation,
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import urlSlug from "url-slug";
import {
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  Grid,
  Divider,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import { AppContent, Row } from "Theme";

// import { Container } from './styles';

const CreateLinkPage: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { url, path, isExact, params } = useRouteMatch();
  const {} = useParams();
  const { search } = useLocation();
  const searchParamValue = new URLSearchParams(search).get("searchParamName");

  const name = "Dogueria e Açai";

  const [slug, setSlug] = useState<string>(urlSlug(name));

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSlug(urlSlug(e.target.value));
  }

  //Ao carregar página verificar se slug sugerido é válido
  //Se não for válido  mostrar mensagem: A url já existe em outro restaurante, por valor tente outro.
  //

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            style={{ paddingLeft: "0px" }}
            onClick={() => history.goBack()}
          >
            <ChevronLeftIcon />
          </IconButton>
          <Typography variant="h6">Configuração - Link</Typography>
        </Toolbar>
      </AppBar>
      <AppContent>
        <Row>
          https://menu.mindi.com.br/<strong>{slug}</strong>
        </Row>
        <Row>
          <Grid container spacing={3}>
            <Grid item xs={7}>
              <TextField
                fullWidth
                value={slug}
                label="Link"
                variant="outlined"
                placeholder="digite aqui..."
                onChange={handleChange}
              />
            </Grid>
            <Grid container xs={5} alignItems="center">
              <ArrowLeftIcon fontSize="large" />
              <small>Você pode trocar</small>
            </Grid>
          </Grid>
        </Row>
        <Divider />
        <Row>
          <Button size="large" variant="contained" color="primary">
            Avançar
          </Button>
        </Row>
      </AppContent>
    </>
  );
};

export default CreateLinkPage;
