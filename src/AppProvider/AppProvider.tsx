"use client";
import * as React from "react";
import { Theme } from "@mui/material/styles";
import { LocaleContextType } from "../shared/locales/LocaleContext";

export interface NavigateOptions {
  history?: "auto" | "push" | "replace";
}

export interface Navigate {
  (url: string | URL, options?: NavigateOptions): void;
}

/**
 * Abstract router used by Toolpad components.
 */
export interface Router {
  pathname: string;
  searchParams: URLSearchParams;
  navigate: Navigate;
}

export interface Branding {
  title?:
    | React.ReactNode
    | [string, (handler: React.MouseEvent<HTMLSpanElement>) => void];
  logo?: React.ReactNode;
}

export interface NavigationPageItem {
  kind?: "page";
  segment?: string;
  title?: string;
  icon?: React.ReactNode;
  pattern?: string;
  action?: React.ReactNode;
  children?: Navigation;
  hidden?: boolean;
}

export interface NavigationSubheaderItem {
  kind: "header";
  title: string;
}

export interface NavigationDividerItem {
  kind: "divider";
}

export type NavigationItem =
  | NavigationPageItem
  | NavigationSubheaderItem
  | NavigationDividerItem;

export type Navigation = NavigationItem[];

export interface Session {
  user?: {
    id?: string | null;
    name?: string | null;
    latinName?: string | null;
    image?: string | null;
    email?: string | null;
  };
}

export interface Authentication {
  signIn: () => void;
  signOut: () => void;
}

export const AuthenticationContext = React.createContext<Authentication | null>(
  null
);

export const SessionContext = React.createContext<Session | null>(null);

export type AppTheme = Theme | { light: Theme; dark: Theme };

export interface AppProviderProps {
  /**
   * The content of the app provider.
   */
  children: React.ReactNode;
  /**
   * [Theme or themes](https://mui.com/toolpad/core/react-app-provider/#theming) to be used by the app in light/dark mode. A [CSS variables theme](https://mui.com/material-ui/customization/css-theme-variables/overview/) is recommended.
   * @default createTheme()
   */
  theme?: AppTheme;
  /**
   * Branding options for the app.
   * @default null
   */
  branding?: Branding | null;
  /**
   * The labels for the component.
   */
  localeText?: Partial<LocaleContextType>;
  /**
   * Navigation definition for the app.
   * @default []
   */
  navigation?: Navigation;
  /**
   * Router implementation used inside Toolpad components.
   * @default null
   */
  router?: Router;
  /**
   * Session info about the current user.
   * @default null
   */
  session?: Session | null;
  /**
   * Authentication methods.
   * @default null
   */
  authentication?: Authentication | null;
  /**
   * The window where the application is rendered.
   * This is needed when rendering the app inside an iframe, for example.
   * @default window
   */
  window?: Window;
}
