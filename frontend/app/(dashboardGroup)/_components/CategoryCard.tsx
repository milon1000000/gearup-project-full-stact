"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

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

import { Calendar, FolderOpen, Trash2 } from "lucide-react";

import CategoryFormDialog from "./CategoryFormDialog";
import { deleteCategory } from "../_actions/myCategoryActions";

const initialState = {
  success: false,
  statusCode: 0,
  message: "",
  data: null,
};

export default function CategoryCard({
  category,
  user,
}: {
  category: any;
  user: any;
}) {
  const [deleteState, deleteAction, pending] = useActionState(
    deleteCategory,
    initialState
  );

  useEffect(() => {
    if (!deleteState?.message) return;

    if (deleteState.success) {
      toast.success(deleteState.message || "Category deleted successfully");
    } else {
      toast.error(deleteState.message || "Failed to delete category");
    }
  }, [deleteState]);

  const isAdmin = user?.data?.role === "ADMIN";

  return (
    <Card className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="h-2 bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500" />

      <CardContent className="space-y-5 p-6">
        <div className="flex items-start justify-between">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <FolderOpen className="h-7 w-7" />
          </div>

          {isAdmin && (
            <div className="flex items-center gap-2">
              <CategoryFormDialog
                mode="edit"
                category={category}
              />

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-red-500 hover:bg-red-100 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Delete Category?
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                      Are you sure you want to delete{" "}
                      <span className="font-semibold">
                        "{category.name}"
                      </span>
                      ? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <form action={deleteAction}>
                    <input
                      type="hidden"
                      name="id"
                      value={category.id}
                    />

                    <AlertDialogFooter>
                      <AlertDialogCancel>
                        Cancel
                      </AlertDialogCancel>

                      <AlertDialogAction asChild>
                        <Button
                          type="submit"
                          variant="destructive"
                          disabled={pending}
                        >
                          {pending ? "Deleting..." : "Delete"}
                        </Button>
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </form>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>

        <div>
          <h3 className="text-xl font-bold">{category.name}</h3>

          <Badge
            variant="secondary"
            className="mt-2"
          >
            Category
          </Badge>

          <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">
            {category.description}
          </p>
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {formatDate(category.createdAt)}
          </div>

          <Badge
            variant="outline"
            className="border-green-500 text-green-600"
          >
            Active
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}