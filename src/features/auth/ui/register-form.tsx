"use client";
import { Input } from "@/shared/ui/input";
import { AuthFormShell } from "./auth-form-shell";
import { Dispatch, SetStateAction, useState } from "react";
import { registerUser } from "../model/actions/register";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

type Props = {
  setView: Dispatch<SetStateAction<"login" | "register">>;
};

export const RegisterForm = ({ setView }: Props) => {
  const t = useTranslations("sign-in");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const [error, setError] = useState("");

  const getRegisterErrorMessage = (message: string) => {
    switch (message) {
      case "The passwords don't match":
        return t("register.errors.password-mismatch");
      case "The password must be at least 6 characters long.":
        return t("register.errors.password-too-short");
      case "A user with this email already exists.":
        return t("register.errors.email-exists");
      case "Registration error":
        return t("register.errors.generic");
      default:
        return message;
    }
  };

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await registerUser(formData);

    if ("error" in result) {
      setError(getRegisterErrorMessage(result.error));
    } else {
      setError("");
      toast.success(t("register.toast.success"));
      setView("login");
    }
  };
  return (
    <AuthFormShell
      title={t("register.title")}
      statusTitle={t("register.status-title")}
      statusDescription={t("register.status-description")}
      submitLabel={t("register.submit")}
      onSubmit={handleSubmit}
      footer={
        <p className="text-black dark:text-white">
          {t("register.footer.has-account")}{" "}
          <button
            type="button"
            onClick={() => setView("login")}
            className="font-semibold text-[#39cc66] transition hover:text-[#5ce286]"
          >
            {t("register.footer.sign-in")}
          </button>
        </p>
      }
    >
      <Input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder={t("register.fields.name")}
        autoComplete="Name"
        className="h-12 rounded-2xl border-slate-200 dark:border-slate-400 bg-white px-4 text-[15px] text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:border-[#39cc66]/70 focus-visible:ring-[#39cc66]/15"
      />
      <Input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder={t("register.fields.email")}
        autoComplete="email"
        className="h-12 rounded-2xl border-slate-200 dark:border-slate-400 bg-white px-4 text-[15px] text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:border-[#39cc66]/70 focus-visible:ring-[#39cc66]/15"
      />
      <Input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder={t("register.fields.password")}
        autoComplete="new-password"
        className="h-12 rounded-2xl border-slate-200 dark:border-slate-400 bg-white px-4 text-[15px] text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:border-[#39cc66]/70 focus-visible:ring-[#39cc66]/15"
      />
      <Input
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder={t("register.fields.confirm-password")}
        autoComplete="new-password"
        className="h-12 rounded-2xl border-slate-200 dark:border-slate-400 bg-white px-4 text-[15px] text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:border-[#39cc66]/70 focus-visible:ring-[#39cc66]/15"
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </AuthFormShell>
  );
};
