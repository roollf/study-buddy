"use client";

// import react
import { createContext, useContext, useState, useEffect, useRef } from "react";

const TimerContext = createContext({
  timerDuration: 0,
  isActive: false,
  selectedData: {
    disciplina: "",
    tema: "",
  },
  selectedDataList: [
    {
      disciplina: "",
      tema: "",
      duration: 0,
    },
  ],
  setSelectedData: (data: { disciplina: string; tema: string }) => {},
  setTimerDuration: (duration: number) => {},
  handleStart: () => {},
  handlePause: () => {},
  handleReset: () => {},
  handleSave: () => {},
});

export function TimerProvider({ children }: { children: React.ReactNode }) {
  const [timerDuration, setTimerDuration] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<{
    disciplina: string;
    tema: string;
  }>({
    disciplina: "",
    tema: "",
  });
  const [selectedDataList, setSelectedDataList] = useState<
    {
      disciplina: string;
      tema: string;
      duration: number;
    }[]
  >([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);



  useEffect(() => {
    const storedDuration = localStorage.getItem("timerDuration");
    const storedDataList = localStorage.getItem("selectedDataList");
    const parsedDataList = storedDataList ? JSON.parse(storedDataList) : [];

    if (storedDuration) {
      setTimerDuration(parseInt(storedDuration, 10));
    }
    if (parsedDataList.length > 0) {
      setSelectedDataList(parsedDataList);
    }
  }, []);

  useEffect(() => {
    if (isActive && !isPaused) {
      timerRef.current = setInterval(() => {
        setTimerDuration((prevDuration) => {
          const newDuration = prevDuration + 1;
          localStorage.setItem("timerDuration", newDuration.toString());
          return newDuration;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, isPaused]);

  const handleStart = (): void => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePause = (): void => {
    if (isActive) {
      setIsPaused(true);
      setIsActive(false);

      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const handleReset = (): void => {
    setIsActive(false);
    setIsPaused(false);
    setTimerDuration(0);
    localStorage.removeItem("timerDuration");

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const handleSave = (): void => {
    const savedData = {
      disciplina: selectedData.disciplina,
      tema: selectedData.tema,
      duration: timerDuration,
    };
    setSelectedData({
      disciplina: "",
      tema: "",
    });
    setTimerDuration(0);

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    setSelectedDataList((prevList) => [...prevList, savedData]);
    localStorage.setItem(
      "selectedDataList",
      JSON.stringify([...selectedDataList, savedData])
    );
  };

  return (
    <TimerContext.Provider
      value={{
        timerDuration,
        isActive,
        selectedData,
        selectedDataList,
        setSelectedData,
        setTimerDuration,
        handleStart,
        handlePause,
        handleReset,
        handleSave,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export function useTimer() {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error("useTimer must be used within a TimerProvider");
  }
  return context;
}
