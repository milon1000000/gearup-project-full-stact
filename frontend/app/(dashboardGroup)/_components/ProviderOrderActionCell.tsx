"use client";

import React, { useActionState } from "react";
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
import { Loader2 } from "lucide-react";
import {
  updateRentalReturn,
  updateRentalStatus,
} from "../_actions/getProviderRentalOrdersAction";
import { useRouter } from "next/navigation";

interface ActionCellProps {
  orderId: string;
  status: string;
}

const ProviderOrderActionCell = ({ orderId, status }: ActionCellProps) => {
  const router = useRouter();

  // ১. PAID থেকে RETURNED করার জন্য অ্যাকশন
  const [returnState, returnFormAction, isReturnPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      const result = await updateRentalReturn(orderId);
      if (result?.success) {
        router.refresh();
      }
      return result;
    },
    null,
  );

  // ২. PENDING থেকে CONFIRMED করার জন্য অ্যাকশন
  const [confirmState, confirmFormAction, isConfirmPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      const result = await updateRentalStatus(orderId);
      if (result?.success) {
        router.refresh();
      }
      return result;
    },
    null,
  );

  return (
    <div className="flex items-center justify-center gap-2">
      {status === "PAID" ? (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              size="sm"
              className="rounded-xl text-xs h-8 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold gap-1.5"
            >
              <span>{status}</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="rounded-3xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl font-bold text-slate-900">
                Mark this order as Returned?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-slate-500">
                This action will change the order status to RETURNED once the
                gear is received back.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="rounded-xl">
                Cancel
              </AlertDialogCancel>
              <form action={returnFormAction}>
                <AlertDialogAction
                  type="submit"
                  disabled={isReturnPending}
                  className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white w-full"
                >
                  {isReturnPending && (
                    <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                  )}
                  Yes, Return
                </AlertDialogAction>
              </form>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : status === "PENDING" ? (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              size="sm"
              className="rounded-xl text-xs h-8 bg-amber-600 hover:bg-amber-700 text-white font-semibold"
            >
              <span>{status}</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="rounded-3xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl font-bold text-slate-900">
                Confirm this rental order?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-slate-500">
                This action will update the order status to CONFIRMED.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="rounded-xl">
                Cancel
              </AlertDialogCancel>
              <form action={confirmFormAction}>
                <AlertDialogAction
                  type="submit"
                  disabled={isConfirmPending}
                  className="rounded-xl bg-amber-600 hover:bg-amber-700 text-white w-full"
                >
                  {isConfirmPending && (
                    <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                  )}
                  Yes, Confirm
                </AlertDialogAction>
              </form>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <Button variant="outline" size="sm" className="rounded-xl text-xs h-8">
          {status}
        </Button>
      )}
    </div>
  );
};

export default ProviderOrderActionCell;
