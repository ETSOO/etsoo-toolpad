import * as React from "react";
import { useRouter } from "next/router";
import type { AppProviderProps, Navigate, Router } from "../AppProvider";
import { asArray } from "../utils/collections";
import { AppProvider } from "../AppProvider/AppProviderComponent";

/**
 * @ignore - internal component.
 */
export function AppProviderNextPages(props: AppProviderProps) {
  const { push, replace, asPath, query } = useRouter();

  const search = React.useMemo(() => {
    const params = new URLSearchParams();
    Object.entries(query ?? {}).forEach(([key, value]) => {
      asArray(value ?? []).forEach((v) => {
        params.append(key, v.toString());
      });
    });
    return params.toString();
  }, [query]);

  // Stable search params object
  const searchParams = React.useMemo(
    () => new URLSearchParams(search),
    [search]
  );

  const navigate = React.useCallback<Navigate>(
    (url, { history = "auto" } = {}) => {
      if (history === "auto" || history === "push") {
        return push(String(url));
      }
      if (history === "replace") {
        return replace(String(url));
      }
      throw new Error(`Invalid history option: ${history}`);
    },
    [push, replace]
  );

  const routerImpl = React.useMemo<Router>(
    () => ({
      pathname: asPath,
      searchParams,
      navigate
    }),
    [asPath, navigate, searchParams]
  );

  return <AppProvider router={routerImpl} {...props} />;
}
