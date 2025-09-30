import { PriceTable } from "@/components/price-table";

export default function Home() {
  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-[1800px]">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">
            Food Price Tracker
          </h1>
          <p className="text-muted-foreground text-lg">
            Weekly food prices by restaurant
          </p>
        </div>
        <PriceTable />
      </div>
    </main>
  );
}
