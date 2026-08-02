"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Package,
  Users,
  ShoppingBag,
  MessageSquare,
  Trash2,
  ShieldCheck,
  Mail,
  Star,
  Loader2,
  PackageOpen,
  Activity,
  BadgeCheck,
} from "lucide-react";
import AdminPageCard from "./AdminPageCard";
import AdminRentalTable from "./AdminRentalTable";
import AdminUsersList from "./AdminUsersList";
import { deleteReview } from "@/app/(publicGroup)/_actions/getMyReviews";

type AdminGearData = {
  id: string;
  name: string;
  brand?: string;
  image?: string | null;
  pricePerDay?: number;
  stock?: number;
  available?: boolean;
  category?: {
    name?: string;
  } | null;
  provider?: {
    name?: string;
  } | null;
};

type AdminRentalData = {
  id: string;
  quantity: number;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: string;
  customer?: {
    name: string;
    email: string;
  };
  provider?: {
    name: string;
    email: string;
  };
  gearItem: {
    name: string;
    brand: string;
  };
};

type AdminUserData = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "PROVIDER" | "CUSTOMER";
  status?: string;
  createdAt?: string;
};

type AdminReviewData = {
  id: string;
  rating: number;
  comment?: string | null;
  customer?: {
    name?: string;
  } | null;
  gearItem?: {
    name?: string;
  } | null;
};

type AdminProps = {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  } | null;
  gears: AdminGearData[];
  rentals: AdminRentalData[];
  users: AdminUserData[];
  reviews: AdminReviewData[];
};

const EmptyState = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <div className="text-center py-14 bg-white rounded-3xl border border-slate-100 shadow-sm">
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 text-slate-300 mb-4">
      <Icon className="h-8 w-8" />
    </div>
    <h3 className="text-lg font-bold text-slate-900">{title}</h3>
    <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">{description}</p>
  </div>
);

