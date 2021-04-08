import React from "react"
import { render } from "react-dom"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { Provider as ReduxProvider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
// ..
// import { APP_MOUNT_URI } from "./config";
import store, { history } from "./store"
import ThemeProvider from "./comps/ThemeProvider"
import NotFound from "./comps/NotFound"
import LayoutSection from "./comps/LayoutSection"
import SectionRoute from "./comps/SectionRoute"
import DepositSection from "./comps/DepositSection"
import FarmSection from "./comps/FarmSection"

function App():JSX.Element {
  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <ConnectedRouter history={history}>
            <LayoutSection>
              <Switch>
                <SectionRoute exact path="/" component={DepositSection} />
                <SectionRoute exact path="/farm" component={FarmSection} />
                <Route component={NotFound} />        
              </Switch>
            </LayoutSection>
          </ConnectedRouter>
        </ThemeProvider>
      </BrowserRouter>
    </ReduxProvider>
)};

render(<App />, document.querySelector("#content"));
