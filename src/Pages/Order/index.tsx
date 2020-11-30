import React from "react";
import {
  useHistory,
  useRouteMatch,
  useParams,
  useLocation,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import ShoppingBasketOutlinedIcon from "@material-ui/icons/ShoppingBasketOutlined";
import InfoView from "./Info";
import ProductsView from "./Products";
import { AppContent } from "Theme";
// import { Container } from './styles';

const OrderPage: React.FC = () => {
  const history = useHistory();
  const { url, path, isExact, params } = useRouteMatch();
  const dispatch = useDispatch();
  const {} = useParams();
  const { search, pathname } = useLocation();
  const tab = Number(new URLSearchParams(search).get("tab") || 1);

  const [selectedTab, setSelectedTab] = React.useState(0);

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
          <Typography variant="h6">Detalhes do Pedido</Typography>
        </Toolbar>
      </AppBar>
      <AppContent>
        {tab === 1 && <InfoView />}
        {tab === 2 && <ProductsView />}
      </AppContent>
      <AppBar position="fixed" style={{ top: "auto", bottom: 0 }}>
        <BottomNavigation
          showLabels
          value={tab - 1}
          onChange={(event, newValue) => {
            if (newValue === 0) {
              history.push({
                pathname: pathname,
                search: "?tab=1",
              });
            } else {
              history.push({
                pathname: pathname,
                search: "?tab=2",
              });
            }
          }}
        >
          <BottomNavigationAction
            label="Informações"
            icon={<InfoOutlinedIcon />}
          />
          <BottomNavigationAction
            label="Produtos"
            icon={<ShoppingBasketOutlinedIcon />}
          />
        </BottomNavigation>
      </AppBar>
    </>
  );
};

export default OrderPage;
