import { useContext } from "react";
import { ThemeContext } from "@emmpair/comps/ThemeProvider";

function useTheme() {
  return useContext(ThemeContext);
}

export default useTheme;
