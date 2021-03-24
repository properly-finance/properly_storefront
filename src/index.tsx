import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider as ReduxProvider } from 'react-redux';
import AppTitle from "./comps/AppTitle"
// ..
// import { APP_MOUNT_URI } from "./config";
import store from "./store";
import ThemeProvider from "./comps/ThemeProvider"
import NotFound from "./comps/NotFound"
import AppLayout from "./comps/AppLayout"
import SectionRoute from "./comps/SectionRoute"
import DepositCollateralPage from "./pages/DepositCollateralPage"


const WithdrawCollateralPage: React.FC = () => {
  return (
    <div>WithdrawCollateralPage</div>
  )
}

function App():JSX.Element {
  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <AppTitle title={'Dashboard | Properly'} />
          <AppLayout>        
            <Switch>
              <SectionRoute exact path="/" component={DepositCollateralPage} />
              <SectionRoute exact path="/withdraw-collateral" component={WithdrawCollateralPage} />
              <Route component={NotFound} />        
            </Switch>
          </AppLayout>
        </ThemeProvider>
      </BrowserRouter>
    </ReduxProvider>
)};

render(<App />, document.querySelector("#content"));
