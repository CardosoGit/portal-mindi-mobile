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
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Button,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { AppContent, Row } from "Theme";

// import { Container } from './styles';

const ChooseProductsPage: React.FC = () => {
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
            style={{ paddingLeft: "0px" }}
            onClick={() => history.goBack()}
          >
            <ChevronLeftIcon />
          </IconButton>
          <Typography variant="h6">Configuração - Produtos iniciais</Typography>
        </Toolbar>
      </AppBar>
      <AppContent>
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">Quais produtos você vende?</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox name="gilad" />}
              label="Açai"
            />
            <FormControlLabel
              control={<Checkbox name="jason" />}
              label="Hamburguer"
            />
            <FormControlLabel
              control={<Checkbox name="antoine" />}
              label="Pizza"
            />
            <FormControlLabel
              control={<Checkbox name="antoine" />}
              label="Bebidas"
            />
            <FormControlLabel
              control={<Checkbox name="antoine" />}
              label="Massa"
            />
          </FormGroup>
        </FormControl>
        <Row>
          <Button size="large" variant="contained" color="primary">
            Avançar
          </Button>
        </Row>
      </AppContent>
    </>
  );
};

export default ChooseProductsPage;
