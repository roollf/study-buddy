// import components
import Card from "./_components/card/card";
import Chart from "./_components/chart/chart";

export default function Home() {
  return (
    <main className="flex py-5 md:py-0 flex-col md:flex-row items-center justify-center h-full gap-10 md:gap-20 mx-auto my-auto">
      <Card />
      <Chart />
    </main>
  );
}
