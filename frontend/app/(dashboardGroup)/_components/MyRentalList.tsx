import React from "react";
import { getMyRentals } from "../_actions/getRentals";
import MyRentalCard from "./MyRentalCard";
import { PackageOpen } from "lucide-react";

const MyRentalList = async () => {
  const rentals = await getMyRentals();

  if (!rentals || rentals.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mb-4">
          <PackageOpen className="h-8 w-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">No Rentals Found</h3>
        <p className="text-sm text-slate-500 mt-1">
          You haven't rented any gear items yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {rentals.map((rental: any) => (
        <MyRentalCard key={rental.id} rental={rental} />
      ))}
    </div>
  );
};

export default MyRentalList;
