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
import { Package, Calendar } from "lucide-react";
import ProviderOrderActionCell from "./ProviderOrderActionCell";

interface OrderItem {
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
}

interface ProviderOrderTableProps {
  orders: OrderItem[];
}

const ProviderOrderTable = ({ orders }: ProviderOrderTableProps) => {
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

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-12 border border-dashed border-slate-200 rounded-2xl">
        <Package className="mx-auto h-10 w-10 text-slate-300 mb-2" />
        <p className="text-slate-500 font-medium">No rental orders found.</p>
      </div>
    );
  }

  return (
    <div className="border border-slate-100 rounded-2xl overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead className="font-bold">Gear Item</TableHead>
            <TableHead className="font-bold">Customer</TableHead>
            <TableHead className="font-bold">Rental Period</TableHead>
            <TableHead className="font-bold">Qty</TableHead>
            <TableHead className="font-bold">Status</TableHead>
            <TableHead className="font-bold text-right">Total</TableHead>
            <TableHead className="font-bold text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} className="hover:bg-slate-50/50 transition-colors">
              <TableCell>
                <div>
                  <span className="text-[10px] font-bold uppercase text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                    {order.gearItem?.brand}
                  </span>
                  <p className="font-semibold text-slate-900 mt-0.5">
                    {order.gearItem?.name}
                  </p>
                </div>
              </TableCell>

              <TableCell>
                <div className="text-slate-700">
                  <p className="font-medium">{order.customer?.name || "N/A"}</p>
                  <p className="text-xs text-slate-400">{order.customer?.email}</p>
                </div>
              </TableCell>

              <TableCell className="text-xs text-slate-600">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-slate-400" />
                  <span>
                    {formatDate(order.startDate)} - {formatDate(order.endDate)}
                  </span>
                </div>
              </TableCell>

              <TableCell className="font-semibold text-slate-700">
                {order.quantity}
              </TableCell>

              <TableCell>
                <Badge className={`px-2.5 py-0.5 text-xs font-semibold border ${getStatusColor(order.status)}`}>
                  {order.status}
                </Badge>
              </TableCell>

              <TableCell className="text-right font-extrabold text-slate-900">
                ৳{order.totalPrice}
              </TableCell>

              <TableCell className="text-center">
                <ProviderOrderActionCell orderId={order.id} status={order.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProviderOrderTable;