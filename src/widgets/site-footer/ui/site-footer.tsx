import Link from "next/link";
import { alphabet, quickLinks } from "../consts/consts";
import AllRightsReserved from "./all-rights-reserved";

const SiteFooter = () => {
  return (
    <footer className="mt-10 border-t border-black/10 dark:border-white/10 bg-[#EEEEFF] dark:bg-[#11161a] text-black dark:text-white">
      <div className="mx-auto flex w-full max-w-425 flex-col gap-8 px-5 py-8 lg:px-8">
        <section className="space-y-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
            <h2 className="text-xl font-extrabold tracking-tight">A-Z List</h2>
            <p className="text-sm text-zinc-500">
              Searching anime order by alphabet name A to Z.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {alphabet.map((letter) => (
              <Link
                key={letter}
                href={`/browser?keyword=${letter}`}
                className="rounded-md border border-white/8 bg-white dark:bg-zinc-900 px-2 py-1 text-[12px] font-bold text-black dark:text-zinc-100 transition hover:border-orange-400/40 hover:bg-zinc-800 hover:text-orange-300"
              >
                {letter}
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap gap-6 pt-1">
            {quickLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[12px] font-extrabold text-black dark:text-white transition hover:text-orange-300"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </section>

        <AllRightsReserved />
      </div>
    </footer>
  );
};

export default SiteFooter;
