import { Outlet } from "react-router-dom";
import { theme } from "./styles/theme";
import { ThemeProvider, styled } from "styled-components";
import { GlobalStyle } from "./styles/global-style";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Outlet />
      </Wrapper>
    </ThemeProvider>
  );
}

const Wrapper = styled.div`
  height: 100vh;
`;

export default App;
