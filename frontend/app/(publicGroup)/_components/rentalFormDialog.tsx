"use client";

import React, { useActionState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { createRental } from "../_actions/rentalActions";

interface RentalFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  gearItemId: string;
}

const RentalFormDialog = ({ isOpen, onClose, gearItemId }: RentalFormDialogProps) => {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(createRental, null);
  
  const isHandledRef = useRef(false);

  useEffect(() => {
    if (!state || isHandledRef.current) return;

    if (state.success) {
      isHandledRef.current = true;
      toast.success(state.message || "Rental created successfully!");
      onClose();
      
      router.push("/dashboard/my-rentals");
      router.refresh();
    } else {
      toast.error(state.message || "Failed to create rental");
    }
  }, [state, onClose, router]);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      isHandledRef.current = false;
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Complete Your Rental</DialogTitle>
          <DialogDescription>
            Provide the rental details below for Gear ID: <span className="font-mono text-xs text-primary">{gearItemId}</span>
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="space-y-4 mt-2">
          <input type="hidden" name="gearItemId" value={gearItemId} />

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              min={1}
              defaultValue={1}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              name="startDate"
              type="date"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              name="endDate"
              type="date"
              required
            />
          </div>

          <Button type="submit" className="w-full font-semibold mt-4" disabled={pending}>
            {pending ? "Processing..." : "Confirm Rental"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RentalFormDialog;