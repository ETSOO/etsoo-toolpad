"use client";
import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Stack, { StackProps } from "@mui/material/Stack";
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

export type PageData = {
  title?: string;
  page?: string;
  breadcrumbs?: Breadcrumb[];
  noBreadcrumbs?: boolean;
  noPageHeader?: boolean;
};

type PageDataAction = PageData | true;

export const PageDataContext = React.createContext<{
  state: PageData;
  dispatch: React.Dispatch<PageDataAction>;
}>({ state: {}, dispatch: (value) => value });

function reducer(state: PageData, action: PageDataAction) {
  if (action === true) {
    // Reset the state
    if (
      state.breadcrumbs == null &&
      state.title == null &&
      state.page == null
    ) {
      return state;
    } else {
      return {};
    }
  }

  return { ...state, ...action };
}

export function PageDataContextProvider(
  props: React.PropsWithChildren<PageData>
) {
  // Destruct
  const { title, page, breadcrumbs, ...rest } = props;

  // useReducer hook to manage state with our reducer function and initial state
  const [state, dispatch] = React.useReducer(reducer, {
    title,
    page,
    breadcrumbs
  });

  // Provide the state and dispatch function to the context value
  return <PageDataContext.Provider value={{ state, dispatch }} {...rest} />;
}

export type PageContainerProps = React.PropsWithChildren<
  StackProps & {
    /**
     * The default title of the page.
     */
    defaultTitle?: string;
    /**
     * The components used for each slot inside.
     */
    slots?: PageContainerSlots;
    /**
     * The props used for each slot inside.
     */
    slotProps?: PageContainerSlotProps;
  }
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
  const { children, defaultTitle, slots, slotProps, ...rest } = props;

  const loaded = React.useRef(false);
  const { state, dispatch } = React.useContext(PageDataContext);

  const activePage = useActivePage();

  React.useLayoutEffect(() => {
    if (loaded.current) {
      // Reset the page data state
      dispatch(true);
    } else {
      loaded.current = true;
    }
  }, [activePage?.sourcePath]);

  let resolvedBreadcrumbs = state.breadcrumbs ?? activePage?.breadcrumbs ?? [];
  const title = state.title ?? defaultTitle ?? activePage?.title ?? "";

  if (state.page) {
    resolvedBreadcrumbs = [
      ...resolvedBreadcrumbs,
      { title: state.page, path: "#" }
    ];
  }

  const ToolbarComponent = props?.slots?.toolbar ?? PageContainerToolbar;
  const toolbarSlotProps = useSlotProps({
    elementType: ToolbarComponent,
    ownerState: props,
    externalSlotProps: props?.slotProps?.toolbar,
    additionalProps: {}
  });

  return (
    <Stack sx={{ mx: 3, my: 2 }} spacing={2} {...rest}>
      {state.noPageHeader !== true && (
        <Stack>
          {state.noBreadcrumbs !== true && (
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
          )}
          <PageContentHeader>
            {title ? <Typography variant="h4">{title}</Typography> : null}
            <ToolbarComponent {...toolbarSlotProps} />
          </PageContentHeader>
        </Stack>
      )}
      {children}
    </Stack>
  );
}

export { PageContainer };
