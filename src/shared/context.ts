import * as React from "react";
import type { Branding, Navigation, Router } from "../AppProvider";
import { PaletteMode } from "@mui/material/styles";

export const BrandingContext = React.createContext<Branding | null>(null);

export const NavigationContext = React.createContext<Navigation>([]);

export const PaletteModeContext = React.createContext<{
  paletteMode: PaletteMode;
  setPaletteMode: (mode: PaletteMode) => void;
  isDualTheme: boolean;
}>({
  paletteMode: "light",
  setPaletteMode: () => {},
  isDualTheme: false
});

export const RouterContext = React.createContext<Router | null>(null);

export const WindowContext = React.createContext<Window | undefined>(undefined);
