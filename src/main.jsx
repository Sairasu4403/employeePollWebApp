import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import middleware from "./middleware";
import { BrowserRouter as Router } from "react-router-dom";

const store = createStore(reducer, middleware);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <div className="app-shell" data-bs-theme="light">
          <App />
        </div>
      </Router>
    </Provider>
  </React.StrictMode>
);