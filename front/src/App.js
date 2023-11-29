import { Outlet } from "react-router-dom";
import { theme } from "./styles/theme";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/global-style";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div>
        <Outlet />
      </div>
    </ThemeProvider>
  );
}

export default App;
