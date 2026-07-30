import GearsList from "../_components/GearList";
import { GearSearchBar } from "../_components/GearSearch";
import { GearSkeleton } from "../_components/GearSkeleton";
import { Suspense } from "react";

type PageProps = {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

const GearPage = ({ searchParams }: PageProps) => {
  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4 space-y-6">
        
        {/* Minimal Header with Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            All Gears
          </h1>
          <GearSearchBar />
        </div>

        {/* Gear List Container with Suspense boundary */}
        <Suspense fallback={<GearSkeleton />}>
          <GearsList searchParams={searchParams} />
        </Suspense>

      </div>
    </div>
  );
};

export default GearPage;