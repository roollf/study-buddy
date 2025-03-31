"use client";

// import react
import { useState } from "react";

// import components
import * as TableComponent from "@/components/ui/table";

// import context
import { useTimer } from "@/app/_context/timerContext";

// import utils
import formatTime from "@/app/_utils/formatTime";

export default function Table() {
  const { selectedDataList } = useTimer();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(selectedDataList.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = selectedDataList.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const data = currentItems.map((item) => {
    const { disciplina, tema, duration } = item;
    const formattedDuration = new Date(duration * 1000)
      .toISOString()
      .substr(11, 8);
    return {
      disciplina,
      tema,
      duration: formattedDuration,
    };
  });

  const totalDuration = selectedDataList.reduce((acc, item) => {
    return acc + item.duration;
  }, 0);

  return (
    <>
      {selectedDataList.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-zinc-800 text-[16px] font-semibold">
            Você ainda não estudou nada.
          </p>
          <p className="text-zinc-500 text-[12px]">
            Assim que você estudar algo, ele aparecerá aqui.
          </p>
        </div>
      ) : (
        <div className="flex flex-col">
          <TableComponent.Table className="md:w-[800px] max-w-3xl mx-auto">
            <TableComponent.TableCaption>
              Uma lista com as matérias e temas que você estudou.
            </TableComponent.TableCaption>
            <TableComponent.TableHeader>
              <TableComponent.TableRow>
                <TableComponent.TableHead className="w-[100px] text-zinc-800 text-[16px] font-bold">
                  Matéria
                </TableComponent.TableHead>
                <TableComponent.TableHead className="w-[100px] text-zinc-800 text-[16px] font-bold ">
                  Tema
                </TableComponent.TableHead>
                <TableComponent.TableHead className="w-[100px] text-zinc-800 text-[16px] font-bold text-right">
                  Tempo
                </TableComponent.TableHead>
              </TableComponent.TableRow>
            </TableComponent.TableHeader>
            <TableComponent.TableBody>
              {data.map((item, index) => (
                <TableComponent.TableRow key={index}>
                  <TableComponent.TableCell className="w-[100px] text-[12px] text-zinc-800 font-semibold">
                    {item.disciplina}
                  </TableComponent.TableCell>
                  <TableComponent.TableCell className="w-[100px] text-[12px] text-zinc-500">
                    {item.tema}
                  </TableComponent.TableCell>
                  <TableComponent.TableCell className="w-[100px] text-[12px] text-right">
                    {item.duration}
                  </TableComponent.TableCell>
                </TableComponent.TableRow>
              ))}
            </TableComponent.TableBody>
            <TableComponent.TableFooter>
              <TableComponent.TableRow>
                <TableComponent.TableCell
                  colSpan={2}
                  className="text-zinc-800 font-semibold"
                >
                  Total
                </TableComponent.TableCell>
                <TableComponent.TableCell className="text-[12px] text-zinc-800 font-semibold text-right">
                  {formatTime(totalDuration)}
                </TableComponent.TableCell>
              </TableComponent.TableRow>
            </TableComponent.TableFooter>
          </TableComponent.Table>
          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="disabled:bg-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-zinc-100 disabled:active:bg-zinc-100 bg-zinc-100 px-2 py-1 rounded-md border-1 hover:bg-zinc-200 active:bg-zinc-300 transition-colors duration-200 shadow-sm"
            >
              Anterior
            </button>
            <span className="text-sm text-zinc-600">
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="disabled:bg-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-zinc-100 disabled:active:bg-zinc-100 bg-zinc-100 px-2 py-1 rounded-md border-1 hover:bg-zinc-200 active:bg-zinc-300 transition-colors duration-200 shadow-sm"
            >
              Próxima
            </button>
          </div>
        </div>
      )}
    </>
  );
}
