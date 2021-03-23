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
// import HomePage from "./pages/HomePage"


// const App: React.FC = () => {
//   return (
//   <ReduxProvider store={store}>
//     <BrowserRouter basename={APP_MOUNT_URI}>
//       <AppTitle title={'Dashboard | Properly'} />
//       <Switch>
//         <SectionRoute exact path="/" component={HomePage} />
//         <Route component={NotFound} />
//       </Switch>
//     </BrowserRouter>
//   </ReduxProvider>
//   );
// };
const HomePage: React.FC = () => {
  return (
    <div>HomePage</div>
  )
}

const App: React.FC = () => {
  return (
  <ReduxProvider store={store}>
    <BrowserRouter>
      <ThemeProvider>
        <AppTitle title={'Dashboard | Properly'} />
        <AppLayout>        
          <Switch>
            <SectionRoute exact path="/" component={HomePage} />
            <Route component={NotFound} />        
          </Switch>
        </AppLayout>
      </ThemeProvider>
    </BrowserRouter>
  </ReduxProvider>
  );
};

render(<App />, document.querySelector("#content"));
