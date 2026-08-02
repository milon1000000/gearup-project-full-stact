'use client';

import { useActionState, useRef, useState } from "react";
import { Shield, Mail, Calendar, Phone, CheckCircle, Ban, Loader2, MoreHorizontal } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { adminUpdateUser } from "../_actions/adminUsersUpdateStatus";

type UserItem = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'ADMIN' | 'PROVIDER' | 'CUSTOMER';
  status?: string;
  createdAt?: string;
};

type AdminUserCardProps = {
  user: UserItem;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export default function AdminUserCard({ user, isOpen, setIsOpen }: AdminUserCardProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<'ACTIVE' | 'SUSPENDED'>('ACTIVE');

  const currentActiveStatus = user.status || 'ACTIVE';

  const updateActionWithId = adminUpdateUser.bind(null, user.id);
  const [state, formAction, isPending] = useActionState(updateActionWithId, null);

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'PROVIDER':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
  };

  const displayedStatus = state?.success && state?.status ? state.status : currentActiveStatus;
  const isDisplayedActive = displayedStatus === 'ACTIVE';

  const targetStatus: 'ACTIVE' | 'SUSPENDED' = isDisplayedActive ? 'SUSPENDED' : 'ACTIVE';

  // Dropdown option selected → open the confirmation dialog
  const handleMenuSelect = () => {
    setIsOpen(false);
    setPendingStatus(targetStatus);
    setTimeout(() => setConfirmOpen(true), 50);
  };

  // Cancel → close everything, do nothing
  const handleCancelAll = () => {
    setConfirmOpen(false);
    setIsOpen(false);
  };

  // Confirm (Yes) → submit the form to apply the status change
  const handleConfirm = () => {
    setConfirmOpen(false);
    if (formRef.current) {
      const input = formRef.current.elements.namedItem("status") as HTMLInputElement;
      if (input) {
        input.value = pendingStatus;
      }
      formRef.current.requestSubmit();
    }
  };

  return (
    <tr className="hover:bg-slate-50/80 transition-colors border-b border-slate-100 text-sm relative">
      {/* User Name & Avatar Initial */}
      <td className="py-4 px-6">
        <div className="flex items-center space-x-3">
          <div className="size-10 rounded-full bg-pink-100 text-pink-600 font-bold flex items-center justify-center shrink-0 shadow-sm uppercase">
            {user.name ? user.name.charAt(0) : 'U'}
          </div>
          <div>
            <p className="font-bold text-slate-900 capitalize">{user.name}</p>
            <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
              <Mail className="size-3 text-slate-300" />
              {user.email}
            </p>
          </div>
        </div>
      </td>

      {/* Phone Number */}
      <td className="py-4 px-6 text-xs text-slate-600">
        <span className="flex items-center gap-1.5 font-medium">
          <Phone className="size-3 text-slate-400" />
          {user.phone || "N/A"}
        </span>
      </td>

      {/* Role */}
      <td className="py-4 px-6 text-xs">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold border ${getRoleBadge(user.role)}`}>
          <Shield className="size-3" />
          {user.role}
        </span>
      </td>

      {/* Joined Date */}
      <td className="py-4 px-6 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <Calendar className="size-3 text-slate-400" />
          {user.createdAt ? new Date(user.createdAt).toISOString().split('T')[0] : "N/A"}
        </span>
      </td>

      {/* Status with 3-dot Menu & Confirm Dialog */}
      <td className="py-4 px-6 text-right relative">
        <div className="inline-flex items-center justify-end gap-2">
          {/* Hidden form — handles the actual status update */}
          <form ref={formRef} action={formAction}>
            <input type="hidden" name="status" />
          </form>

          {/* Status Badge (non-interactive) */}
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border ${
              isDisplayedActive
                ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                : "bg-rose-50 text-rose-700 border-rose-100"
            }`}
          >
            <span className={`size-1.5 rounded-full ${isDisplayedActive ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`}></span>
            {displayedStatus}
          </span>

          {/* 3-dot menu button */}
          <button
            type="button"
            onClick={() => !isPending && setIsOpen(!isOpen)}
            disabled={isPending}
            aria-label="Status options"
            className="size-8 inline-flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-700 border border-transparent transition-all cursor-pointer"
          >
            {isPending ? <Loader2 className="size-4 animate-spin" /> : <MoreHorizontal className="size-4" />}
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-4 mt-2 w-40 bg-white rounded-2xl shadow-lg border border-slate-100 py-1.5 z-50 text-left">
              {isDisplayedActive ? (
                <button
                  type="button"
                  onClick={handleMenuSelect}
                  className="w-full px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-medium transition-colors cursor-pointer"
                >
                  <Ban className="size-3.5" />
                  Suspend User
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleMenuSelect}
                  className="w-full px-4 py-2 text-xs text-emerald-600 hover:bg-emerald-50 flex items-center gap-2 font-medium transition-colors cursor-pointer"
                >
                  <CheckCircle className="size-3.5" />
                  Make Active
                </button>
              )}
              <div className="border-t border-slate-100 my-1" />
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-full px-4 py-2 text-xs text-slate-500 hover:bg-slate-50 flex items-center justify-center font-medium transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </td>

      {/* Confirmation Dialog */}
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogMedia className={isDisplayedActive ? "bg-rose-50 text-rose-600" : "bg-emerald-50 text-emerald-600"}>
              {isDisplayedActive ? <Ban /> : <CheckCircle />}
            </AlertDialogMedia>
            <AlertDialogTitle>
              {isDisplayedActive ? "Suspend this user?" : "Activate this user?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {isDisplayedActive
                ? `Are you sure you want to suspend ${user.name}? They won't be able to use the platform while suspended.`
                : `Are you sure you want to activate ${user.name}? They will regain full access to the platform.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelAll}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant={isDisplayedActive ? "destructive" : "default"}
              onClick={handleConfirm}
            >
              Yes, {isDisplayedActive ? "Suspend" : "Activate"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </tr>
  );
}