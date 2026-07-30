"use client";

import React, { useActionState, useEffect } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Package, CircleDollarSign, Ban } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cancleMyRental } from "../_actions/getRentals";

interface MyRentalCardProps {
  rental: {
    id: string;
    quantity: number;
    startDate: string;
    endDate: string;
    totalPrice: number;
    status: string;
    gearItem: {
      name: string;
      image: string;
      brand: string;
      pricePerDay: number;
    };
  };
}

const MyRentalCard = ({ rental }: MyRentalCardProps) => {
  const cancelRentalAction = cancleMyRental.bind(null, rental.id);
  const [state, formAction, isPending] = useActionState(
    cancelRentalAction,
    null,
  );

  useEffect(() => {
    if (state) {
      if (state.success) {
        toast.success(state.message || "Rental cancelled successfully!");
      } else {
        toast.error(state.message || "Failed to cancel rental.");
      }
    }
  }, [state]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

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

  const isCancellable =
    rental.status === "PENDING" ||
    rental.status === "CONFIRMED" ||
    rental.status === "PAID";

  return (
    <Card className="overflow-hidden border border-slate-100 shadow-md hover:shadow-lg transition-all rounded-2xl bg-white">
      <CardContent className="p-5">
        <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
          {/* Gear Image */}
          <div className="relative w-full sm:w-28 h-28 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0 flex items-center justify-center">
            <Image
              src={rental.gearItem.image || "/placeholder-image.svg"}
              alt={rental.gearItem.name}
              fill
              className="object-cover p-1"
            />
          </div>

          {/* Details */}
          <div className="flex-1 space-y-2 w-full text-center sm:text-left">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  {rental.gearItem.brand}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  {rental.gearItem.name}
                </h3>
              </div>
              <Badge
                className={`px-2.5 py-0.5 text-xs font-semibold border ${getStatusColor(rental.status)}`}
              >
                {rental.status}
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
              <div className="flex items-center justify-center sm:justify-start gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                <span>
                  {formatDate(rental.startDate)} - {formatDate(rental.endDate)}
                </span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-1.5">
                <Package className="h-3.5 w-3.5 text-slate-400" />
                <span>
                  Quantity: <b>{rental.quantity}</b> Unit(s)
                </span>
              </div>
            </div>

            {/* Price & Cancel Action Section */}
            <div className="flex flex-col sm:flex-row justify-between items-center pt-3 border-t border-slate-100 gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">
                  Total Cost:
                </span>
                <div className="flex items-center text-slate-900 font-extrabold text-base">
                  <CircleDollarSign className="h-4 w-4 text-emerald-600 mr-1" />
                  ৳{rental.totalPrice}
                </div>
              </div>

              {/* Cancel Rental Button & Dialog */}
              {isCancellable && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-xl border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700 text-xs font-semibold h-8 px-3 gap-1.5"
                    >
                      <Ban className="h-3.5 w-3.5" />
                      Cancel Rental
                    </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent className="rounded-3xl border-slate-100 p-6 shadow-2xl">
                    <form action={formAction}>
                      <AlertDialogHeader className="space-y-2">
                        <AlertDialogTitle className="text-xl font-bold text-slate-900">
                          Cancel Rental Request?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-sm text-slate-500 leading-relaxed">
                          Are you sure you want to cancel your rental for{" "}
                          <span className="font-semibold text-slate-800">
                            &quot;{rental.gearItem.name}&quot;
                          </span>
                          ? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter className="mt-6 gap-2 sm:gap-0">
                        <AlertDialogCancel className="rounded-2xl border-slate-200 text-slate-600 hover:bg-slate-50">
                          Keep Rental
                        </AlertDialogCancel>

                        <AlertDialogAction
                          type="submit"
                          disabled={isPending}
                          className="rounded-2xl bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-600/20"
                        >
                          {isPending ? "Cancelling..." : "Yes, Cancel Rental"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </form>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MyRentalCard;
