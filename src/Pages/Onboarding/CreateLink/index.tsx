import React, { useState, useEffect } from "react";
import { useGraphQL } from "graphql-react";
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
import { api } from "Services/Api";
import { fetchOptionsOverride } from "Services/GraphqlRequest";
import Loading from "Components/Loading";
import { JSDocNonNullableType } from "typescript";

// import { Container } from './styles';

const CreateLinkPage: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { url, path, isExact, params } = useRouteMatch();
  const {} = useParams();
  const { search } = useLocation();
  const searchParamValue = new URLSearchParams(search).get("searchParamName");

  const name = "Dogueria e Açai";

  const [slug, setSlug] = useState<string | null>(urlSlug(""));
  const [slugErrorMessage, setSlugErrorMessage] = useState<string>("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSlugErrorMessage("");
    setSlug(e.target.value);
  }

  const { loading, cacheValue } = useGraphQL<any, {}>({
    operation: {
      query: /* GraphQL */ `
        query {
          store {
            name
            alias
          }
        }
      `,
      variables: {},
    },
    fetchOptionsOverride: fetchOptionsOverride,
    loadOnMount: true,
    loadOnReload: true,
    loadOnReset: false,
  });

  const { loading: saving, load: save } = useGraphQL<any, {}>({
    operation: {
      query: /* GraphQL */ `
        mutation($alias: String) {
          UpdateStore(alias: $alias) {
            name
            whatsapp
          }
        }
      `,
      variables: { alias: `menu.mindi.com.br/${urlSlug(slug)}` },
    },
    fetchOptionsOverride: fetchOptionsOverride,
    loadOnMount: false,
    loadOnReload: false,
    loadOnReset: false,
  });

  async function validateAlias() {
    setSlugErrorMessage("");
    try {
      await api.get(`https://mindi-api-02.herokuapp.com/store/data`, {
        headers: { url: `menu.mindi.com.br/${urlSlug(slug)}` },
      });
      setSlugErrorMessage("Essa url já está em uso. Tente outra, por favor.");
      return false;
    } catch (err) {
      return true;
    }
  }

  useEffect(() => {
    if (!!cacheValue) {
      setSlug(urlSlug(cacheValue.data.store.name));
    }
  }, [cacheValue]);

  function handleSave() {
    validateAlias().then((isValid) => isValid && save());
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
          <small>https://menu.mindi.com.br/</small>
          <strong>{slug}</strong>
        </Row>
        <Row>
          <Grid container spacing={3}>
            <Grid item xs={10}>
              <TextField
                fullWidth
                value={slug}
                label="Personalize o seu link"
                variant="outlined"
                placeholder="digite aqui..."
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Row>
        {slugErrorMessage && (
          <Row>
            <span style={{ color: "red" }}>
              Esse link personalizado já existe em outro restaurante, por favor
              tente outro.
            </span>
          </Row>
        )}
        <Divider />
        <Row>
          <Button
            onClick={handleSave}
            size="large"
            variant="contained"
            color="primary"
          >
            Avançar
            <Loading show={saving} size="20px" />
          </Button>
        </Row>
        <Loading show={!cacheValue} />
      </AppContent>
    </>
  );
};

export default CreateLinkPage;
