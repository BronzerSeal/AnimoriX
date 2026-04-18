"use client";
import { Input } from "@/shared/ui/input";
import { AuthFormShell } from "./auth-form-shell";
import { useState } from "react";
import { signInWithCredentials } from "../model/actions/sign-in-with-credentials";
import { toast } from "sonner";

type Props = {
  onSwitch: () => void;
};

export const LoginForm = ({ onSwitch }: Props) => {
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
        toast.error("Incorrect login or password");
      } else if (result.error === "GOOGLE_ACCOUNT") {
        toast.error(
          "This email is registered with Google. Please use Google Sign-In.",
        );
      } else {
        toast.error(`Authorization error: ${result.error}`);
      }
    } else {
      toast.success("Login successful!");
    }
  };

  return (
    <AuthFormShell
      onSubmit={handleSubmit}
      title="Sign into your account"
      statusTitle="Ready to sign in"
      statusDescription="Use your email or username and password to continue."
      submitLabel="Sign In"
      footer={
        <>
          <p className="text-black dark:text-white">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={onSwitch}
              className="font-semibold text-[#39cc66] transition hover:text-[#5ce286]"
            >
              Sign up
            </button>
          </p>
          <p className="text-[#39cc66]">Forgot Password?</p>
        </>
      }
    >
      <Input
        type="text"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email or username"
        autoComplete="username"
        className="h-12 rounded-2xl border-slate-200 dark:border-slate-400 bg-white px-4 text-[15px] text-slate-900 placeholder:text-slate-400 focus-visible:border-[#39cc66]/70 focus-visible:ring-[#39cc66]/15"
      />
      <Input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        autoComplete="current-password"
        className="h-12 rounded-2xl border-slate-200 dark:border-slate-400 bg-white px-4 text-[15px] text-slate-900 placeholder:text-slate-400 focus-visible:border-[#39cc66]/70 focus-visible:ring-[#39cc66]/15"
      />
    </AuthFormShell>
  );
};
