import React from "react";
import "./index.css";
import { Box, Grommet } from "grommet";
import { BrowserRouter as Router } from "react-router-dom";

import { Routes } from "src/Routes";
import { AppHeader } from "src/components/appHeader";
import { AppFooter } from "src/components/appFooter";

import { SearchInput, BaseContainer } from "src/components/ui";
import { useThemeMode } from "src/hooks/themeSwitcherHook";
import { theme, darkTheme } from "./theme";

function App() {
  const themeMode = useThemeMode();

  return (
    <Router>
      <Grommet
        theme={themeMode === "light" ? theme : darkTheme}
        themeMode={themeMode}
        full
      >
        <Box background="backgroundBack" style={{ margin: "auto", minHeight: "100%" }}>
          <AppHeader style={{ flex: "0 0 auto" }} />
          <Box align="center" style={{ flex: "1 1 100%" }}>
            <BaseContainer>
              <SearchInput />
              <Routes />
            </BaseContainer>
          </Box>
          <AppFooter style={{ flex: "0 0 auto" }} />
        </Box>
      </Grommet>
    </Router>
  );
}

export default App;
