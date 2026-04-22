"use client";
import { LoginForm, RegisterForm } from "@/features/auth";
import { Dialog, DialogContent, DialogTrigger } from "@/shared/ui/dialog";
import UserAvatar from "@/shared/ui/user-avatar";

import { useState } from "react";

type AuthView = "login" | "register";

const AuthModal = () => {
  const [view, setView] = useState<AuthView>("login");
  const [open, setOpen] = useState(false);

  return (
    <Dialog modal="trap-focus" open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <UserAvatar />
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="max-w-[22rem] gap-0 overflow-visible border-0 bg-transparent p-0 text-white ring-0 shadow-none sm:max-w-[22rem]"
      >
        {view === "login" && (
          <LoginForm
            closeModal={() => setOpen(false)}
            onSwitch={() => setView("register")}
          />
        )}

        {view === "register" && <RegisterForm setView={setView} />}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
