"use client";
import { Input } from "@/shared/ui/input";
import { AuthFormShell } from "./auth-form-shell";
import { Dispatch, SetStateAction, useState } from "react";
import { registerUser } from "../model/actions/register";
import { toast } from "sonner";

type Props = {
  setView: Dispatch<SetStateAction<"login" | "register">>;
};

export const RegisterForm = ({ setView }: Props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const [error, setError] = useState("");

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
      setError(result.error);
    } else {
      toast.success("User is registered successfully!");
      setView("login");
    }
  };
  return (
    <AuthFormShell
      title="Create your account"
      statusTitle="Almost there"
      statusDescription="Pick your username, email, and a strong password."
      submitLabel="Sign Up"
      onSubmit={handleSubmit}
      footer={
        <p className="text-black dark:text-white">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => setView("login")}
            className="font-semibold text-[#39cc66] transition hover:text-[#5ce286]"
          >
            Sign in
          </button>
        </p>
      }
    >
      <Input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        autoComplete="Name"
        className="h-12 rounded-2xl border-slate-200 dark:border-slate-400 bg-white px-4 text-[15px] text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:border-[#39cc66]/70 focus-visible:ring-[#39cc66]/15"
      />
      <Input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        autoComplete="email"
        className="h-12 rounded-2xl border-slate-200 dark:border-slate-400 bg-white px-4 text-[15px] text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:border-[#39cc66]/70 focus-visible:ring-[#39cc66]/15"
      />
      <Input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        autoComplete="new-password"
        className="h-12 rounded-2xl border-slate-200 dark:border-slate-400 bg-white px-4 text-[15px] text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:border-[#39cc66]/70 focus-visible:ring-[#39cc66]/15"
      />
      <Input
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm password"
        autoComplete="new-password"
        className="h-12 rounded-2xl border-slate-200 dark:border-slate-400 bg-white px-4 text-[15px] text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:border-[#39cc66]/70 focus-visible:ring-[#39cc66]/15"
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </AuthFormShell>
  );
};
