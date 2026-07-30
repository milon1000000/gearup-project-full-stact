"use client";

import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
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
import { updateRentalStatus } from "../_actions/getProviderRentalOrdersAction";
import { Loader2 } from "lucide-react";

interface ActionCellProps {
  orderId: string;
  status: string;
}

const ProviderOrderActionCell = ({ orderId, status }: ActionCellProps) => {
  const [isPending, startTransition] = useTransition();

  const handleConfirm = () => {
    startTransition(async () => {
      await updateRentalStatus(orderId);
    });
  };

  return (
    <div className="flex items-center justify-center gap-2">
      {status === "PENDING" ? (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              size="sm"
              className="rounded-xl text-xs h-8 bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Confirm Order
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="rounded-3xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl font-bold text-slate-900">
                Are you sure you want to confirm?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-slate-500">
                This action will change the order status to CONFIRMED and notify the customer.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleConfirm}
                disabled={isPending}
                className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {isPending && <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />}
                Yes, Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <Button variant="outline" size="sm" className="rounded-xl text-xs h-8" disabled>
          {status}
        </Button>
      )}
    </div>
  );
};

export default ProviderOrderActionCell;