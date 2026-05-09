"use client";
import { UseUserInfoById } from "@/features/auth";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { UseUpdateUserInfo } from "../queries/queries";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

const EditProfilePage = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const t = useTranslations("user");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });
  const [handleError, setHandleError] = useState("");

  const { data: session } = useSession();
  const { mutate, error: updateError } = UseUpdateUserInfo(
    session?.user.id ?? "",
  );
  const { data: user, isLoading } = UseUserInfoById(
    session?.user.id!,
    !!session?.user.id,
  );

  useEffect(() => {
    if (user && !isInitialized) {
      setFormData({
        username: user.name ?? "",
        email: user.email ?? "",
      });
      setIsInitialized(true);
    }
  }, [user, isInitialized]);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.username.trim() === "") {
      setHandleError("Name can't be empty");
      return;
    }

    mutate({
      email: formData.email,
      name: formData.username,
    });

    if (!updateError) {
      toast.success(t("successUpdate"));
    }
  };

  const error = handleError || updateError?.message;
  return (
    <main className="w-full">
      <div className="absolute inset-0 dark:bg-[radial-gradient(circle_at_top_right,rgba(251,146,60,0.18),transparent_32%)] bg-[radial-gradient(circle_at_top_right,rgba(154,132,238,0.18),transparent_32%)] -z-50" />
      <div className="absolute -left-12 top-1/2 size-36 -translate-y-1/2 rounded-full bg-white/5 blur-3xl z-0" />

      <div className="mx-auto w-full max-w-[900px] max-w-425 mt-25 px-5 z-50">
        {isLoading ? (
          <p>Loading</p>
        ) : (
          <div>
            <h1 className="text-xl font-bold mb-2">{t("edit-profile")}</h1>

            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
              <div>
                <Input
                  type="text"
                  placeholder="User id"
                  disabled
                  value={session?.user.id}
                />
                <label className="text-gray-400 text-[13px]">user ID</label>
              </div>
              <div>
                <Input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
                />
                <label className="text-gray-400 text-[13px]">
                  {t("username")}
                </label>
              </div>
              <div>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  required
                />
                <label className="text-gray-400 text-[13px]">
                  {t("email")}
                </label>
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit">{t("save")}</Button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
};

export default EditProfilePage;
