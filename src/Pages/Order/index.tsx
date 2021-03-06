import React, { useEffect, useState, useCallback, useRef } from "react";
import { useReactToPrint } from "react-to-print";
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
import { Gestures } from "react-gesture-handler";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import PrintOutlinedIcon from "@material-ui/icons/PrintOutlined";
import ShoppingBasketOutlinedIcon from "@material-ui/icons/ShoppingBasketOutlined";
import useQueryString from "use-query-string";

import InfoView from "./Info";
import ProductsView from "./Products";
import { AppContent } from "Theme";
import { api } from "Services/Api";
import { Order } from "Types/Order";
import { Tab } from "@material-ui/icons";
import { queryAllByTestId } from "@testing-library/react";
import PrintViewView from "./PrintView";
import PrintView from "./PrintView";
// import { Container } from './styles';

function updateHistory(path: any) {
  window.history.replaceState(null, document.title, path);
}

const OrderPage: React.FC = () => {
  const history = useHistory();
  const { url, path, isExact, params } = useRouteMatch();
  const dispatch = useDispatch();
  const {} = useParams();
  const { search, pathname } = useLocation();
  const [query, setQuery] = useQueryString(window.location, updateHistory, {
    parseBooleans: true,
  });

  const printView = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => printView.current,
  });

  const tab = Number(query.tab || 1);

  const id = query.id;

  const [order, setOrder] = useState<Order | null>(null);

  const handleGesture = (event: HammerInput) => {
    if (event.type === "swiperight") {
      setQuery({
        tab: "1",
      });
    } else {
      setQuery({
        tab: "2",
      });
    }
  };

  useEffect(() => {
    api
      .get("orders/" + id)
      .then(({ data }) => {
        setOrder(data);
      })
      .catch((err) => alert(err));
  }, [id]);

  return (
    <Gestures
      recognizers={{
        Swipe: {
          events: {
            swiperight: (event) => handleGesture(event),
            swipeleft: (event) => handleGesture(event),
          },
        },
      }}
    >
      <AppBar position="fixed">
        <Toolbar>
          <IconButton color="inherit" onClick={() => history.goBack()}>
            <ChevronLeftIcon />
          </IconButton>
          <Typography variant="h6">Detalhes do Pedido</Typography>
          <IconButton
            onClick={handlePrint}
            color="inherit"
            style={{ paddingLeft: "0px" }}
            href="#"
          >
            <PrintOutlinedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <AppContent bottomPadding>
        {!order && <div>buscando...</div>}
        {order && tab === 1 && <InfoView data={order} />}
        {order && tab === 2 && <ProductsView data={order} />}
      </AppContent>
      <AppBar position="fixed" style={{ top: "auto", bottom: 0 }}>
        <BottomNavigation
          showLabels
          value={tab - 1}
          onChange={(event, newValue) => {
            if (newValue === 0) {
              setQuery({
                tab: "1",
              });
            } else {
              setQuery({
                tab: "2",
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
      {/* <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 99999,
          background: "white",
          width: "100%",
        }}
      >
        {order && <PrintView order={order as Order} ref={printView} />}
      </div> */}
      {order && <PrintView order={order as Order} ref={printView} />}
    </Gestures>
  );
};

export default OrderPage;
