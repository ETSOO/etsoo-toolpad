import { Stack, styled, Typography, useTheme } from "@mui/material";
import { Link } from "../shared/Link";
import React from "react";
import { BrandingContext } from "../shared/context";

const LogoContainer = styled("div")({
  position: "relative",
  height: 40,
  "& img": {
    maxHeight: 40
  }
});

export function TitleBar() {
  // Theme
  const theme = useTheme();

  // Branding
  const branding = React.useContext(BrandingContext);

  // Application title
  const title = branding?.title;
  const titleUI = React.useMemo(() => {
    if (title == null) return;

    if (typeof title === "string" || Array.isArray(title)) {
      let titleString: string;
      let clickHandler:
        | ((handler: React.MouseEvent<HTMLSpanElement>) => void)
        | undefined;
      if (Array.isArray(title)) {
        titleString = title[0];
        clickHandler = title[1];
      } else {
        titleString = title;
      }
      return (
        <Typography
          variant="h6"
          sx={{
            color: (theme.vars ?? theme).palette.primary.main,
            fontWeight: "700",
            ml: 0.5,
            whiteSpace: "nowrap"
          }}
          onClick={clickHandler == null ? undefined : (e) => clickHandler(e)}
        >
          {titleString}
        </Typography>
      );
    }

    return title;
  }, [title]);

  return (
    <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
      <Stack direction="row" alignItems="center">
        {branding?.logo && <LogoContainer>{branding.logo}</LogoContainer>}
        {titleUI}
      </Stack>
    </Link>
  );
}
