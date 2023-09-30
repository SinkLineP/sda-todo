import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import {persistor, store} from "./store/store.js";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend'
import {PersistGate} from "redux-persist/integration/react";




const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <DndProvider backend={HTML5Backend}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </PersistGate>
      </Provider>
    </DndProvider>
  </BrowserRouter>
);

reportWebVitals();