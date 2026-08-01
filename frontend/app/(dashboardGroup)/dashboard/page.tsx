"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  Heart, 
  User, 
  Calendar 
} from "lucide-react";
import UserPageCard from "../_components/UserPageCard";

const UserDashboardPage = () => {
  const [activeRentals, setActiveRentals] = useState<any[]>([]);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-10 space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
            <User className="h-8 w-8 text-indigo-600" />
            My Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track your active rentals, saved gear wishlist, and booking history.
          </p>
        </div>
      </div>

      {/* Stats Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <UserPageCard 
          title="Active Rentals" 
          value="1" 
          icon={<ShoppingBag className="h-6 w-6" />} 
          description="Currently in use"
        />
        <UserPageCard 
          title="Pending Bookings" 
          value="0" 
          icon={<Clock className="h-6 w-6" />} 
          description="Waiting for approval"
        />
        <UserPageCard 
          title="Completed Rentals" 
          value="5" 
          icon={<CheckCircle2 className="h-6 w-6" />} 
          description="Total past orders"
        />
        <UserPageCard 
          title="Saved Wishlist" 
          value="4" 
          icon={<Heart className="h-6 w-6" />} 
          description="Gears you liked"
        />
      </div>

      {/* Tabs Section for User Activity */}
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="bg-slate-100 p-1 rounded-2xl">
          <TabsTrigger value="active" className="rounded-xl text-xs font-semibold px-4 py-2">Active Rentals</TabsTrigger>
          <TabsTrigger value="requests" className="rounded-xl text-xs font-semibold px-4 py-2">Booking Requests</TabsTrigger>
          <TabsTrigger value="history" className="rounded-xl text-xs font-semibold px-4 py-2">Rental History</TabsTrigger>
          <TabsTrigger value="wishlist" className="rounded-xl text-xs font-semibold px-4 py-2">My Wishlist</TabsTrigger>
        </TabsList>

        {/* 1. Active Rentals Tab */}
        <TabsContent value="active" className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Current Equipment Rented</h2>
          <Card className="border-slate-100 shadow-sm rounded-2xl p-6 bg-white space-y-4">
            <div className="border border-slate-100 rounded-2xl p-4 flex items-center justify-between flex-wrap gap-4">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900">Sony FX3 Cinema Line Camera</h4>
                <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                  <Calendar className="h-3.5 w-3.5 text-indigo-600" /> Rental Period: Oct 12 - Oct 15
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> Rented
                </span>
                <Button variant="outline" size="sm" className="rounded-xl text-xs">View Details</Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* 2. Booking Requests Tab */}
        <TabsContent value="requests" className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Pending Requests</h2>
          <Card className="border-slate-100 shadow-sm rounded-2xl p-6 bg-white">
            <p className="text-sm text-slate-500 text-center py-10">
              You have no pending requests waiting for provider approval.
            </p>
          </Card>
        </TabsContent>

        {/* 3. Rental History Tab */}
        <TabsContent value="history" className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Past Orders</h2>
          <Card className="border-slate-100 shadow-sm rounded-2xl p-6 bg-white">
            <p className="text-sm text-slate-500 text-center py-10">
              Your completed gear rentals will show up here.
            </p>
          </Card>
        </TabsContent>

        {/* 4. Wishlist Tab */}
        <TabsContent value="wishlist" className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Saved Gears</h2>
          <Card className="border-slate-100 shadow-sm rounded-2xl p-6 bg-white">
            <p className="text-sm text-slate-500 text-center py-10">
              Items you saved to your wishlist will appear here.
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDashboardPage;