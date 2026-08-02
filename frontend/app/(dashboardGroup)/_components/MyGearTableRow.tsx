"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

import GearFormDialog from "./GearFormDialog";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";

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

import {
  ShieldCheck,
  Package,
  CircleDollarSign,
  Tag,
  Trash2,
} from "lucide-react";

import { IGearItem } from "@/lib/type";
import { deleteGear } from "../_actions/myGearActions";
import { isValidImageUrl } from "@/lib/utils";

type MyGearTableRowProps = {
  gear: IGearItem;
};

const initialState = {
  success: false,
  statusCode: 0,
  message: "",
  data: null,
};

const MyGearTableRow = ({ gear }: MyGearTableRowProps) => {
  const [state, deleteAction, pending] = useActionState(
    deleteGear,
    initialState
  );

  useEffect(() => {
    if (!state?.message) return;

    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <TableRow className="group transition-colors hover:bg-slate-50/50">
      {/* Gear Info (Image, Name, Brand) */}
      <TableCell className="py-4">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100 border border-slate-200/60 shadow-sm">
            <Image
              src={isValidImageUrl(gear.image) ? gear.image : "/placeholder-image.svg"}
              alt={gear.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="max-w-[200px]">
            <p className="font-bold text-slate-900 truncate">{gear.name}</p>
            <p className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
              <Tag className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">{gear.brand}</span>
            </p>
          </div>
        </div>
      </TableCell>

      {/* Category */}
      <TableCell>
        <Badge variant="secondary" className="bg-slate-100 text-slate-800 shadow-none font-medium">
          {gear.category?.name}
        </Badge>
      </TableCell>

      {/* Condition */}
      <TableCell>
        <div className="flex items-center gap-1.5 text-slate-700">
          <ShieldCheck className="h-4 w-4 text-blue-600 flex-shrink-0" />
          <span className="text-xs font-semibold">{gear.condition}</span>
        </div>
      </TableCell>

      {/* Stock */}
      <TableCell>
        <div className="flex items-center gap-1.5 text-slate-700">
          <Package className="h-4 w-4 text-green-600 flex-shrink-0" />
          <span className="text-xs font-semibold">{gear.stock}</span>
        </div>
      </TableCell>

      {/* Price */}
      <TableCell>
        <div className="flex items-center gap-1 text-slate-900">
          <CircleDollarSign className="h-4 w-4 text-purple-600 flex-shrink-0" />
          <span className="text-xs font-bold">৳{gear.pricePerDay}</span>
          <span className="text-[10px] text-muted-foreground">/day</span>
        </div>
      </TableCell>

      {/* Status */}
      <TableCell>
        <Badge
          variant={gear.available ? "default" : "destructive"}
          className="shadow-sm font-medium"
        >
          {gear.available ? "Available" : "Unavailable"}
        </Badge>
      </TableCell>

      {/* Actions */}
      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-2">
          <GearFormDialog
            gear={gear}
            trigger={
              <Button size="sm" variant="outline" className="h-8 shadow-sm">
                Edit
              </Button>
            }
          />

          <Button asChild size="sm" className="h-8 shadow-sm">
            <Link href={`/gear/${gear.id}`}>View</Link>
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size="icon"
                variant="destructive"
                className="h-8 w-8 rounded-lg shadow-sm text-red-600 bg-red-50 hover:bg-red-100 border border-red-200"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Gear?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete{" "}
                  <span className="font-semibold text-slate-900">
                    &quot;{gear.name}&quot;
                  </span>
                  ? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <form action={deleteAction}>
                <input type="hidden" name="id" value={gear.id} />

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>

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
      </TableCell>
    </TableRow>
  );
};

export default MyGearTableRow;