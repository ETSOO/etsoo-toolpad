import * as React from "react";
import Avatar, { AvatarProps } from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Session, SessionContext } from "../AppProvider";
import { useLocaleText } from "../shared/locales/LocaleContext";

export type AccountPreviewVariant = "condensed" | "expanded";

export interface AccountPreviewSlots {
  /**
   * The component used for the Avatar
   * @default Avatar
   */
  avatar?: React.ElementType;
  /**
   * The component used for the overflow icon button in the expanded variant
   * @default IconButton
   */
  moreIconButton?: React.ElementType;
  /**
   * The component used for the avatar icon button in the condensed variant
   * @default IconButton
   */
  avatarIconButton?: React.ElementType;
}

export interface AccountPreviewProps {
  /**
   * The components used for each slot inside.
   */
  slots?: AccountPreviewSlots;
  /**
   * The props used for each slot inside.
   */
  slotProps?: {
    avatar?: AvatarProps;
    moreIconButton?: IconButtonProps;
    avatarIconButton?: IconButtonProps;
  };
  /**
   * The type of account details to display.
   * @property {'condensed'} condensed - Shows only the user's avatar.
   * @property {'expanded'} expanded - Displays the user's avatar, name, and email if available.
   * @default 'condensed'
   */
  variant?: AccountPreviewVariant;
  /**
   * The handler used when the preview is expanded
   */
  handleClick?: React.MouseEventHandler<HTMLElement>;
  /**
   * The state of the Account popover
   * @default false
   */
  open?: boolean;
}

function formatNameInitials(user?: Session["user"]) {
  if (user == null) return null;

  const name = user.latinName || user.name;
  if (name == null) return null;

  const chars = name
    .trim()
    .split(/\s+/g)
    .map((part) => {
      const firstChar = part.charAt(0).toUpperCase();
      return firstChar >= "A" && firstChar <= "Z" ? firstChar : "";
    })
    .filter((c) => c)
    .slice(-2);

  if (chars.length === 0) return null;

  return chars.join("");
}

/**
 * The AccountPreview component displays user account information.
 *
 * Demos:
 *
 * - [Account](https://mui.com/toolpad/core/react-account/)
 *
 * API:
 *
 * - [AccountPreview API](https://mui.com/toolpad/core/api/account-preview)
 */
function AccountPreview(props: AccountPreviewProps) {
  const { slots, variant = "condensed", slotProps, open, handleClick } = props;
  const session = React.useContext(SessionContext);
  const localeText = useLocaleText();

  if (!session || !session.user) {
    return null;
  }

  const avatarContent = slots?.avatar ? (
    <slots.avatar />
  ) : (
    <Avatar
      src={session.user?.image || ""}
      alt={session.user?.name || session.user?.email || ""}
      sx={{
        height: variant === "expanded" ? 48 : 32,
        width: variant === "expanded" ? 48 : 32
      }}
      {...slotProps?.avatar}
    >
      {session.user?.image ? null : formatNameInitials(session.user)}
    </Avatar>
  );

  if (variant === "expanded") {
    return (
      <Stack
        direction="row"
        justifyContent="flex-start"
        spacing={2}
        padding={2}
      >
        {avatarContent}
        <Stack direction="column" justifyContent="space-evenly">
          <Typography variant="body2" fontWeight="bolder" noWrap>
            {session.user?.name}
          </Typography>
          <Typography variant="caption" noWrap>
            {session.user?.email}
          </Typography>
        </Stack>
        {handleClick &&
          (slots?.moreIconButton ? (
            <slots.moreIconButton />
          ) : (
            <IconButton
              size="small"
              onClick={handleClick}
              {...slotProps?.moreIconButton}
              sx={{ alignSelf: "flex-start", ...slotProps?.moreIconButton?.sx }}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
          ))}
      </Stack>
    );
  }

  return (
    <Tooltip title={session.user.name ?? "Account"}>
      {slots?.avatarIconButton ? (
        <slots.avatarIconButton />
      ) : (
        <IconButton
          onClick={handleClick}
          aria-label={localeText.accountIconButtonAriaLabel}
          size="small"
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          {...slotProps?.avatarIconButton}
        >
          {avatarContent}
        </IconButton>
      )}
    </Tooltip>
  );
}

export { AccountPreview };
