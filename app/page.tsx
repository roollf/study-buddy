// import components
import Card from "./_components/card/card";
import Table from "./_components/table/table";
import Chart from "./_components/chart/chart";

export default function Home() {
  return (
    <main className="flex flex-col md:flex-row items-center justify-center h-full gap-10 md:gap-20 mx-auto my-auto">
      <Card />
      {/* <Table /> */}
      <Chart />
    </main>
  );
}
