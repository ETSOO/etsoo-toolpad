import * as React from "react";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";
import { AccountPreview, AccountPreviewProps } from "./AccountPreview";
import { AccountPopoverHeader } from "./AccountPopoverHeader";
import { AccountPopoverFooter } from "./AccountPopoverFooter";
import {
  SessionContext,
  AuthenticationContext
} from "../AppProvider/AppProvider";

export interface AccountSlots {
  /**
   * The component used for the account preview
   * @default AccountPreview
   */
  preview?: React.ElementType;
  /**
   * The component used for the account popover menu
   * @default Popover
   */
  popover?: React.ElementType;
  /**
   * The component used for the content of account popover
   * @default Stack
   */
  popoverContent?: React.ElementType;
  /**
   * The component used for the sign in button.
   * @default Button
   */
  signInButton?: React.ElementType;
  /**
   * The component used for the sign out button.
   * @default Button
   */
  signOutButton?: React.ElementType;
}

export interface AccountProps {
  /**
   * The components used for each slot inside.
   */
  slots?: AccountSlots;
  /**
   * The props used for each slot inside.
   */
  slotProps?: {
    preview?: AccountPreviewProps;
    popover?: React.ComponentProps<typeof Popover>;
    popoverContent?: React.ComponentProps<typeof Stack>;
    signInButton?: React.ComponentProps<typeof SignInButton>;
    signOutButton?: React.ComponentProps<typeof Button>;
  };
}
/**
 *
 * Demos:
 *
 * - [Account](https://mui.com/toolpad/core/react-account/)
 * - [Dashboard Layout](https://mui.com/toolpad/core/react-dashboard-layout/)
 * - [Sign-in Page](https://mui.com/toolpad/core/react-sign-in-page/)
 *
 * API:
 *
 * - [Account API](https://mui.com/toolpad/core/api/account)
 */
function Account(props: AccountProps) {
  const { slots, slotProps } = props;
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const session = React.useContext(SessionContext);
  const authentication = React.useContext(AuthenticationContext);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!authentication) {
    return null;
  }

  if (!session?.user) {
    return slots?.signInButton ? (
      <slots.signInButton onClick={authentication.signIn} />
    ) : (
      <SignInButton {...slotProps?.signInButton} />
    );
  }

  return (
    <React.Fragment>
      {slots?.preview ? (
        <slots.preview handleClick={handleClick} open={open} />
      ) : (
        <AccountPreview
          variant="condensed"
          handleClick={handleClick}
          open={open}
          {...slotProps?.preview}
        />
      )}
      {slots?.popover ? (
        <slots.popover {...slotProps?.popover} />
      ) : (
        <Popover
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          {...slotProps?.popover}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1,
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0
                }
              }
            },
            ...slotProps?.popover?.slotProps
          }}
        >
          {slots?.popoverContent ? (
            <slots.popoverContent {...slotProps?.popoverContent} />
          ) : (
            <Stack direction="column" {...slotProps?.popoverContent}>
              <AccountPopoverHeader>
                <AccountPreview variant="expanded" />
              </AccountPopoverHeader>
              <Divider />
              <AccountPopoverFooter>
                <SignOutButton {...slotProps?.signOutButton} />
              </AccountPopoverFooter>
            </Stack>
          )}
        </Popover>
      )}
    </React.Fragment>
  );
}

export { Account };
