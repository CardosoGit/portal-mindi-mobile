import React from "react";
import {
  useHistory,
  useRouteMatch,
  useLocation,
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, AppBar, Toolbar, Typography } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { AppContent } from "Theme";

// import { Container } from './styles';

const NotFoundPage: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { url, path, isExact, params } = useRouteMatch();
  const {} = useParams();
  const { search } = useLocation();
  const searchParamValue = new URLSearchParams(search).get("searchParamName");

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            style={{ paddingLeft: "0px" }}
            onClick={() => history.goBack()}
          >
            <ChevronLeftIcon />
          </IconButton>
          <Typography variant="h6">Notfound</Typography>
        </Toolbar>
      </AppBar>
      <AppContent>Página não encontrada</AppContent>
    </>
  );
};

export default NotFoundPage;
