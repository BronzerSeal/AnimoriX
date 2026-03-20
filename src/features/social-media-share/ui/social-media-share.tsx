"use client";

import { SITE_URL } from "@/shared/config/site";
import { shares } from "../consts/shares";

const SocialMediaShare = ({
  variant = "text",
  fourBtns = false,
}: {
  variant?: "text" | "clear";
  fourBtns?: boolean;
}) => {
  const items = fourBtns ? shares.slice(0, 4) : shares;
  return (
    <div className="flex gap-3 flex-wrap">
      {items.map(({ Button, icon: Icon, color, count }, i) => (
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
