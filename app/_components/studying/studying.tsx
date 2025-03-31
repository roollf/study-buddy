"use client";

// import components
import { ArrowUpFromDot as Arrow } from "lucide-react";

export default function Studying({
  data,
}: {
  data: { disciplina: string; tema: string };
}) {
  return (
    <div className="flex items-center justify-between max-w-[300px] gap-2 p-1 border-1 border-fuchsia-300 rounded-lg bg-zinc-50 shadow-sm">
      <span className="text-[11px] text-center font-semibold text-zinc-500">
        {data.disciplina}
      </span>
      <Arrow size={18} className="text-zinc-800 transform rotate-90" />
      <span className="text-[11px] text-center font-semibold text-zinc-500">
        {data.tema}
      </span>
    </div>
  );
}
