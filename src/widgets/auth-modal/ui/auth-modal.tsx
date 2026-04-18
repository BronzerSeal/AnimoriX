"use client";
import { LoginForm, RegisterForm } from "@/features/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/shared/ui/dialog";
import { User } from "lucide-react";
import { useState } from "react";

type AuthView = "login" | "register";

const AuthModal = () => {
  const [view, setView] = useState<AuthView>("login");
  return (
    <Dialog modal="trap-focus">
      <DialogTrigger>
        <div className="sm:hidden">
          <Avatar size="sm">
            <AvatarImage src="#" />
            <AvatarFallback>
              <User className="text-foreground size-3.5" strokeWidth={1.6} />
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="hidden sm:flex">
          <Avatar size="sm" className="ml-2">
            <AvatarImage src="#" />
            <AvatarFallback>
              <User className="text-foreground" strokeWidth={1.5} />
            </AvatarFallback>
          </Avatar>
        </div>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="max-w-[22rem] gap-0 overflow-visible border-0 bg-transparent p-0 text-white ring-0 shadow-none sm:max-w-[22rem]"
      >
        {view === "login" && <LoginForm onSwitch={() => setView("register")} />}

        {view === "register" && <RegisterForm setView={setView} />}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
