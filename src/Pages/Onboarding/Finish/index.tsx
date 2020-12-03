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
  Button,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { AppContent, Row } from "Theme";

// import { Container } from './styles';

const FinishPage: React.FC = () => {
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
          <Typography variant="h6">Configuração - Último passo</Typography>
        </Toolbar>
      </AppBar>
      <AppContent>
        <Row horizontalCenter>
          <Button variant="outlined" color="primary">
            Ver Cardápio
          </Button>
        </Row>
        <Row horizontalCenter>
          <Button variant="text" color="primary">
            Salvar Atalho do App
          </Button>
        </Row>
        {/* <Row horizontalCenter>
          <Button variant="outlined" color="primary">
            Oferta Exclusiva
          </Button>
        </Row> */}
      </AppContent>
    </>
  );
};

export default FinishPage;
