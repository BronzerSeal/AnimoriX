"use client";
import { useState } from "react";

const Synopsis = ({ text }: { text: string }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="text-left">
      <p
        onClick={() => setExpanded((prev) => !prev)}
        className={`cursor-pointer p-2 text-[12px] text-slate-700 transition-all duration-300 dark:text-white ${
          expanded ? "max-h-none" : "max-h-15 overflow-hidden"
        }`}
      >
        {text}
      </p>
    </div>
  );
};

export default Synopsis;
