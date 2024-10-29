"use client";

import * as React from "react";

const DEFAULT_LOCALE_TEXT = {
  // Account
  signInLabel: "Sign In",
  signOutLabel: "Sign Out",
  // Account Preview
  accountIconButtonAriaLabel: "Current User",
  // Menu
  expandMenuTitle: "Expand menu",
  expandNavMenuAriaLabel: "Expand navigation menu",
  collapseMenuTitle: "Collapse menu",
  collapseNavMenuAriaLabel: "Collapse navigation menu",
  // Theme
  switchModeTitle: "Switch mode",
  darkModeTitle: "Dark mode",
  lightModeTitle: "Light mode",
  switchThemeModeAriaLabel: "Switch theme mode",
  switchToDarkModeAriaLabel: "Switch to dark mode",
  switchToLightModeAriaLabel: "Switch to light mode"
};

export type LocaleContextType = typeof DEFAULT_LOCALE_TEXT;

export const LocaleContext =
  React.createContext<LocaleContextType>(DEFAULT_LOCALE_TEXT);

export interface LocaleProviderProps {
  localeText?: Partial<LocaleContextType>;
  children: React.ReactNode;
}

/**
 * @ignore - internal component.
 */
export function LocaleProvider({ localeText, children }: LocaleProviderProps) {
  const mergedLocaleText = React.useMemo(
    () => ({ ...DEFAULT_LOCALE_TEXT, ...localeText }),
    [localeText]
  );

  return (
    <LocaleContext.Provider value={mergedLocaleText}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocaleText() {
  return React.useContext(LocaleContext);
}
