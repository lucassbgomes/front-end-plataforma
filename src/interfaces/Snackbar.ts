import { SnackbarOrigin } from "@mui/material";
import { ReactNode } from "react";

export interface ISnackbar extends SnackbarOrigin {
  open: boolean;
  message: string;
  color: "error" | "success" | "info" | "warning" | undefined;
  icon: ReactNode;
}