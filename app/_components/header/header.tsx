"use client";

// import react
import { useEffect, useState } from "react";

// import next
import Link from "next/link";
import { usePathname } from "next/navigation";

// import components
import Timer from "../timer/timer";
import Studying from "../studying/studying";

// import context
import { useTimer } from "@/app/_context/timerContext";

// constants
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/history", label: "Histórico" },
];

export default function Header() {
  const pathname = usePathname();
  const { selectedData } = useTimer();

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const shouldShow = Boolean(selectedData.disciplina && selectedData.tema);
  const [preservedData, setPreservedData] = useState<{
    disciplina: string;
    tema: string;
  } | null>(null);

  useEffect(() => {
    if (shouldShow) {
      setIsVisible(true);
      setPreservedData(selectedData);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setPreservedData(null);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [shouldShow]);

  return (
    <header
      className={`flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 py-4 px-7 border-b border-zinc-200 bg-zinc-50 transition-all duration-300 ease-in-out overflow-hidden ${
        shouldShow ? "max-h-[400px]" : "max-h-[300px]"
      }`}
    >
      <Link href={"/"}>
        <h1 className="text-2xl text-zinc-900 font-bold">Buddy</h1>
      </Link>
      <div className="flex flex-col items-center gap-2">
        <Timer />
        {(shouldShow || isVisible) && (
          <div
            className={`${
              shouldShow ? "opacity-100" : "opacity-0"
            } transition-all duration-300`}
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
