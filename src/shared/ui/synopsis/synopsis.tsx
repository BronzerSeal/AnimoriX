"use client";
import { useState } from "react";

const WORD_LIMIT = 300;

const Synopsis = ({ text }: { text: string }) => {
  const [expanded, setExpanded] = useState(false);

  const words = text.split(" ");
  const isLong = words.length > WORD_LIMIT;

  const displayedText =
    expanded || !isLong ? text : words.slice(0, WORD_LIMIT).join(" ") + "...";

  return (
    <div className="text-left p-2 text-[12px] text-slate-700 dark:text-white">
      <p>{displayedText}</p>

      {isLong && (
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-1 text-gray-500 hover:underline"
        >
          {expanded ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};

export default Synopsis;
