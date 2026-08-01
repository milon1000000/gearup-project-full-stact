'use client';

import { useActionState, useRef } from "react";
import { Shield, Mail, Calendar, Phone, CheckCircle, Ban, Loader2 } from "lucide-react";
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

  const handleStatusSelect = (newStatus: string) => {
    setIsOpen(false);
    setTimeout(() => {
      if (formRef.current) {
        const input = formRef.current.elements.namedItem("status") as HTMLInputElement;
        if (input) {
          input.value = newStatus;
        }
        formRef.current.requestSubmit();
      }
    }, 50);
  };

  return (
    <tr className="hover:bg-slate-50/80 transition-colors border-b border-slate-100 text-sm relative">
      {/* User Name & Avatar Initial */}
      <td className="py-4 px-6">
        <div className="flex items-center space-x-3">
          <div className="size-10 rounded-full bg-pink-100 text-pink-600 font-bold flex items-center justify-center flex-shrink-0 shadow-sm uppercase">
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

      {/* Status with Toggle Popup & Action */}
      <td className="py-4 px-6 text-right relative">
        <div className="inline-block text-left">
          {/* একটিমাত্র ফর্ম যা পুরো অ্যাকশন হ্যান্ডেল করবে */}
          <form ref={formRef} action={formAction}>
            <input type="hidden" name="status" defaultValue={isDisplayedActive ? 'SUSPENDED' : 'ACTIVE'} />

            <button
              type="button"
              onClick={() => !isPending && setIsOpen(!isOpen)}
              disabled={isPending}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border transition-all cursor-pointer ${
                isDisplayedActive 
                  ? "bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100" 
                  : "bg-rose-50 text-rose-700 border-rose-100 hover:bg-rose-100"
              }`}
            >
              {isPending ? (
                <Loader2 className="size-3 animate-spin" />
              ) : (
                <span className={`size-1.5 rounded-full ${isDisplayedActive ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`}></span>
              )}
              {displayedStatus}
            </button>
          </form>

          {/* Popup / Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-6 mt-2 w-36 bg-white rounded-2xl shadow-lg border border-slate-100 py-1.5 z-50 text-left">
              {isDisplayedActive ? (
                <button
                  type="button"
                  onClick={() => handleStatusSelect('SUSPENDED')}
                  className="w-full px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-medium transition-colors cursor-pointer"
                >
                  <Ban className="size-3.5" />
                  Suspend User
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleStatusSelect('ACTIVE')}
                  className="w-full px-4 py-2 text-xs text-emerald-600 hover:bg-emerald-50 flex items-center gap-2 font-medium transition-colors cursor-pointer"
                >
                  <CheckCircle className="size-3.5" />
                  Make Active
                </button>
              )}
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}