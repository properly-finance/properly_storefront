import React, { useState, createContext } from "react";
import Helmet from "react-helmet";
import { MuiThemeProvider } from "@material-ui/core/styles";
import createTheme, { Baseline, dark, light } from "@emmpair/themes"


interface IThemeContext {
  isDark: boolean;
  toggleTheme: () => void;
}

interface IThemeProvider {
  children: React.ReactNode;
}

export const ThemeContext = createContext<IThemeContext>({
  isDark: false,
  toggleTheme: () => undefined,
});

const ThemeProvider: React.FC<IThemeProvider> = ({ children }) => {
  const isDefaultDark = localStorage.getItem("theme") === "true";  
  const [isDark, setDark] = useState(isDefaultDark);
  const theme = createTheme(isDark ? dark : light);

  // ..@method!
  const toggleTheme = () => {
    setDark(!isDark);
    localStorage.setItem("theme", (!isDark).toString());
  };  
  
  return (
    <ThemeContext.Provider  value={{ isDark, toggleTheme }} >
      <Helmet>
        <meta name="theme-color" content={theme.palette.background.default} />
      </Helmet>
      <MuiThemeProvider theme={theme}>
        <Baseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
