"use client";

// import react
import { useState } from "react";

// import mock
import StudyData from "@/app/_mock/data";

// import components
import * as CardComponent from "@/components/ui/card";
import * as SelectComponent from "@/components/ui/select";
import Button from "../button/button";

// import context
import { useTimer } from "@/app/_context/timerContext";

// import utils
import filterThemes from "@/app/_utils/filterThemes";

export default function Card() {
  const { handleStart, setSelectedData } = useTimer();

  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedTheme, setSelectedTheme] = useState<string>("");

  const filteredThemes = filterThemes(StudyData, selectedSubject);

  const handleStartClick = (): void => {
    const selectedData: { disciplina: string; tema: string } = {
      disciplina: selectedSubject,
      tema: selectedTheme,
    };
    setSelectedData(selectedData);
    handleStart();
    setSelectedSubject("");
    setSelectedTheme("");
  };

  const handleSubjectChange = (value: string): void => {
    setSelectedSubject(value);
    setSelectedTheme("");
  };

  return (
    <CardComponent.Card className="w-[200px] md:w-[350px]">
      <CardComponent.CardHeader>
        <CardComponent.CardTitle className="md:text-start text-center">Definir estudo</CardComponent.CardTitle>
        <CardComponent.CardDescription className="md:text-start text-center">
          Defina sua matéria e tema.
        </CardComponent.CardDescription>
      </CardComponent.CardHeader>
      <CardComponent.CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <label className="text-[12px] md:text-[16px] text-zinc-800 font-semibold">
              Matéria
            </label>
            <SelectComponent.Select
              value={selectedSubject}
              onValueChange={handleSubjectChange}
            >
              <SelectComponent.SelectTrigger
                id="disciplina"
                className="w-[150px] md:w-full"
              >
                <SelectComponent.SelectValue placeholder="Selecione uma matéria" />
              </SelectComponent.SelectTrigger>
              <SelectComponent.SelectContent position="popper">
                {StudyData.map((item, index) => (
                  <SelectComponent.SelectItem
                    key={index}
                    value={item.disciplina}
                  >
                    {item.disciplina}
                  </SelectComponent.SelectItem>
                ))}
              </SelectComponent.SelectContent>
            </SelectComponent.Select>
            <label className="text-[12px] md:text-[16px] text-zinc-800 font-semibold">
              Tema
            </label>
            <SelectComponent.Select
              value={selectedTheme}
              onValueChange={setSelectedTheme}
              disabled={!selectedSubject}
            >
              <SelectComponent.SelectTrigger
                id="tema"
                className="w-[150px] md:w-full"
              >
                <SelectComponent.SelectValue placeholder="Selecione um tema" />
              </SelectComponent.SelectTrigger>
              <SelectComponent.SelectContent position="popper">
                {filteredThemes.map((tema, index) => (
                  <SelectComponent.SelectItem key={index} value={tema}>
                    {tema}
                  </SelectComponent.SelectItem>
                ))}
              </SelectComponent.SelectContent>
            </SelectComponent.Select>
          </div>
        </div>
      </CardComponent.CardContent>
      <CardComponent.CardFooter>
        <Button
          disabled={!selectedSubject || !selectedTheme}
          onClick={handleStartClick}
          className="disabled:bg-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-zinc-100 disabled:active:bg-zinc-100 w-full flex items-center justify-center space-x-2 bg-zinc-100 px-3 py-2 rounded-md border-1 hover:bg-zinc-200 active:bg-zinc-300 transition-colors duration-200 shadow-sm"
        >
          <span className="text-[12px] md:text-[16px] font-semibold">
            Iniciar cronômetro
          </span>
        </Button>
      </CardComponent.CardFooter>
    </CardComponent.Card>
  );
}
