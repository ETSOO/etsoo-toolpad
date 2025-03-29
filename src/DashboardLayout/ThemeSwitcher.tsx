"use client";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { PaletteModeContext } from "../shared/context";
import useSsr from "../utils/hooks/useSsr";
import { useLocaleText } from "../shared/locales/LocaleContext";
import { useTheme } from "@mui/material/styles";

// TODO: When we use this component as the default for a slot, make it non-internal
/**
 * @ignore - internal component.
 */
function ThemeSwitcher() {
  const isSsr = useSsr();
  const theme = useTheme();
  const localeText = useLocaleText();

  const { paletteMode, setPaletteMode, isDualTheme } =
    React.useContext(PaletteModeContext);

  const toggleMode = React.useCallback(() => {
    setPaletteMode(paletteMode === "dark" ? "light" : "dark");
  }, [paletteMode, setPaletteMode]);

  return isDualTheme ? (
    <Tooltip
      title={
        isSsr
          ? localeText.switchModeTitle
          : paletteMode === "dark"
          ? localeText.lightModeTitle
          : localeText.darkModeTitle
      }
      enterDelay={1000}
    >
      <div>
        <IconButton
          aria-label={
            isSsr
              ? localeText.switchThemeModeAriaLabel
              : paletteMode === "dark"
              ? localeText.switchToLightModeAriaLabel
              : localeText.switchToDarkModeAriaLabel
          }
          onClick={toggleMode}
          sx={{
            color: (theme.vars ?? theme).palette.primary.dark
          }}
        >
          {theme.getColorSchemeSelector ? (
            <React.Fragment>
              <DarkModeIcon
                sx={{
                  display: "inline",
                  [theme.getColorSchemeSelector("dark")]: {
                    display: "none"
                  }
                }}
              />
              <LightModeIcon
                sx={{
                  display: "none",
                  [theme.getColorSchemeSelector("dark")]: {
                    display: "inline"
                  }
                }}
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              {isSsr || paletteMode !== "dark" ? (
                <DarkModeIcon />
              ) : (
                <LightModeIcon />
              )}
            </React.Fragment>
          )}
        </IconButton>
      </div>
    </Tooltip>
  ) : null;
}

export { ThemeSwitcher };
