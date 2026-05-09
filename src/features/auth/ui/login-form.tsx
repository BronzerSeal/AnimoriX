"use client";
import { Input } from "@/shared/ui/input";
import { AuthFormShell } from "./auth-form-shell";
import { useState } from "react";
import { signInWithCredentials } from "../model/actions/sign-in-with-credentials";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

type Props = {
  onSwitch: () => void;
  closeModal: () => void;
};

export const LoginForm = ({ onSwitch, closeModal }: Props) => {
  const t = useTranslations("sign-in");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await signInWithCredentials(
      formData.email,
      formData.password,
    );

    if (result && result.error) {
      if (result.error === "CredentialsSignin") {
        toast.error(t("login.toast.invalid-credentials"));
      } else if (result.error === "GOOGLE_ACCOUNT") {
        toast.error(t("login.toast.google-account"));
      } else {
        toast.error(
          t("login.toast.authorization-error", {
            error: String(result.error),
          }),
        );
      }
    } else {
      toast.success(t("login.toast.success"));
      closeModal();
    }
  };

  return (
    <AuthFormShell
      onSubmit={handleSubmit}
      title={t("login.title")}
      statusTitle={t("login.status-title")}
      statusDescription={t("login.status-description")}
      submitLabel={t("login.submit")}
      footer={
        <>
          <p className="text-black dark:text-white">
            {t("login.footer.no-account")}{" "}
            <button
              type="button"
              onClick={onSwitch}
              className="font-semibold text-[#39cc66] transition hover:text-[#5ce286]"
            >
              {t("login.footer.sign-up")}
            </button>
          </p>
          <p className="text-[#39cc66]">{t("login.footer.forgot-password")}</p>
        </>
      }
    >
      <Input
        type="text"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder={t("login.fields.email-or-username")}
        autoComplete="username"
        className="h-12 rounded-2xl border-slate-200 dark:border-slate-400 bg-white px-4 text-[15px] text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:border-[#39cc66]/70 focus-visible:ring-[#39cc66]/15"
      />
      <Input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder={t("login.fields.password")}
        autoComplete="current-password"
        className="h-12 rounded-2xl border-slate-200 dark:border-slate-400 bg-white px-4 text-[15px] text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:border-[#39cc66]/70 focus-visible:ring-[#39cc66]/15"
      />
    </AuthFormShell>
  );
};
