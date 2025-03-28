"use client";
import { useRouter } from "next/compat/router";
import { AppProviderNextApp } from "./AppProviderNextApp";
import { AppProviderNextPages } from "./AppProviderNextPages";
import type { AppProviderProps } from "../AppProvider";

/**
 * @ignore - internal component.
 */
function AppProvider(props: AppProviderProps) {
  const router = useRouter();
  const AppProviderComponent = router
    ? AppProviderNextPages
    : AppProviderNextApp;
  return <AppProviderComponent {...props} />;
}

export { AppProvider };
