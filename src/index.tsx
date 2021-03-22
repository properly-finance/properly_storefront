import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import WindowTitle from "./comps/WindowTitle"
import Routes from "./routes";
import { APP_MOUNT_URI } from "./config";
import store from "./store"

import './index.scss';


const App: React.FC = () => {
  return (
  // <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={APP_MOUNT_URI}>
        <WindowTitle title={'Dashboard | Properly'} />
        <Routes />
      </BrowserRouter>
    </Provider>
  // </React.StrictMode>
  );
};

render(<App />, document.querySelector("#content"));
