import { getAllGear } from "../_actions/getAllGear";
import GearCard from "./GearCard";

type GearsListProps = {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

const GearsList = async ({ searchParams }: GearsListProps) => {
  const query = await searchParams;

  const result = await getAllGear({ query });

  if (!result.success || !result.data || result.data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 rounded-2xl border border-dashed border-slate-200 bg-white">
        <p className="text-lg font-medium text-slate-700">No Gear Found</p>
        <p className="text-sm text-slate-500 mt-1">Try searching with a different term or filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {result.data.map((gear: any) => (
        <GearCard
          key={gear.id || gear._id}
          gear={gear}
        />
      ))}
    </div>
  );
};

export default GearsList;