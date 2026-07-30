"use client";

import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";
import { createGear, updateGearItem } from "../_actions/myGearActions";
import { IGearItem } from "@/lib/type";

type GearFormDialogProps = {
  categoryId?: string;
  gear?: IGearItem; // Edit-er jonno gear item pass kora hobe
  trigger?: React.ReactNode; // Custom trigger (jemon Edit button)
};

export default function GearFormDialog({
  categoryId,
  gear,
  trigger,
}: GearFormDialogProps) {
  const [open, setOpen] = useState(false);
  const isEditing = !!gear;

  // Jodi edit hoy tahole updateGearItem, nahole createGear action use hobe
  const actionToUse = isEditing ? updateGearItem : createGear;
  const [state, action, pending] = useActionState(actionToUse, null);

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message || (isEditing ? "Gear updated successfully!" : "Gear created successfully!"));
      setOpen(false);
    } else {
      toast.error(state.message || "Something went wrong!");
    }
  }, [state, isEditing]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Gear
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Gear Item" : "Create Gear Item"}</DialogTitle>
        </DialogHeader>

        <form action={action} className="space-y-5">
          {isEditing && <input type="hidden" name="id" value={gear.id} />}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Name</Label>
              <Input
                name="name"
                defaultValue={gear?.name || ""}
                placeholder="400 Person Camping Tent"
                required
              />
            </div>

            <div>
              <Label>Brand</Label>
              <Input
                name="brand"
                defaultValue={gear?.brand || ""}
                placeholder="NatureHike"
                required
              />
            </div>
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              name="description"
              defaultValue={gear?.description || ""}
              placeholder="Waterproof camping tent..."
              className="min-h-28"
              required
            />
          </div>

          <div>
            <Label>Image URL</Label>
            <Input
              name="image"
              type="url"
              defaultValue={gear?.image || ""}
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Condition</Label>
              <Input
                name="condition"
                defaultValue={gear?.condition || ""}
                placeholder="Excellent"
                required
              />
            </div>

            <div>
              <Label>Category ID</Label>
              <Input
                value={categoryId || gear?.categoryId || ""}
                readOnly
                disabled
              />
              <input
                type="hidden"
                name="categoryId"
                value={categoryId || gear?.categoryId || ""}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Price Per Day</Label>
              <Input
                name="pricePerDay"
                type="number"
                defaultValue={gear?.pricePerDay || ""}
                placeholder="850"
                required
              />
            </div>

            <div>
              <Label>Stock</Label>
              <Input
                name="stock"
                type="number"
                defaultValue={gear?.stock || ""}
                placeholder="4"
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={pending}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={pending}>
              {pending ? (isEditing ? "Updating..." : "Creating...") : (isEditing ? "Update Gear" : "Create Gear")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}