"use client";
import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Container, { ContainerProps } from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useSlotProps from "@mui/utils/useSlotProps";
import { styled } from "@mui/material";
import { Link as ToolpadLink } from "../shared/Link";
import {
  PageContainerToolbar,
  PageContainerToolbarProps
} from "./PageContainerToolbar";
import { getItemTitle } from "../shared/navigation";
import { useActivePage } from "../useActivePage";

const PageContentHeader = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  gap: theme.spacing(2)
}));

export interface PageContainerSlotProps {
  toolbar: PageContainerToolbarProps;
}

export interface PageContainerSlots {
  /**
   * The component that renders the actions toolbar.
   * @default Snackbar
   */
  toolbar: React.ElementType;
}

export interface Breadcrumb {
  /**
   * The title of the breadcrumb segment.
   */
  title: string;
  /**
   * The path the breadcrumb links to.
   */
  path: string;
}

// TODO: Remove in the next major version
/**
 * @deprecated Use `Breadcrumb` instead.
 */
export type BreadCrumb = Breadcrumb;

export interface PageContainerProps extends ContainerProps {
  children?: React.ReactNode;
  /**
   * The title of the page. Leave blank to use the active page title.
   */
  title?: string;
  /**
   * The breadcrumbs of the page. Leave blank to use the active page breadcrumbs.
   */
  breadcrumbs?: Breadcrumb[];
  /**
   * The components used for each slot inside.
   */
  slots?: PageContainerSlots;
  /**
   * The props used for each slot inside.
   */
  slotProps?: PageContainerSlotProps;
}

/**
 * A container component to provide a title and breadcrumbs for your pages.
 *
 * Demos:
 *
 * - [Page Container](https://mui.com/toolpad/core/react-page-container/)
 *
 * API:
 *
 * - [PageContainer API](https://mui.com/toolpad/core/api/page-container)
 */
function PageContainer(props: PageContainerProps) {
  const { children, slots, slotProps, breadcrumbs, ...rest } = props;

  const activePage = useActivePage();

  // TODO: Remove `props.breadCrumbs` in the next major version
  const resolvedBreadcrumbs = breadcrumbs ?? activePage?.breadcrumbs ?? [];
  const title = props.title ?? activePage?.title ?? "";

  const ToolbarComponent = props?.slots?.toolbar ?? PageContainerToolbar;
  const toolbarSlotProps = useSlotProps({
    elementType: ToolbarComponent,
    ownerState: props,
    externalSlotProps: props?.slotProps?.toolbar,
    additionalProps: {}
  });

  return (
    <Container {...rest}>
      <Stack sx={{ my: 2 }} spacing={2}>
        <Stack>
          <Breadcrumbs aria-label="breadcrumb">
            {resolvedBreadcrumbs
              ? resolvedBreadcrumbs.map((item, index) => {
                  return index < resolvedBreadcrumbs.length - 1 ? (
                    <Link
                      key={item.path}
                      component={ToolpadLink}
                      underline="hover"
                      color="inherit"
                      href={item.path}
                    >
                      {getItemTitle(item)}
                    </Link>
                  ) : (
                    <Typography key={item.path} color="text.primary">
                      {getItemTitle(item)}
                    </Typography>
                  );
                })
              : null}
          </Breadcrumbs>

          <PageContentHeader>
            {title ? <Typography variant="h4">{title}</Typography> : null}
            <ToolbarComponent {...toolbarSlotProps} />
          </PageContentHeader>
        </Stack>
        <div>{children}</div>
      </Stack>
    </Container>
  );
}

export { PageContainer };
