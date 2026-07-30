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

import { Calendar, FolderKanban, Trash2 } from "lucide-react";

import CategoryFormDialog from "../../(dashboardGroup)/_components/CategoryFormDialog";
import { deleteCategory } from "../../(dashboardGroup)/_actions/myCategoryActions";
import GearFormDialog from "../../(dashboardGroup)/_components/GearFormDialog";

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
  const isProvider = user?.data?.role === "PROVIDER";

  return (
    <Card className="group relative overflow-hidden rounded-3xl border border-slate-100/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-emerald-100">
      {/* টপ মডার্ন গ্রেডিয়েন্ট স্ট্রিপ */}
      <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 opacity-90 group-hover:opacity-100 transition-opacity" />

      <CardContent className="p-6 space-y-6">
        {/* টপ সেকশন: আইকন এবং একশন বাটনস */}
        <div className="flex items-start justify-between">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50/80 text-emerald-600 border border-emerald-100/60 group-hover:bg-emerald-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-emerald-600/20 transition-all duration-300">
            <FolderKanban className="h-6 w-6" />
          </div>

          <div className="flex items-center gap-1.5 bg-slate-50/80 p-1.5 rounded-2xl border border-slate-100 shadow-sm">
            {isProvider && (
              <GearFormDialog categoryId={category.id} />
            )}

            {isAdmin && (
              <>
                <CategoryFormDialog
                  mode="edit"
                  category={category}
                />

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent className="rounded-3xl border-slate-100 p-6 shadow-2xl">
                    <AlertDialogHeader className="space-y-2">
                      <AlertDialogTitle className="text-xl font-bold text-slate-900">
                        Delete Category?
                      </AlertDialogTitle>

                      <AlertDialogDescription className="text-sm text-slate-500 leading-relaxed">
                        Are you sure you want to permanently delete{" "}
                        <span className="font-semibold text-slate-800">
                          &quot;{category.name}&quot;
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

                      <AlertDialogFooter className="mt-6 gap-2 sm:gap-0">
                        <AlertDialogCancel className="rounded-2xl border-slate-200 text-slate-600 hover:bg-slate-50">
                          Cancel
                        </AlertDialogCancel>

                        <AlertDialogAction asChild>
                          <Button
                            type="submit"
                            variant="destructive"
                            disabled={pending}
                            className="rounded-2xl bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-600/20"
                          >
                            {pending ? "Deleting..." : "Yes, Delete"}
                          </Button>
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </form>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            )}
          </div>
        </div>

        {/* মিডল সেকশন: টাইটেল ও ডেসক্রিপশন */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-emerald-700 transition-colors">
              {category.name}
            </h3>
            <Badge
              variant="secondary"
              className="px-2.5 py-0.5 text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100/50"
            >
              Category
            </Badge>
          </div>

          <p className="line-clamp-2 text-sm text-slate-500 leading-relaxed">
            {category.description || "No description provided for this category."}
          </p>
        </div>

        {/* ফুটার সেকশন: ডেট এবং স্ট্যাটাস */}
        <div className="flex items-center justify-between border-t border-slate-100/80 pt-4">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            <span>{formatDate(category.createdAt)}</span>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50/80 text-emerald-700 border border-emerald-200/60 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Active
          </span>
        </div>
      </CardContent>
    </Card>
  );
}