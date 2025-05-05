"use client";
import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Stack, { StackProps } from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useSlotProps from "@mui/utils/useSlotProps";
import { Link as ToolpadLink } from "../shared/Link";
import {
  PageContainerToolbar,
  PageContainerToolbarProps
} from "./PageContainerToolbar";
import { getItemTitle } from "../shared/navigation";
import { useActivePage } from "../useActivePage";
import { styled } from "@mui/material/styles";

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

export type PageData = {
  title?: string;
  page?: string;
  breadcrumbs?: Breadcrumb[];
  pageHeader?: React.ReactNode;
};

type PageDataAction = PageData;

function jsonSerialize(obj: unknown) {
  return JSON.stringify(obj, (_key, value) =>
    value == null ? undefined : value
  );
}

export const PageDataContext = React.createContext<{
  state: PageData;
  dispatch: React.Dispatch<PageDataAction>;
}>({ state: {}, dispatch: (value) => value });

function reducer(state: PageData, action: PageDataAction) {
  // Check if the action is the same as the current state
  if (jsonSerialize(state) === jsonSerialize(action)) {
    return state;
  }

  return { ...state, ...action };
}

export function PageDataContextProvider(
  props: React.PropsWithChildren<PageData>
) {
  // Destruct
  const { title, page, breadcrumbs, pageHeader, ...rest } = props;

  // useReducer hook to manage state with our reducer function and initial state
  const [state, dispatch] = React.useReducer(reducer, {
    title,
    page,
    breadcrumbs,
    pageHeader
  });

  // Provide the state and dispatch function to the context value
  return <PageDataContext.Provider value={{ state, dispatch }} {...rest} />;
}

type PageContainerBarProps = {
  /**
   * The components used for each slot inside.
   */
  slots?: PageContainerSlots;

  /**
   * The props used for each slot inside.
   */
  slotProps?: PageContainerSlotProps;

  /**
   * The component that renders the actions toolbar.
   */
  titleBar?: false | ((title: string) => React.ReactNode);
};

function PageContainerBar(props: PageContainerBarProps) {
  const { slots, slotProps, titleBar } = props;

  const { state } = React.useContext(PageDataContext);

  const activePage = useActivePage();

  const ToolbarComponent = slots?.toolbar ?? PageContainerToolbar;
  const toolbarSlotProps = useSlotProps({
    elementType: ToolbarComponent,
    ownerState: props,
    externalSlotProps: slotProps?.toolbar,
    additionalProps: {}
  });

  const breadcrumbs = [...(state.breadcrumbs ?? activePage?.breadcrumbs ?? [])];
  const title = state.title ?? activePage?.title ?? "";
  const pageHeader = state.pageHeader ?? activePage?.pageHeader ?? null;

  // No page header
  if (pageHeader === false) return undefined;

  // Custom page header
  if (pageHeader != null) return pageHeader;

  if (state.page) {
    breadcrumbs.push({ title: state.page, path: "#" });
  }

  return (
    <Stack>
      {breadcrumbs && (
        <Breadcrumbs aria-label="breadcrumb">
          {breadcrumbs.map((item, index) => {
            return index < breadcrumbs.length - 1 ? (
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
          })}
        </Breadcrumbs>
      )}
      <PageContentHeader>
        {typeof titleBar === "function" ? (
          titleBar(title)
        ) : titleBar === false ? undefined : (
          <Typography variant="h4">{title}</Typography>
        )}
        <ToolbarComponent {...toolbarSlotProps} />
      </PageContentHeader>
    </Stack>
  );
}

export type PageContainerProps = React.PropsWithChildren<
  StackProps & PageContainerBarProps
>;

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
  const { children, slots, slotProps, titleBar, ...rest } = props;

  return (
    <Stack sx={{ mx: 3, my: 2 }} spacing={2} {...rest}>
      <PageContainerBar
        slots={slots}
        slotProps={slotProps}
        titleBar={titleBar}
      />
      {children}
    </Stack>
  );
}

export { PageContainer };
