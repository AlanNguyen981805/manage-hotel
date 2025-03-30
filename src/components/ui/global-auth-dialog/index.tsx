"use client";

import { AuthDialog } from "../auth-dialog";
import { useAuthDialog } from "@/hooks/useAuthDialog";

export function GlobalAuthDialog() {
  const { isOpen, closeAuthDialog } = useAuthDialog();

  return <AuthDialog isOpen={isOpen} onClose={closeAuthDialog} />;
}