const AdminDashboardContent = ({ user, gears, rentals, users, reviews }: AdminProps) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const stats = useMemo(() => {
    const activeUsers = users.filter((u) => u.status === "ACTIVE").length;
    const activeRentals = rentals.filter((r) =>
      ["CONFIRMED", "PAID", "PICKED_UP"].includes(r.status),
    ).length;
    const revenue = rentals
      .filter((r) => r.status !== "CANCELLED")
      .reduce((sum, r) => sum + (r.totalPrice || 0), 0);

    return { activeUsers, activeRentals, revenue };
  }, [users, rentals]);

  const handleDeleteReview = async (reviewId: string) => {
    if (!window.confirm("Are you sure you want to delete this review as Admin?")) {
      return;
    }

    setDeletingId(reviewId);
    const res = await deleteReview(reviewId);
    setDeletingId(null);

    if (res.success) {
      toast.success(res.message || "Review deleted successfully");
      router.refresh();
    } else {
      toast.error(res.message || "Failed to delete review");
    }
  };

  const statusBadge = (available: boolean, stock: number) => (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
        available && stock > 0
          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
          : "bg-rose-50 text-rose-700 border-rose-200"
      }`}
    >
      <BadgeCheck className="h-3 w-3" />
      {available && stock > 0 ? "Available" : "Unavailable"}
    </span>
  );

  return (
    <div className="container mx-auto max-w-7xl px-4 py-6 sm:py-10 space-y-6 sm:space-y-8 overflow-hidden">
      {/* Welcome Banner - Fixed mobile overflow issue */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-5 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-purple-600 text-white flex items-center justify-center text-xl sm:text-2xl font-bold shadow-md shadow-purple-600/30 shrink-0">
            {user?.name ? user.name.charAt(0).toUpperCase() : <ShieldCheck className="h-7 w-7 sm:h-8 sm:w-8" />}
          </div>
          <div className="space-y-1 text-left w-full min-w-0">
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-purple-400">
              Admin Control Center
            </p>
            <h1 className="text-xl sm:text-3xl font-extrabold text-white truncate">
              {user?.name || "Administrator"} 🛡️
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 flex items-center gap-1.5 truncate">
              <Mail className="h-3.5 w-3.5 text-purple-400 shrink-0" />
              <span className="truncate">{user?.email || "admin@gearup.com"}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-2 rounded-xl sm:rounded-2xl shrink-0 self-start md:self-auto">
          <ShieldCheck className="h-4 w-4 text-purple-400" />
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white">
            Role: {user?.role || "ADMIN"}
          </span>
        </div>
      </div>

      {/* Stats Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminPageCard
          title="Total Gears"
          value={gears.length}
          icon={<Package className="h-6 w-6" />}
          description="Across all providers"
        />
        <AdminPageCard
          title="Total Rentals"
          value={rentals.length}
          icon={<ShoppingBag className="h-6 w-6" />}
          description={`${stats.activeRentals} currently active`}
        />
        <AdminPageCard
          title="Active Users"
          value={stats.activeUsers}
          icon={<Users className="h-6 w-6" />}
          description={`${users.length} total registered`}
        />
        <AdminPageCard
          title="Platform Reviews"
          value={reviews.length}
          icon={<MessageSquare className="h-6 w-6" />}
          description={`৳${stats.revenue.toLocaleString()} platform revenue`}
        />
      </div>

      {/* Tabs Section for Managing Features */}
      <Tabs defaultValue="gears" className="space-y-6">
        <div className="overflow-x-auto pb-2 scrollbar-none">
          <TabsList className="bg-slate-100 p-1 rounded-2xl inline-flex w-auto min-w-full sm:min-w-0">
            <TabsTrigger value="gears" className="rounded-xl text-xs font-semibold px-4 py-2 whitespace-nowrap">
              Manage Gears ({gears.length})
            </TabsTrigger>
            <TabsTrigger value="rentals" className="rounded-xl text-xs font-semibold px-4 py-2 whitespace-nowrap">
              Rental Orders ({rentals.length})
            </TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-xl text-xs font-semibold px-4 py-2 whitespace-nowrap">
              Manage Reviews ({reviews.length})
            </TabsTrigger>
            <TabsTrigger value="users" className="rounded-xl text-xs font-semibold px-4 py-2 whitespace-nowrap">
              User Roles ({users.length})
            </TabsTrigger>
          </TabsList>
        </div>

        {/* 1. Manage Gears Tab */}
        <TabsContent value="gears" className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Gear Inventory</h2>
          {gears.length === 0 ? (
            <EmptyState
              icon={PackageOpen}
              title="No Gears on Platform"
              description="Gear items across all providers will be listed here."
            />
          ) : (
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <h3 className="text-lg font-bold text-slate-900">All Marketplace Gears</h3>
                <p className="text-sm text-slate-500 mt-0.5">
                  Stock, brand, category, and price per day for every listed item.
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/50 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      <th className="py-4 px-6">Gear Item</th>
                      <th className="py-4 px-6">Category</th>
                      <th className="py-4 px-6">Provider</th>
                      <th className="py-4 px-6">Stock</th>
                      <th className="py-4 px-6">Price/Day</th>
                      <th className="py-4 px-6 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {gears.slice(0, 10).map((gear) => (
                      <tr key={gear.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-3">
                            <div className="relative w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0">
                              {gear.image ? (
                                <Image src={gear.image} alt={gear.name} fill className="object-cover p-0.5" />
                              ) : (
                                <div className="h-full w-full flex items-center justify-center text-slate-300">
                                  <Package className="h-4 w-4" />
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="font-bold text-slate-900 text-sm">{gear.name}</p>
                              <p className="text-[10px] font-bold uppercase text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded w-fit mt-0.5">
                                {gear.brand}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-xs text-slate-600">
                          {gear.category?.name || "General"}
                        </td>
                        <td className="py-4 px-6 text-xs text-slate-600">
                          {gear.provider?.name || "N/A"}
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-xs font-bold text-slate-700">{gear.stock ?? 0}</span>
                        </td>
                        <td className="py-4 px-6 text-xs font-extrabold text-slate-900">
                          ৳{gear.pricePerDay}
                        </td>
                        <td className="py-4 px-6 text-right">{statusBadge(gear.available ?? false, gear.stock ?? 0)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {gears.length > 10 && (
                  <div className="p-4 text-center text-xs font-semibold text-slate-400 border-t border-slate-100">
                    Showing first 10 of {gears.length} gears
                  </div>
                )}
              </div>
            </div>
          )}
        </TabsContent>

        {/* 2. Rental Orders Tab */}
        <TabsContent value="rentals" className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">All Rental Orders</h2>
          {rentals.length === 0 ? (
            <EmptyState
              icon={ShoppingBag}
              title="No Rental Orders"
              description="All platform rental transactions will be tracked here."
            />
          ) : (
            <AdminRentalTable rentals={rentals} />
          )}
        </TabsContent>

        {/* 3. Manage Reviews Tab */}
        <TabsContent value="reviews" className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Platform Review Moderation</h2>
          {reviews.length === 0 ? (
            <EmptyState
              icon={MessageSquare}
              title="No Reviews Yet"
              description="Customer reviews across all gears will appear here for moderation."
            />
          ) : (
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Recent Customer Reviews</h3>
                  <p className="text-sm text-slate-500 mt-0.5">
                    As an admin, you have the authority to remove any inappropriate reviews across the platform.
                  </p>
                </div>
                <span className="text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200 px-3 py-1 rounded-full">
                  {reviews.length} total
                </span>
              </div>
              <div className="divide-y divide-slate-100">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
                  >
                    <div className="space-y-1.5 min-w-0 w-full sm:w-auto">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-900">
                          {review.customer?.name || "Customer"}
                        </span>
                        <span className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < (review.rating || 0)
                                  ? "text-amber-400 fill-amber-400"
                                  : "text-slate-200"
                              }`}
                            />
                          ))}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed break-words">
                        &quot;{review.comment || "No comment provided."}&quot;
                      </p>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded w-fit">
                        {review.gearItem?.name || "Gear item"}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteReview(review.id)}
                      disabled={deletingId === review.id}
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 px-3 py-2 text-xs font-semibold transition-colors shrink-0 disabled:opacity-60 cursor-pointer w-full sm:w-auto"
                    >
                      {deletingId === review.id ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="h-3.5 w-3.5" />
                      )}
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        {/* 4. Users Tab */}
        <TabsContent value="users" className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">User Management</h2>
          {users.length === 0 ? (
            <EmptyState
              icon={Users}
              title="No Users Found"
              description="Registered customers and providers will be listed here."
            />
          ) : (
            <AdminUsersList initialUsers={users} />
          )}
        </TabsContent>
      </Tabs>

      {/* Platform health strip */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full">
            <div className="h-11 w-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Activity className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-slate-900">Platform Overview</h3>
              <p className="text-xs text-slate-500 truncate">
                {gears.length} gears · {rentals.length} rentals · {users.length} users ·{" "}
                {stats.activeRentals} active rentals right now
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardContent;