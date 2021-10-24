import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

//local component
import Navigation from "./component/Navigation";

const darkTheme = {
  primary: "hsl(200, 10%, 85%)",
  secondary: "hsl(200, 95%, 15%)",
  hover: "hsl(200, 40%, 35%)",
};

const lightTheme = {
  primary: "hsl(200, 95%, 15%)",
  secondary: "hsl(200, 10%, 85%)",
  hover: "hsl(0, 0%, 100%)",
};

const App = () => {
  const [darkState, setDarkState] = useState(false);
  const [theme, setTheme] = useState({});

  useEffect(() => {
    darkState ? setTheme({ ...darkTheme }) : setTheme({ ...lightTheme });
  }, [darkState]);

  const handleThemeChange = () => {
    setDarkState(!darkState);
  };

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Container>
          <Navigation isDark={darkState} handleSwitch={handleThemeChange} />
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;

const Container = styled.div`
  background-color: ${({ theme }) => theme.secondary};
  min-height: 100vh;
  transition: background 0.5s;
`;
