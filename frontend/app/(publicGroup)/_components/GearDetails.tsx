"use client";

import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Package,
  ShieldCheck,
  Tag,
  FolderTree,
  CircleDollarSign,
  User,
  Mail,
} from "lucide-react";

interface GearDetailsProps {
  gear: any;
  userRole?: string; 
  onRentClick: () => void;
}

const GearDetails = ({ gear, userRole, onRentClick }: GearDetailsProps) => {
  const normalizedRole = userRole?.toUpperCase();
  const canRent = normalizedRole === "CUSTOMER";
  const imageSrc =
    typeof gear?.image === "string" && gear.image && !gear.image.includes("example.com")
      ? gear.image
      : "/placeholder-image.svg";

  return (
    <div className="container mx-auto max-w-7xl px-4 py-10">
      <Card className="overflow-hidden rounded-3xl border-0 shadow-xl bg-white">
        <div className="grid lg:grid-cols-12 gap-0 items-center">
          {/* Image Area */}
          <div className="lg:col-span-5 relative h-[300px] sm:h-[380px] lg:h-[480px] w-full bg-slate-900/5 lg:m-6 lg:w-auto lg:rounded-2xl overflow-hidden flex items-center justify-center border border-slate-100">
            <Image
              src={imageSrc}
              alt={gear.name || "Gear image"}
              fill
              priority
              className="object-contain p-2"
            />
          </div>

          {/* Content Area */}
          <CardContent className="lg:col-span-7 space-y-6 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="px-3 py-1 text-xs">
                {gear.category?.name}
              </Badge>
              <Badge
                variant={gear.available ? "default" : "destructive"}
                className="px-3 py-1 text-xs"
              >
                {gear.available ? "Available" : "Unavailable"}
              </Badge>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                {gear.name}
              </h1>
              <p className="mt-2 flex items-center gap-2 text-sm text-slate-500 font-medium">
                <Tag className="h-4 w-4 text-primary" />
                {gear.brand}
              </p>
            </div>

            <Separator />

            <p className="text-sm leading-relaxed text-slate-600">
              {gear.description}
            </p>

            <div className="grid grid-cols-2 gap-3">
              <Card className="border-slate-100 bg-slate-50/50 shadow-none">
                <CardContent className="flex items-center gap-3 p-4">
                  <ShieldCheck className="h-6 w-6 text-blue-600 shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Condition</p>
                    <h3 className="text-xs sm:text-sm font-semibold text-slate-800">{gear.condition}</h3>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-100 bg-slate-50/50 shadow-none">
                <CardContent className="flex items-center gap-3 p-4">
                  <Package className="h-6 w-6 text-emerald-600 shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Stock</p>
                    <h3 className="text-xs sm:text-sm font-semibold text-slate-800">{gear.stock} Units</h3>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-100 bg-slate-50/50 shadow-none">
                <CardContent className="flex items-center gap-3 p-4">
                  <FolderTree className="h-6 w-6 text-orange-600 shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Category</p>
                    <h3 className="text-xs sm:text-sm font-semibold text-slate-800 truncate">{gear.category?.name}</h3>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-100 bg-slate-50/50 shadow-none">
                <CardContent className="flex items-center gap-3 p-4">
                  <CircleDollarSign className="h-6 w-6 text-purple-600 shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Price</p>
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                      ৳{gear.pricePerDay}
                      <span className="text-xs font-normal text-slate-500"> / day</span>
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </div>

            {gear.provider && (
              <Card className="border-slate-100 bg-slate-50/50 shadow-none">
                <CardHeader className="py-3 px-4">
                  <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Provider Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 pb-3 px-4 text-sm">
                  <div className="flex items-center gap-2.5 text-slate-700">
                    <User className="h-4 w-4 text-primary" />
                    <span className="font-medium">{gear.provider.name}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-700">
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="font-medium">{gear.provider.email}</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {canRent && (
              <Button
                className="h-11 w-full text-sm font-semibold shadow-md transition-all"
                disabled={!gear.available}
                onClick={onRentClick}
              >
                {gear.available ? "Rent Now" : "Currently Unavailable"}
              </Button>
            )}

            {userRole && !canRent && (
              <p className="text-xs text-center text-slate-500 font-medium italic">
                Only customers can rent gear.
              </p>
            )}
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default GearDetails;