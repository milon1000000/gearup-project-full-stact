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
import { PencilIcon, PlusIcon } from "lucide-react";
import { toast } from "sonner";
import { createCategory } from "../_actions/myCategoryActions";

type Category = {
  id: string;
  name: string;
  description: string;
};

type CategoryFormDialogProps = {
  mode: "create" | "edit";
  category?: Category;
};

export default function CategoryFormDialog({
  mode,
  category,
}: CategoryFormDialogProps) {
  const [open, setOpen] = useState(false);

  const [state, action, pending] = useActionState(
    createCategory,
    null
  );

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message || "Category created successfully");
      setOpen(false);
    } else {
      toast.error(state.message || "Failed to create category");
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === "edit" ? (
          <Button variant="outline" size="sm">
            <PencilIcon className="mr-2 h-4 w-4" />
            Edit
          </Button>
        ) : (
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" />
            Create Category
          </Button>
        )}
      </DialogTrigger>

      {/* sm:max-w-lg এবং overflow-hidden যোগ করা হয়েছে যাতে বক্সের বাইরে না যায় */}
      <DialogContent className="sm:max-w-lg w-full overflow-hidden">
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "Edit Category" : "Create Category"}
          </DialogTitle>
        </DialogHeader>

        <form action={action} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Category Name</Label>
            {/* w-full ক্লাসটি যোগ করা হয়েছে */}
            <Input
              id="name"
              name="name"
              defaultValue={category?.name}
              placeholder="Enter category name"
              className="w-full"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            {/* w-full এবং resize-none যোগ করা হয়েছে যাতে ডিজাইন ভেঙে না যায় */}
            <Textarea
              id="description"
              name="description"
              defaultValue={category?.description}
              placeholder="Write category description..."
              className="w-full min-h-32 resize-none"
              required
            />
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
              {pending ? "Creating..." : "Create Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}