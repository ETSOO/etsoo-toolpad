import { Stack, styled, Typography, useTheme } from "@mui/material";
import { Link } from "../shared/Link";
import { useApplicationTitle } from "../shared/branding";
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

  // Application title
  const applicationTitle = useApplicationTitle();

  // Branding
  const branding = React.useContext(BrandingContext);

  return (
    <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
      <Stack direction="row" alignItems="center">
        {branding?.logo && <LogoContainer>{branding.logo}</LogoContainer>}
        <Typography
          variant="h6"
          sx={{
            color: (theme.vars ?? theme).palette.primary.main,
            fontWeight: "700",
            ml: 0.5,
            whiteSpace: "nowrap"
          }}
        >
          {applicationTitle}
        </Typography>
      </Stack>
    </Link>
  );
}
