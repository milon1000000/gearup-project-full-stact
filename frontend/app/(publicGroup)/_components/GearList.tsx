import React from "react";
import { getAllGear } from "../_actions/getAllGear";
import GearCard from "./GearCard";

type GearsListProps = {
  searchParams?: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

const GearsList = async ({ searchParams }: GearsListProps) => {
  const query = searchParams ? await searchParams : {};
  const result = await getAllGear({ query });

  if (!result.success || !result.data || result.data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 rounded-3xl border border-dashed border-slate-200 bg-white/50 backdrop-blur-sm shadow-sm">
        <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
          📦
        </div>
        <p className="text-base font-bold text-slate-800">No Gear Found</p>
        <p className="text-xs text-slate-500 mt-1 text-center max-w-xs">
          Try adjusting your search query or filter options to find available gear.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {result.data.map((gear: any) => (
        <GearCard key={gear.id || gear._id} gear={gear} />
      ))}
    </div>
  );
};

export default GearsList;