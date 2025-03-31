"use client";

export default function Button({
  children,
  ...rest
}: {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...rest}>{children}</button>;
}
