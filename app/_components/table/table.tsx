"use client";

// import components
import * as TableComponent from "@/components/ui/table";

// import context
import { useTimer } from "@/app/_context/timerContext";

// import utils
import formatTime from "@/app/_utils/formatTime";

export default function Table() {
  const { selectedDataList } = useTimer();

  const data = selectedDataList.map((item) => {
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
      )}
    </>
  );
}
