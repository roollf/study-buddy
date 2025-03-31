"use client";

// import react
import { useState, useRef, useEffect } from "react";

export function useAnimationMount(
  shouldShow: boolean,
  data: { disciplina: string; tema: string }
) {
  const [shouldRender, setShouldRender] = useState(false);
  const [preservedData, setPreservedData] = useState<{
    disciplina: string;
    tema: string;
  } | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldShow) {
      setShouldRender(true);
      setPreservedData(data);
    } else {
      const element = ref.current;
      if (!element) return;

      const handleAnimationEnd = () => {
        setShouldRender(false);
        setPreservedData(null);
      };

      element.addEventListener("animationend", handleAnimationEnd, {
        once: true,
      });

      return () => {
        element.removeEventListener("animationend", handleAnimationEnd);
      };
    }
  }, [shouldShow, data]);

  return { shouldRender, ref, preservedData };
}
