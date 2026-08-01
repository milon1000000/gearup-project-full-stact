"use client";

import React, { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ShoppingBag,
  Clock,
  CheckCircle2,
  Wallet,
  User,
  Mail,
  ShieldCheck,
  PackageOpen,
  ReceiptText,
  ArrowRight,
  Star,
} from "lucide-react";
import Link from "next/link";
import UserPageCard from "./UserPageCard";
import MyRentalCard from "./MyRentalCard";
import { MyPaymentCard } from "@/app/(publicGroup)/_components/MyPaymentCard";

const ACTIVE_STATUSES = ["CONFIRMED", "PAID", "PICKED_UP"];

type RentalCardData = {
  id: string;
  quantity: number;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: string;
  gearItem: {
    id: string;
    name: string;
    image: string;
    brand: string;
    pricePerDay: number;
  };
};

type PaymentCardData = {
  id: string;
  transactionId: string;
  amount: number;
  provider: string;
  method: string;
  status: string;
  paidAt: string;
  customer?: {
    name: string;
    email: string;
  };
  rentalOrder: {
    quantity: number;
    startDate: string;
    endDate: string;
    totalPrice: number;
    gearItem: {
      name: string;
      image: string;
      brand: string;
      pricePerDay: number;
    };
  };
};

type DashboardProps = {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    phone?: string | null;
    profileImage?: string | null;
  } | null;
  rentals: RentalCardData[];
  payments: PaymentCardData[];
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

const UserDashboardContent = ({ user, rentals, payments }: DashboardProps) => {
  const stats = useMemo(() => {
    const active = rentals.filter((r) => ACTIVE_STATUSES.includes(r.status));
    const pending = rentals.filter((r) => r.status === "PENDING");
    const completed = rentals.filter((r) => r.status === "RETURNED");
    const cancelled = rentals.filter((r) => r.status === "CANCELLED");
    const totalSpent = payments
      .filter((p) => p.status === "COMPLETED")
      .reduce((sum, p) => sum + (p.amount || 0), 0);

    return { active, pending, completed, cancelled, totalSpent };
  }, [rentals, payments]);

  const userName = user?.name || "User";
  const userEmail = user?.email || "user@gearup.com";
  const userRole = user?.role || "CUSTOMER";

  return (
    <div className="container mx-auto max-w-7xl px-4 py-10 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-2xl font-bold shadow-md shadow-emerald-600/30 shrink-0">
            {user?.profileImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.profileImage}
                alt={userName}
                className="h-full w-full object-cover rounded-2xl"
              />
            ) : user?.name ? (
              userName.charAt(0).toUpperCase()
            ) : (
              <User className="h-8 w-8" />
            )}
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
              Welcome back
            </p>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {userName} 👋
            </h1>
            <p className="text-sm text-slate-400 flex items-center justify-center sm:justify-start gap-1.5">
              <Mail className="h-3.5 w-3.5 text-emerald-400" />
              {userEmail}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2.5 rounded-2xl">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-white">
            Role: {userRole}
          </span>
        </div>
      </div>

      {/* Stats Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <UserPageCard
          title="Active Rentals"
          value={stats.active.length}
          icon={<ShoppingBag className="h-6 w-6" />}
          description="Currently in use"
        />
        <UserPageCard
          title="Pending Bookings"
          value={stats.pending.length}
          icon={<Clock className="h-6 w-6" />}
          description="Waiting for approval"
        />
        <UserPageCard
          title="Completed Rentals"
          value={stats.completed.length}
          icon={<CheckCircle2 className="h-6 w-6" />}
          description="Total past orders"
        />
        <UserPageCard
          title="Total Spent"
          value={`৳${stats.totalSpent.toLocaleString()}`}
          icon={<Wallet className="h-6 w-6" />}
          description="Across all payments"
        />
      </div>

      {/* Tabs Section for User Activity */}
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="bg-slate-100 p-1 rounded-2xl flex-wrap">
          <TabsTrigger value="active" className="rounded-xl text-xs font-semibold px-4 py-2">
            Active Rentals ({stats.active.length})
          </TabsTrigger>
          <TabsTrigger value="requests" className="rounded-xl text-xs font-semibold px-4 py-2">
            Booking Requests ({stats.pending.length})
          </TabsTrigger>
          <TabsTrigger value="history" className="rounded-xl text-xs font-semibold px-4 py-2">
            Rental History ({rentals.length})
          </TabsTrigger>
          <TabsTrigger value="payments" className="rounded-xl text-xs font-semibold px-4 py-2">
            Payments ({payments.length})
          </TabsTrigger>
        </TabsList>

        {/* 1. Active Rentals Tab */}
        <TabsContent value="active" className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Current Equipment Rented</h2>
          {stats.active.length === 0 ? (
            <EmptyState
              icon={PackageOpen}
              title="No Active Rentals"
              description="You don't have any gear in use right now. Browse the marketplace and rent your next equipment."
              href="/gear"
              linkLabel="Browse Gears"
            />
          ) : (
            <div className="space-y-4">
              {stats.active.map((rental) => (
                <MyRentalCard key={rental.id} rental={rental} />
              ))}
            </div>
          )}
        </TabsContent>

        {/* 2. Booking Requests Tab */}
        <TabsContent value="requests" className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Pending Requests</h2>
          {stats.pending.length === 0 ? (
            <EmptyState
              icon={Clock}
              title="No Pending Requests"
              description="You have no bookings waiting for provider approval. Once providers confirm, they'll appear here."
            />
          ) : (
            <div className="space-y-4">
              {stats.pending.map((rental) => (
                <MyRentalCard key={rental.id} rental={rental} />
              ))}
            </div>
          )}
        </TabsContent>

        {/* 3. Rental History Tab */}
        <TabsContent value="history" className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Past Orders</h2>
          {rentals.length === 0 ? (
            <EmptyState
              icon={PackageOpen}
              title="No Rental History"
              description="Your completed gear rentals will show up here once you start renting."
              href="/gear"
              linkLabel="Explore Gears"
            />
          ) : (
            <div className="space-y-4">
              {rentals.map((rental) => (
                <MyRentalCard key={rental.id} rental={rental} />
              ))}
            </div>
          )}
        </TabsContent>

        {/* 4. Payments Tab */}
        <TabsContent value="payments" className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-lg font-bold text-slate-900">My Transactions</h2>
            <Link
              href="/my-payment"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700"
            >
              View all payments <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          {payments.length === 0 ? (
            <EmptyState
              icon={ReceiptText}
              title="No Payments Yet"
              description="Transactions you make for confirmed rentals will appear here."
              href="/gear"
              linkLabel="Start Renting"
            />
          ) : (
            <div className="space-y-4">
              {payments.slice(0, 5).map((payment) => (
                <MyPaymentCard key={payment.id} payment={payment} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Quick actions strip */}
      <Card className="border-slate-100 shadow-sm rounded-3xl bg-white p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Star className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Loved a gear you rented?
              </h3>
              <p className="text-xs text-slate-500">
                Rate your rental experience and help other creators choose better.
              </p>
            </div>
          </div>
          <Link href="/dashboard/my-rentals">
            <span className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-5 py-2.5 transition-colors shadow-lg shadow-emerald-600/20">
              Manage My Rentals <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default UserDashboardContent;
