"use client";

import React, { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Package,
  ShoppingBag,
  DollarSign,
  Clock,
  Store,
  Mail,
  ShieldCheck,
  PackageOpen,
  Plus,
  ArrowRight,
  Calendar,
  CircleDollarSign,
  CheckCircle2,
  History,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ProviderCard from "./ProviderCard";
import ProviderOrderTable from "./ProviderOrderTable";

const ACTIVE_STATUSES = ["CONFIRMED", "PAID", "PICKED_UP"];

type OrderData = {
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
  gearItem: {
    name: string;
    brand: string;
  };
};

type GearData = {
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
};

type DashboardProps = {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  } | null;
  gears: GearData[];
  orders: OrderData[];
};

const EmptyState = ({
  icon: Icon,
  title,
  description,
  href,
  linkLabel,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
}) => (
  <div className="text-center py-14 bg-white rounded-3xl border border-slate-100 shadow-sm">
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 text-slate-300 mb-4">
      <Icon className="h-8 w-8" />
    </div>
    <h3 className="text-lg font-bold text-slate-900">{title}</h3>
    <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">{description}</p>
    {href && linkLabel && (
      <Link href={href} className="inline-flex items-center gap-1.5 mt-4 text-xs font-bold text-emerald-600 hover:text-emerald-700">
        {linkLabel} <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    )}
  </div>
);

