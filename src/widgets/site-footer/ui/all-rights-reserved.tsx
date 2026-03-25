import Link from "next/link";
import { socialLinks, externalLinks } from "../consts/consts";

const AllRightsReserved = () => {
  return (
    <section className="flex flex-col gap-5 border-t border-white/10 pt-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="space-y-2.5">
        <p className="text-[15px] font-semibold">
          Copyright <span className="text-orange-400">@AnimoriX</span>. All
          Rights Reserved
        </p>
        <p className="max-w-3xl text-sm leading-6 text-zinc-500">
          This site does not store any files on its server. All contents are
          provided by non-affiliated third parties.
        </p>
        <p className="text-sm text-zinc-400">
          Socials:{" "}
          {socialLinks.map((link, index) => (
            <span key={link.label}>
              <Link
                href={link.href}
                className="transition hover:text-orange-300"
              >
                {link.label}
              </Link>
              {index < socialLinks.length - 1 ? " | " : ""}
            </span>
          ))}
        </p>
        <p className="text-sm text-zinc-400">
          Links:{" "}
          {externalLinks.map((link, index) => (
            <span key={link.label}>
              <Link
                href={link.href}
                className="transition hover:text-orange-300"
              >
                {link.label}
              </Link>
              {index < externalLinks.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>
      </div>

      <div className="text-right text-4xl font-black tracking-tight text-orange-500/90">
        AnimoriX
      </div>
    </section>
  );
};

export default AllRightsReserved;
