import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Offline, Online } from "react-detect-offline";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import OfflineSplash from "./Components/OfflineSplash";
import store from "./Store";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2dad67",
      contrastText: "#fff",
    },
  },
});

theme.overrides = {
  ...theme.overrides,
  MuiContainer: {
    root: {
      paddingTop: "20px",
    },
  },
  MuiSvgIcon: {
    root: {
      fontSize: "30px",
    },
  },
  MuiListItemSecondaryAction: {
    root: {
      "& .MuiIconButton-root": {
        color: theme.palette.primary.main,
      },
    },
  },
  MuiToolbar: {
    root: {
      "& .MuiTypography-root": {
        flexGrow: 1,
        textAlign: "left",
      },
    },
  },
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
        <Offline polling={false}>
          <OfflineSplash />
        </Offline>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
