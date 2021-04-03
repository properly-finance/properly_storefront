import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider as ReduxProvider } from 'react-redux';
import TitleSection from "./sections/TitleSection"
// ..
// import { APP_MOUNT_URI } from "./config";
import store from "./store";
import ThemeProvider from "./comps/ThemeProvider"
import NotFound from "./comps/NotFound"
import LayoutSection from "./sections/LayoutSection"
import SectionRoute from "./comps/SectionRoute"
import CollateralSection from "./sections/CollateralSection"


const FarmSection: React.FC = () => {
  return (
    <div>FarmSection</div>
  )
}

function App():JSX.Element {
  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <TitleSection title={'Dashboard | Properly'} />
          <LayoutSection>        
            <Switch>
              <SectionRoute exact path="/"
                            component={CollateralSection} />
              <SectionRoute exact path="/farm"
                            component={FarmSection} />
              <Route component={NotFound} />        
            </Switch>
          </LayoutSection>
        </ThemeProvider>
      </BrowserRouter>
    </ReduxProvider>
)};

render(<App />, document.querySelector("#content"));
