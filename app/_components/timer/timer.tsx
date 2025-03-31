"use client";

// import components
import Button from "../button/button";
import * as DialogComponent from "@/components/ui/alert-dialog";
import { Play, Pause, X as Reset, BookmarkCheck as Save } from "lucide-react";

// import utils
import formatTime from "@/app/_utils/formatTime";

// import context
import { useTimer } from "@/app/_context/timerContext";

export default function Timer() {
  const {
    timerDuration,
    isActive,
    selectedData,
    handleStart,
    handlePause,
    handleReset,
    handleSave,
  } = useTimer();

  return (
    <main
      className={`flex items-center gap-4 p-2 rounded-lg bg-zinc-50 shadow-sm ${
        isActive ? "border-1 border-fuchsia-300" : "border-1 border-zinc-200"
      } transition-all duration-300`}
    >
      <div className="text-4xl font-bold text-zinc-800 text-center">
        {formatTime(timerDuration)}
      </div>
      <div className="flex justify-center gap-4">
        <Button
          disabled={isActive}
          onClick={handleStart}
          className="disabled:bg-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-zinc-100 disabled:active:bg-zinc-100 bg-zinc-100 px-3 py-2 rounded-md border-1 hover:bg-zinc-200 active:bg-zinc-300 transition-colors duration-200 shadow-sm"
        >
          <Play size={16} className="text-zinc-800" />
        </Button>
        <Button
          disabled={!isActive}
          onClick={handlePause}
          className="disabled:bg-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-zinc-100 disabled:active:bg-zinc-100 bg-zinc-100 px-3 py-2 rounded-md border-1 hover:bg-zinc-200 active:bg-zinc-300 transition-colors duration-200 shadow-sm"
        >
          <Pause size={16} />
        </Button>
        <Button
          disabled={timerDuration === 0}
          onClick={handleReset}
          className="disabled:bg-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-zinc-100 disabled:active:bg-zinc-100 bg-zinc-100 px-3 py-2 rounded-md border-1 hover:bg-zinc-200 active:bg-zinc-300 transition-colors duration-200 shadow-sm"
        >
          <Reset size={16} className="text-zinc-800" />
        </Button>
        <DialogComponent.AlertDialog>
          <DialogComponent.AlertDialogTrigger asChild>
            <Button
              disabled={!selectedData.disciplina || !selectedData.tema}
              onClick={handlePause}
              className="disabled:bg-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-zinc-100 disabled:active:bg-zinc-100 bg-zinc-100 px-3 py-2 rounded-md border-1 hover:bg-zinc-200 active:bg-zinc-300 transition-colors duration-200 shadow-sm"
            >
              <Save size={16} className="text-zinc-800" />
            </Button>
          </DialogComponent.AlertDialogTrigger>
          <DialogComponent.AlertDialogContent className="w-full max-w-md">
            <DialogComponent.AlertDialogHeader>
              <DialogComponent.AlertDialogTitle className="text-zinc-800">
                Salvar tempo
              </DialogComponent.AlertDialogTitle>
              <DialogComponent.AlertDialogDescription className="text-zinc-600">
                Tem certeza que deseja salvar o tempo de{" "}
                {formatTime(timerDuration)} para {selectedData.disciplina} -{" "}
                {selectedData.tema}?
              </DialogComponent.AlertDialogDescription>
            </DialogComponent.AlertDialogHeader>
            <DialogComponent.AlertDialogFooter>
              <DialogComponent.AlertDialogCancel onClick={handleStart} className="active:bg-zinc-300 transition-colors duration-200">
                Cancelar
              </DialogComponent.AlertDialogCancel>
              <DialogComponent.AlertDialogAction onClick={handleSave} className="bg-zinc-100 text-zinc-800 border-1 hover:bg-zinc-200 active:bg-zinc-300 transition-colors duration-200">
                Salvar
              </DialogComponent.AlertDialogAction>
            </DialogComponent.AlertDialogFooter>
          </DialogComponent.AlertDialogContent>
        </DialogComponent.AlertDialog>
      </div>
    </main>
  );
}
