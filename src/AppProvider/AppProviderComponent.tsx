"use client";
import {
  BrandingContext,
  NavigationContext,
  RouterContext,
  WindowContext
} from "../shared/context";
import { AppThemeProvider } from "./AppThemeProvider";
import { createTheme as createMuiTheme, Theme } from "@mui/material/styles";
import {
  AppProviderProps,
  AuthenticationContext,
  SessionContext
} from "./AppProvider";
import { LocaleProvider } from "../shared/locales/LocaleContext";

function createTheme(): Theme {
  return createMuiTheme({
    cssVariables: {
      colorSchemeSelector: "data-toolpad-color-scheme"
    },
    colorSchemes: { dark: true }
  });
}

/**
 *
 * Demos:
 *
 * - [App Provider](https://mui.com/toolpad/core/react-app-provider/)
 * - [Dashboard Layout](https://mui.com/toolpad/core/react-dashboard-layout/)
 *
 * API:
 *
 * - [AppProvider API](https://mui.com/toolpad/core/api/app-provider)
 */
function AppProvider(props: AppProviderProps) {
  const {
    children,
    theme = createTheme(),
    branding = null,
    localeText,
    navigation = [],
    router = null,
    authentication = null,
    session = null,
    window: appWindow
  } = props;

  return (
    <WindowContext.Provider value={appWindow}>
      <AuthenticationContext.Provider value={authentication}>
        <SessionContext.Provider value={session}>
          <RouterContext.Provider value={router}>
            <AppThemeProvider theme={theme} window={appWindow}>
              <LocaleProvider localeText={localeText}>
                <BrandingContext.Provider value={branding}>
                  <NavigationContext.Provider value={navigation}>
                    {children}
                  </NavigationContext.Provider>
                </BrandingContext.Provider>
              </LocaleProvider>
            </AppThemeProvider>
          </RouterContext.Provider>
        </SessionContext.Provider>
      </AuthenticationContext.Provider>
    </WindowContext.Provider>
  );
}

export { AppProvider };
