import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "outline" | "wa";
type Size = "lg" | "md" | "sm";

const base =
  "inline-flex items-center justify-center font-semibold rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-fg hover:bg-accent/90",
  outline: "border border-border bg-paper hover:border-accent",
  wa: "bg-wa text-white hover:bg-wa/90",
};

const sizes: Record<Size, string> = {
  lg: "px-8 py-4",
  md: "px-6 py-3",
  sm: "px-5 py-3",
};

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  variant?: Variant;
  size?: Size;
  href?: string;
  className?: string;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "lg",
  href,
  className,
  children,
  ...rest
}: ButtonProps) {
  const cls = [base, variants[variant], sizes[size], className].filter(Boolean).join(" ");
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
