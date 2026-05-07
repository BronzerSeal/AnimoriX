import { Info } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

const JoinGithubBunner = () => {
  const t = useTranslations("components");

  return (
    <div className="w-full bg-[#e0e0fa] dark:bg-[#d8f5e1] flex gap-2 p-3 rounded-md items-center">
      <Info size={18} className="text-blue-500 dark:text-green-500" />

      <span className="text-blue-500 dark:text-green-700">
        {t.rich("github-share", {
          GitHub: (chunks) => (
            <Link
              href="https://github.com/BronzerSeal/AnimoriX"
              className="text-orange-500"
            >
              {chunks}
            </Link>
          ),
        })}
      </span>
    </div>
  );
};

export default JoinGithubBunner;
