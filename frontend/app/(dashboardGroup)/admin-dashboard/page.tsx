"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Package, 
  Users, 
  ShoppingBag, 
  MessageSquare, 
  Trash2, 
  ShieldCheck 
} from "lucide-react";
import { deleteReview } from "@/app/(publicGroup)/_actions/getMyReviews";
import AdminPageCard from "../_components/AdminPageCard";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // ডাটা ফেচিং বা স্ট্যাটাস লোড করার লজিক
  }, []);

  // রিভিউ ডিলিট হ্যান্ডলার (অ্যাডমিন রাইটস সহ)
  const handleDeleteReview = async (reviewId: string) => {
    if (confirm("Are you sure you want to delete this review as Admin?")) {
      const res = await deleteReview(reviewId);
      if (res.success) {
        setReviews((prev) => prev.filter((item) => item.id !== reviewId));
      } else {
        alert(res.message);
      }
    }
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-10 space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
            <ShieldCheck className="h-8 w-8 text-blue-600" />
            Admin Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your gear rentals, users, orders, and platform reviews efficiently.
          </p>
        </div>
      </div>

      {/* Stats Overview Cards (Using AdminPageCard Component) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminPageCard 
          title="Total Gears" 
          value="24" 
          icon={<Package className="h-6 w-6" />} 
        />
        <AdminPageCard 
          title="Total Rentals" 
          value="142" 
          icon={<ShoppingBag className="h-6 w-6" />} 
        />
        <AdminPageCard 
          title="Active Users" 
          value="58" 
          icon={<Users className="h-6 w-6" />} 
        />
        <AdminPageCard 
          title="Platform Reviews" 
          value="89" 
          icon={<MessageSquare className="h-6 w-6" />} 
        />
      </div>

      {/* Tabs Section for Managing Features */}
      <Tabs defaultValue="gears" className="space-y-6">
        <TabsList className="bg-slate-100 p-1 rounded-2xl">
          <TabsTrigger value="gears" className="rounded-xl text-xs font-semibold px-4 py-2">Manage Gears</TabsTrigger>
          <TabsTrigger value="rentals" className="rounded-xl text-xs font-semibold px-4 py-2">Rental Orders</TabsTrigger>
          <TabsTrigger value="reviews" className="rounded-xl text-xs font-semibold px-4 py-2">Manage Reviews</TabsTrigger>
          <TabsTrigger value="users" className="rounded-xl text-xs font-semibold px-4 py-2">User Roles</TabsTrigger>
        </TabsList>

        {/* 1. Manage Gears Tab */}
        <TabsContent value="gears" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-900">Gear Inventory</h2>
          </div>
          <Card className="border-slate-100 shadow-sm rounded-2xl p-6 bg-white">
            <p className="text-sm text-slate-500 text-center py-10">
              Gear items table component will be rendered here (Showing stock, brand, category, and price/day).
            </p>
          </Card>
        </TabsContent>

        {/* 2. Rental Orders Tab */}
        <TabsContent value="rentals" className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">All Rental Orders (Returned / Active)</h2>
          <Card className="border-slate-100 shadow-sm rounded-2xl p-6 bg-white">
            <p className="text-sm text-slate-500 text-center py-10">
              Rental orders tracking list with statuses (RETURNED, PENDING, etc.) will appear here.
            </p>
          </Card>
        </TabsContent>

        {/* 3. Manage Reviews Tab (Using Admin Delete Power) */}
        <TabsContent value="reviews" className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Platform Review Moderation</h2>
          <Card className="border-slate-100 shadow-sm rounded-2xl p-6 bg-white space-y-4">
            <p className="text-xs text-slate-500">
              As an admin, you have the authority to remove any inappropriate reviews across the platform.
            </p>
            <div className="border border-slate-100 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900">Sony A7IV Camera Gear</h4>
                <p className="text-xs text-slate-500">&quot;Great camera, smooth renting experience!&quot; - By Customer</p>
              </div>
              <Button 
                variant="destructive" 
                size="sm" 
                className="rounded-xl h-8 px-3 text-xs gap-1"
                onClick={() => handleDeleteReview("sample-review-id")}
              >
                <Trash2 className="h-3.5 w-3.5" /> Delete
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* 4. Users Tab */}
        <TabsContent value="users" className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">User Management</h2>
          <Card className="border-slate-100 shadow-sm rounded-2xl p-6 bg-white">
            <p className="text-sm text-slate-500 text-center py-10">
              List of Customers and Providers with role management options.
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;