const ProviderDashboardContent = ({ user, gears, orders }: DashboardProps) => {
  const stats = useMemo(() => {
    const activeRentals = orders.filter((o) => ACTIVE_STATUSES.includes(o.status));
    const pendingRequests = orders.filter((o) => o.status === "PENDING");
    const earnings = orders
      .filter((o) => o.status !== "CANCELLED")
      .reduce((sum, o) => sum + (o.totalPrice || 0), 0);

    return { activeRentals, pendingRequests, earnings };
  }, [orders]);

  // PENDING orders first for quick action
  const sortedOrders = useMemo(() => {
    const priority: Record<string, number> = {
      PENDING: 0,
      PAID: 1,
      CONFIRMED: 2,
      PICKED_UP: 3,
      RETURNED: 4,
      CANCELLED: 5,
    };
    return [...orders].sort(
      (a, b) => (priority[a.status] ?? 9) - (priority[b.status] ?? 9),
    );
  }, [orders]);

  const historyOrders = orders.filter((o) =>
    ["RETURNED", "CANCELLED"].includes(o.status),
  );

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div className="container mx-auto max-w-7xl px-4 py-10 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl font-bold shadow-md shadow-blue-600/30 shrink-0">
            {user?.name ? user.name.charAt(0).toUpperCase() : <Store className="h-8 w-8" />}
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-400">
              Provider Panel
            </p>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {user?.name || "Provider"} 🛠️
            </h1>
            <p className="text-sm text-slate-400 flex items-center justify-center sm:justify-start gap-1.5">
              <Mail className="h-3.5 w-3.5 text-blue-400" />
              {user?.email || "provider@gearup.com"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2.5 rounded-2xl">
          <ShieldCheck className="h-4 w-4 text-blue-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-white">
            Role: {user?.role || "PROVIDER"}
          </span>
        </div>
      </div>

      {/* Stats Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ProviderCard
          title="Total Listed Gears"
          value={gears.length}
          icon={<Package className="h-6 w-6" />}
          description="Active in marketplace"
        />
        <ProviderCard
          title="Active Rentals"
          value={stats.activeRentals.length}
          icon={<ShoppingBag className="h-6 w-6" />}
          description="Currently rented out"
        />
        <ProviderCard
          title="Pending Requests"
          value={stats.pendingRequests.length}
          icon={<Clock className="h-6 w-6" />}
          description="Requires your approval"
        />
        <ProviderCard
          title="Total Earnings"
          value={`৳${stats.earnings.toLocaleString()}`}
          icon={<DollarSign className="h-6 w-6" />}
          description="Lifetime revenue"
        />
      </div>

      {/* Tabs Section for Provider Management */}
      <Tabs defaultValue="my-gears" className="space-y-6">
        <TabsList className="bg-slate-100 p-1 rounded-2xl flex-wrap">
          <TabsTrigger value="my-gears" className="rounded-xl text-xs font-semibold px-4 py-2">
            My Gears ({gears.length})
          </TabsTrigger>
          <TabsTrigger value="rentals" className="rounded-xl text-xs font-semibold px-4 py-2">
            Rental Requests ({orders.length})
          </TabsTrigger>
          <TabsTrigger value="history" className="rounded-xl text-xs font-semibold px-4 py-2">
            Rental History ({historyOrders.length})
          </TabsTrigger>
        </TabsList>

        {/* 1. My Gears Tab */}
        <TabsContent value="my-gears" className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h2 className="text-lg font-bold text-slate-900">Your Equipment Inventory</h2>
            <Link href="/my-gear">
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 transition-colors shadow-lg shadow-emerald-600/20">
                <Plus className="h-4 w-4" /> Manage Gears
              </span>
            </Link>
          </div>

          {gears.length === 0 ? (
            <EmptyState
              icon={PackageOpen}
              title="No Gears Listed"
              description="You haven't added any gear items yet. List your equipment to start earning."
              href="/my-gear"
              linkLabel="List Your First Gear"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {gears.slice(0, 6).map((gear) => (
                <div
                  key={gear.id}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition-all"
                >
                  <div className="relative w-20 h-20 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0">
                    {gear.image ? (
                      <Image src={gear.image} alt={gear.name} fill className="object-cover p-1" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-slate-300">
                        <Package className="h-6 w-6" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                      {gear.brand}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 truncate">
                      {gear.name}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {gear.category?.name || "General"} · ৳{gear.pricePerDay}/day
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                          (gear.stock ?? 0) > 0
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-rose-50 text-rose-700 border-rose-200"
                        }`}
                      >
                        <CheckCircle2 className="h-3 w-3" />
                        {(gear.stock ?? 0) > 0 ? "Available" : "Out of Stock"}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400">
                        Stock: {gear.stock ?? 0}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {gears.length > 6 && (
                <Link
                  href="/my-gear"
                  className="bg-slate-50 rounded-2xl border border-dashed border-slate-200 p-4 flex items-center justify-center text-xs font-bold text-slate-500 hover:text-emerald-600 hover:border-emerald-300 transition-colors"
                >
                  View all {gears.length} gears <ArrowRight className="h-4 w-4 ml-1.5" />
                </Link>
              )}
            </div>
          )}
        </TabsContent>

        {/* 2. Rental Requests Tab */}
        <TabsContent value="rentals" className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Incoming Rental Requests</h2>
          {orders.length === 0 ? (
            <EmptyState
              icon={Clock}
              title="No Rental Requests"
              description="Customer bookings will appear here for your confirmation once they rent your gear."
            />
          ) : (
            <ProviderOrderTable orders={sortedOrders} />
          )}
        </TabsContent>

        {/* 3. Rental History Tab */}
        <TabsContent value="history" className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Completed & Cancelled Rentals</h2>
          {historyOrders.length === 0 ? (
            <EmptyState
              icon={History}
              title="No Rental History"
              description="History of returned gears and past earnings will be displayed here."
            />
          ) : (
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="divide-y divide-slate-100">
                {historyOrders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 flex items-center justify-between flex-wrap gap-3 hover:bg-slate-50/60 transition-colors"
                  >
                    <div className="space-y-0.5">
                      <h4 className="text-sm font-bold text-slate-900">
                        {order.gearItem?.name}
                      </h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1.5">
                        <Calendar className="h-3 w-3 text-slate-400" />
                        {formatDate(order.startDate)} - {formatDate(order.endDate)}
                        <span className="mx-1 text-slate-200">|</span>
                        {order.customer?.name || "N/A"}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center text-slate-900 font-extrabold text-sm">
                        <CircleDollarSign className="h-4 w-4 text-emerald-600 mr-1" />
                        ৳{order.totalPrice}
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
                          order.status === "RETURNED"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : "bg-rose-50 text-rose-700 border-rose-200"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Quick action strip */}
      <Card className="border-slate-100 shadow-sm rounded-3xl bg-white p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Package className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Boost your inventory
              </h3>
              <p className="text-xs text-slate-500">
                Add more gear to reach more customers and grow your earnings.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/provider-dashboard/rental-orders">
              <Button variant="outline" size="sm" className="rounded-xl text-xs h-9">
                View All Orders
              </Button>
            </Link>
            <Link href="/my-gear">
              <Button size="sm" className="rounded-xl text-xs h-9 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold gap-1.5">
                <Plus className="h-4 w-4" /> Add Gear
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProviderDashboardContent;
