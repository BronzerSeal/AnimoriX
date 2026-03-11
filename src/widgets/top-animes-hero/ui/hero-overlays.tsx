const HeroOverlays = () => {
  return (
    <>
      {/* левый градиент */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-120 bg-gradient-to-r from-zinc-50 via-zinc-50/30 to-transparent dark:from-[#0b1215] dark:via-[#0b1215]/40" />

      {/* правый fade */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-zinc-50 dark:from-[#0b1215] to-transparent" />

      {/* левый градиент для читаемости текста */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-zinc-50 via-zinc-50/0 dark:from-[#0b1215] dark:via-[#0b1215]/2 to-transparent" />

      {/* нижний градиент */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-zinc-50 via-zinc-50/40 to-transparent dark:from-[#0b1215] dark:via-[#0b1215]/40" />
    </>
  );
};

export default HeroOverlays;
