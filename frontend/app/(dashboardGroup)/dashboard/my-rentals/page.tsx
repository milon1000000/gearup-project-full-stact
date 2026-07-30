import React, { Suspense } from "react";
import { getMe } from "@/service/getMe";
import { User, Shield, Mail } from "lucide-react";
import MyRentalList from "../../_components/MyRentalList";

const MyRentals = async () => {
  const userResponse = await getMe();
  const user = userResponse?.data;

  return (
    <div className="min-h-screen bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Welcome Banner / Profile Header */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-2xl font-bold shadow-md shadow-emerald-600/20">
              {user?.name ? user.name.charAt(0).toUpperCase() : <User className="h-8 w-8" />}
            </div>
            <div className="space-y-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-slate-900">
                Welcome back, {user?.name || "User"}!
              </h1>
              <p className="text-sm text-slate-500 flex items-center justify-center sm:justify-start gap-1.5">
                <Mail className="h-3.5 w-3.5 text-emerald-600" />
                {user?.email || "user@example.com"}
              </p>
            </div>
          </div>
          
          <div className="bg-emerald-50 border border-emerald-100 px-4 py-2.5 rounded-2xl flex items-center gap-2">
            <Shield className="h-4 w-4 text-emerald-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Role: {user?.role || "CUSTOMER"}
            </span>
          </div>
        </div>

        {/* Rentals Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              My Rental History
            </h2>
            <span className="text-xs font-medium bg-slate-200/70 text-slate-700 px-3 py-1 rounded-full">
              Active & Past Rentals
            </span>
          </div>

          <Suspense fallback={
            <div className="text-center py-12 text-slate-500 font-medium">
              Loading your rentals...
            </div>
          }>
            <MyRentalList />
          </Suspense>
        </div>

      </div>
    </div>
  );
};

export default MyRentals;