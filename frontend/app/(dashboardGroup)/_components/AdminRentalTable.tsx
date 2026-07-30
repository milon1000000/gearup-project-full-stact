import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, Calendar, User, ShieldCheck } from "lucide-react";

interface AdminRentalItem {
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
}

interface AdminRentalTableProps {
  rentals: AdminRentalItem[];
}

const AdminRentalTable = ({ rentals }: AdminRentalTableProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "CONFIRMED":
      case "PAID":
      case "PICKED_UP":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "RETURNED":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "CANCELLED":
        return "bg-rose-100 text-rose-800 border-rose-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (!rentals || rentals.length === 0) {
    return (
      <div className="text-center py-16 border border-dashed border-slate-200 rounded-3xl bg-white shadow-sm">
        <Package className="mx-auto h-12 w-12 text-slate-300 mb-3" />
        <h3 className="text-base font-semibold text-slate-700">No rentals found</h3>
        <p className="text-sm text-slate-400 mt-1">There are no rental records available in the system yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100">
        <h3 className="text-lg font-bold text-slate-900">Platform Rental Transactions</h3>
        <p className="text-sm text-slate-500 mt-0.5">
          Monitor all gear rentals, track statuses, and view customer-provider mappings.
        </p>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-50/75">
            <TableRow>
              <TableHead className="font-bold text-slate-700">Gear Item</TableHead>
              <TableHead className="font-bold text-slate-700">Customer</TableHead>
              <TableHead className="font-bold text-slate-700">Provider</TableHead>
              <TableHead className="font-bold text-slate-700">Rental Period</TableHead>
              <TableHead className="font-bold text-slate-700">Status</TableHead>
              <TableHead className="font-bold text-slate-700 text-right">Total</TableHead>
              <TableHead className="font-bold text-slate-700 text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rentals.map((rental) => (
              <TableRow key={rental.id} className="hover:bg-slate-50/50 transition-colors">
                <TableCell>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                      {rental.gearItem?.brand}
                    </span>
                    <p className="font-semibold text-slate-900 mt-0.5">
                      {rental.gearItem?.name}
                    </p>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="text-slate-700">
                    <p className="font-medium flex items-center gap-1">
                      <User className="h-3 w-3 text-slate-400" />
                      {rental.customer?.name || "N/A"}
                    </p>
                    <p className="text-xs text-slate-400">{rental.customer?.email}</p>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="text-slate-700">
                    <p className="font-medium flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3 text-emerald-500" />
                      {rental.provider?.name || "N/A"}
                    </p>
                    <p className="text-xs text-slate-400">{rental.provider?.email}</p>
                  </div>
                </TableCell>

                <TableCell className="text-xs text-slate-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-slate-400" />
                    <span>
                      {formatDate(rental.startDate)} - {formatDate(rental.endDate)}
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  <Badge className={`px-2.5 py-0.5 text-xs font-semibold border ${getStatusColor(rental.status)}`}>
                    {rental.status}
                  </Badge>
                </TableCell>

                <TableCell className="text-right font-extrabold text-slate-900">
                  ৳{rental.totalPrice}
                </TableCell>

                <TableCell className="text-center">
                  <Button variant="outline" size="sm" className="rounded-xl text-xs h-8">
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminRentalTable;