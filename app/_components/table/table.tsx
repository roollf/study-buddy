"use client";

// import components
import * as TableComponent from "@/components/ui/table";

// import context
import { useTimer } from "@/app/_context/timerContext";

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

  return (
    <TableComponent.Table className="w-full max-w-3xl mx-auto">
      <TableComponent.TableHeader>
        <TableComponent.TableRow>
          <TableComponent.TableHead className="w-[100px]">
            Matéria
          </TableComponent.TableHead>
          <TableComponent.TableHead className="w-[100px]">
            Tema
          </TableComponent.TableHead>
          <TableComponent.TableHead className="w-[100px] text-right">
            Tempo
          </TableComponent.TableHead>
        </TableComponent.TableRow>
      </TableComponent.TableHeader>
      <TableComponent.TableBody>
        {data.map((item, index) => (
          <TableComponent.TableRow key={index}>
            <TableComponent.TableCell className="w-[100px] font-semibold">
              {item.disciplina}
            </TableComponent.TableCell>
            <TableComponent.TableCell className="w-[100px]">
              {item.tema}
            </TableComponent.TableCell>
            <TableComponent.TableCell className="w-[100px] text-right">
              {item.duration}
            </TableComponent.TableCell>
          </TableComponent.TableRow>
        ))}
      </TableComponent.TableBody>
    </TableComponent.Table>
  );
}
