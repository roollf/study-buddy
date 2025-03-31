"use client";

// import next
import Link from "next/link";
import { usePathname } from "next/navigation";

// import components
import Timer from "../timer/timer";
import Studying from "../studying/studying";

// import context
import { useTimer } from "@/app/_context/timerContext";

// import custom hooks
import { useAnimationMount } from "@/app/_hooks/useAnimationMount";

// constants
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/estatisticas", label: "Estatísticas" },
];

export default function Header() {
  const pathname = usePathname();
  const { selectedData } = useTimer();
  const shouldShow = Boolean(selectedData.disciplina && selectedData.tema);
  const { shouldRender, ref, preservedData } = useAnimationMount(shouldShow, selectedData);

  return (
    <header className="flex justify-between items-center py-4 px-7 border-b border-zinc-200 bg-zinc-50">
      <Link href={"/"}>
        <h1 className="text-2xl text-zinc-900 font-bold">Buddy</h1>
      </Link>
      <div className="flex flex-col items-center gap-2">
        <Timer />
        {shouldRender && (
          <div
            ref={ref}
            className={`${
              shouldShow
                ? "animate-[slideDown_0.3s_ease-out]"
                : "animate-[slideUp_0.3s_ease-out]"
            } origin-top`}
          >
            <Studying data={preservedData || selectedData} />
          </div>
        )}
      </div>
      <nav>
        <ul className="flex gap-x-5 text-[14px]">
          {navLinks.map((link: { href: string; label: string }) => (
            <li key={link.href}>
              <Link
                className={`${
                  pathname === link.href ? "text-zinc-950" : "text-zinc-400"
                }`}
                href={link.href}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
