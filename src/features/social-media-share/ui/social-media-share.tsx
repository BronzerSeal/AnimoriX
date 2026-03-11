"use client";

import { SITE_URL } from "@/shared/config/site";
import { shares } from "../consts/shares";

const SocialMediaShare = ({
  variant = "text",
}: {
  variant?: "text" | "clear";
}) => {
  return (
    <div className="flex gap-3">
      {shares.map(({ Button, icon: Icon, color, count }, i) => (
        <Button key={i} url={SITE_URL}>
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-white transition ${color}`}
          >
            <Icon size={18} />
            {variant === "text" && <span>{count}</span>}
          </div>
        </Button>
      ))}
    </div>
  );
};

export default SocialMediaShare;
