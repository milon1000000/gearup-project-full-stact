import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Package, ShieldCheck, Tag } from "lucide-react";
import Link from "next/link";
import { isValidImageUrl } from "@/lib/utils";

type GearCardProps = {
  gear: {
    id?: string;
    image?: string;
    name?: string;
    category?: { name?: string };
    available?: boolean;
    brand?: string;
    description?: string;
    condition?: string;
    stock?: number;
    pricePerDay?: number;
  };
};

const GearCard = ({ gear }: GearCardProps) => {
  const imageSrc = isValidImageUrl(gear.image)
    ? gear.image!
    : "/placeholder-image.svg";

  return (
    <Card className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl w-full">
      {/* Top Accent Line matching your reference layout */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-blue-600 via-sky-500 to-emerald-500" />

      {/* Compact Header Image Area */}
      <div className="relative h-40 overflow-hidden bg-slate-50 mt-1.5">
        <Image
          src={imageSrc}
          alt={gear.name || "Gear image"}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {gear.category?.name && (
          <Badge variant="secondary" className="absolute left-3 top-3 bg-white/90 text-slate-700 backdrop-blur-md text-[11px] px-2.5 py-0.5 shadow-sm">
            {gear.category.name}
          </Badge>
        )}

        <Badge
          className={`absolute right-3 top-3 backdrop-blur-md text-[11px] px-2.5 py-0.5 shadow-sm ${
            gear.available
              ? "bg-emerald-600/90 text-white hover:bg-emerald-600"
              : "bg-rose-600/90 text-white hover:bg-rose-600"
          }`}
        >
          {gear.available ? "Available" : "Unavailable"}
        </Badge>
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col justify-between space-y-3.5 p-5">
        <div className="space-y-1">
          <h3 className="line-clamp-1 text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
            {gear.name}
          </h3>
          <p className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
            <Tag className="h-3.5 w-3.5 text-blue-500" />
            {gear.brand}
          </p>
        </div>

        <p className="line-clamp-2 text-xs text-slate-500 leading-relaxed">
          {gear.description}
        </p>

        {/* Condition & Stock Specs Box */}
        <div className="grid grid-cols-2 gap-2 rounded-2xl bg-slate-50/70 p-2.5 border border-slate-100">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-blue-600 shrink-0" />
            <div className="overflow-hidden">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                Condition
              </p>
              <p className="text-xs font-semibold text-slate-700 truncate">{gear.condition}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-emerald-600 shrink-0" />
            <div className="overflow-hidden">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                Stock
              </p>
              <p className="text-xs font-semibold text-slate-700 truncate">{gear.stock} units</p>
            </div>
          </div>
        </div>

        {/* Footer Pricing and Action */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-auto">
          <div>
            <p className="text-xl font-extrabold tracking-tight text-slate-900">
              ৳{gear.pricePerDay}
              <span className="text-[11px] font-normal text-slate-500"> /day</span>
            </p>
          </div>

          <Button asChild className="rounded-xl px-4 py-2 text-xs font-medium bg-blue-600 hover:bg-blue-700 shadow-sm">
            <Link href={`/gear/${gear.id}`}>View Details</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default GearCard;