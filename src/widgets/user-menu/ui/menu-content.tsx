import { Button } from "@/shared/ui/button";
import { FileText, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { menuItems } from "../constants/menu-items";
import Link from "next/link";

const MenuContent = () => {
  const { data: session } = useSession();

  const displayName =
    session?.user?.name?.trim() ||
    session?.user?.email?.split("@")[0] ||
    "No Data";
  const secondaryText = session?.user?.email || displayName;

  return (
    <div className="overflow-hidden rounded-[22px] border border-slate-200/80 bg-[#f8fafc] text-slate-950 shadow-[0_18px_50px_rgba(15,23,42,0.14)] dark:border-white/8 dark:bg-[#21262d] dark:text-white dark:shadow-[0_18px_50px_rgba(0,0,0,0.32)]">
      <header className="flex items-start justify-between gap-3 border-b border-slate-200/80 bg-white/90 px-5 py-4 dark:border-white/6 dark:bg-[#0f141a]">
        <div className="min-w-0">
          <p className="truncate text-[19px] font-medium leading-none text-slate-900 dark:text-white">
            {displayName}
          </p>
          <p className="mt-2 truncate text-sm leading-none text-slate-500 dark:text-[#8a9098]">
            {secondaryText}
          </p>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="mt-0.5 size-8 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 dark:bg-white/6 dark:text-[#8e96a0] dark:hover:bg-white/10 dark:hover:text-white"
          onClick={() => signOut()}
          aria-label="Sign out"
        >
          <LogOut className="size-4" strokeWidth={2.1} />
        </Button>
      </header>

      <nav className="flex flex-col gap-0.5 px-3 py-3" aria-label="User menu">
        <Link href={`/user/${session?.user.id}/profile`}>
          <Button
            key={"Profile Page"}
            type="button"
            variant="ghost"
            className="h-10 w-full justify-start rounded-xl border-0 px-3.5 text-[15px] font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-[#7a818a] dark:hover:bg-white/5 dark:hover:text-[#d8dde4]"
          >
            <FileText className="mr-2.5 size-[17px]" strokeWidth={2.1} />
            <span className="truncate">Profile Page</span>
          </Button>
        </Link>

        {/* остальные кнопки */}
        {menuItems.map(({ label, icon: Icon, href }) => (
          <Link href={href} key={label}>
            <Button
              type="button"
              variant="ghost"
              className="h-10 w-full justify-start rounded-xl border-0 px-3.5 text-[15px] font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-[#7a818a] dark:hover:bg-white/5 dark:hover:text-[#d8dde4]"
            >
              <Icon className="mr-2.5 size-[17px]" strokeWidth={2.1} />
              <span className="truncate">{label}</span>
            </Button>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default MenuContent;
