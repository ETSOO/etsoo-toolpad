import { Link } from "../shared/Link";
import React from "react";
import { BrandingContext } from "../shared/context";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

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
  const [titleUI, hasLink] = React.useMemo(() => {
    if (title == null) return [undefined, true];

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
      return [
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
        </Typography>,
        true
      ];
    }

    return [title, false];
  }, [title]);

  if (hasLink) {
    return (
      <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
        <Stack direction="row" alignItems="center">
          {branding?.logo && <LogoContainer>{branding.logo}</LogoContainer>}
          {titleUI}
        </Stack>
      </Link>
    );
  } else {
    return titleUI;
  }
}
