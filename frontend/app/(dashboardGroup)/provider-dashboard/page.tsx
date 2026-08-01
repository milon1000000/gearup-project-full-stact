"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Package, 
  ShoppingBag, 
  DollarSign, 
  CheckCircle, 
  Clock, 
  Store 
} from "lucide-react";
import ProviderCard from "../_components/ProviderCard";

const ProviderDashboardPage = () => {
  const [gears, setGears] = useState<any[]>([]);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-10 space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
            <Store className="h-8 w-8 text-blue-600" />
            Provider Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your listed gears, rental requests, and earnings seamlessly.
          </p>
        </div>
      </div>

      {/* Stats Overview Cards (Using ProviderCard) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ProviderCard 
          title="Total Listed Gears" 
          value="8" 
          icon={<Package className="h-6 w-6" />} 
          description="Active in marketplace"
        />
        <ProviderCard 
          title="Active Rentals" 
          value="3" 
          icon={<ShoppingBag className="h-6 w-6" />} 
          description="Currently rented out"
        />
        <ProviderCard 
          title="Pending Requests" 
          value="2" 
          icon={<Clock className="h-6 w-6" />} 
          description="Requires your approval"
        />
        <ProviderCard 
          title="Total Earnings" 
          value="$1,240" 
          icon={<DollarSign className="h-6 w-6" />} 
          description="Lifetime revenue"
        />
      </div>

      {/* Tabs Section for Provider Management */}
      <Tabs defaultValue="my-gears" className="space-y-6">
        <TabsList className="bg-slate-100 p-1 rounded-2xl">
          <TabsTrigger value="my-gears" className="rounded-xl text-xs font-semibold px-4 py-2">My Gears</TabsTrigger>
          <TabsTrigger value="rentals" className="rounded-xl text-xs font-semibold px-4 py-2">Rental Requests</TabsTrigger>
          <TabsTrigger value="history" className="rounded-xl text-xs font-semibold px-4 py-2">Rental History</TabsTrigger>
        </TabsList>

        {/* 1. My Gears Tab */}
        <TabsContent value="my-gears" className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Your Equipment Inventory</h2>
          <Card className="border-slate-100 shadow-sm rounded-2xl p-6 bg-white space-y-4">
            <div className="border border-slate-100 rounded-2xl p-4 flex items-center justify-between flex-wrap gap-4">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900">Sony FX3 Cinema Line Camera</h4>
                <p className="text-xs text-slate-500">Category: Camera | Price: $75/day</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <CheckCircle className="h-3.5 w-3.5" /> Available
                </span>
                <Button variant="outline" size="sm" className="rounded-xl text-xs">Edit</Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* 2. Rental Requests Tab */}
        <TabsContent value="rentals" className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Incoming Rental Requests</h2>
          <Card className="border-slate-100 shadow-sm rounded-2xl p-6 bg-white">
            <p className="text-sm text-slate-500 text-center py-10">
              No pending rental requests right now. Customer bookings will appear here for your confirmation.
            </p>
          </Card>
        </TabsContent>

        {/* 3. Rental History Tab */}
        <TabsContent value="history" className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Completed Rentals</h2>
          <Card className="border-slate-100 shadow-sm rounded-2xl p-6 bg-white">
            <p className="text-sm text-slate-500 text-center py-10">
              History of returned gears and past earnings will be displayed here.
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProviderDashboardPage;