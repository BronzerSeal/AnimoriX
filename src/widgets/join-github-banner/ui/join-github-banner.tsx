import { Info } from "lucide-react";
import Link from "next/link";

const JoinGithubBunner = () => {
  return (
    <div className="w-full bg-[#c8c8f8] dark:bg-[#d8f5e1] flex gap-2 p-3 rounded-md items-center">
      <Info size={18} className="text-blue-500 dark:text-green-500" />
      <span className="text-blue-500 dark:text-green-700">
        Please give the site a star on{" "}
        <Link
          className="text-orange-500"
          href={"https://github.com/BronzerSeal/AnimoriX"}
        >
          GitHub
        </Link>{" "}
        if you like it.
      </span>
    </div>
  );
};

export default JoinGithubBunner;
