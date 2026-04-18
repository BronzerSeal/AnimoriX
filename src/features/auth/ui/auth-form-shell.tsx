import { ReactNode } from "react";
import { Check, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/shared/ui/button";
import { DialogClose } from "@/shared/ui/dialog";

type AuthFormShellProps = {
  title: string;
  statusTitle: string;
  statusDescription: string;
  submitLabel: string;
  children: ReactNode;
  footer: ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  className?: string;
};

export const AuthFormShell = ({
  title,
  statusTitle,
  statusDescription,
  submitLabel,
  children,
  footer,
  className,
  onSubmit,
}: AuthFormShellProps) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2rem] bg-zinc-50 dark:bg-[#151c24] px-8 pb-8 pt-7 text-black dark:text-white shadow-[0_22px_60px_rgba(0,0,0,0.45)]",
        className,
      )}
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-44 w-[145%] -translate-x-1/2 -translate-y-[64%] rounded-full bg-[#39cc66]" />

      <DialogClose
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="absolute right-4 top-4 z-20 rounded-full text-white/65 hover:bg-black/10 hover:text-white"
          >
            <X className="size-4" />
            <span className="sr-only">Close</span>
          </Button>
        }
      />

      <form
        onSubmit={onSubmit}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="mt-3 flex size-11 items-center justify-center rounded-xl bg-zinc-50 dark:bg-[#1a2129] text-xs font-black tracking-[0.28em] text-[#39cc66] ring-1 ring-white/10 shadow-[0_14px_24px_rgba(0,0,0,0.35)]">
          AX
        </div>

        <div className="mt-10 w-full space-y-5">
          <h2 className="text-center text-[1.75rem] leading-tight font-semibold text-black dark:text-white">
            {title}
          </h2>

          <div className="space-y-4">{children}</div>

          <Button
            type="submit"
            className="h-12 w-full rounded-2xl border-0 bg-[#f06b3b] text-base font-semibold text-white shadow-[0_12px_30px_rgba(240,107,59,0.28)] hover:bg-[#f47d52]"
          >
            {submitLabel}
          </Button>

          <div className="space-y-1 text-center text-sm leading-relaxed text-white/65">
            {footer}
          </div>
        </div>
      </form>
    </div>
  );
};
