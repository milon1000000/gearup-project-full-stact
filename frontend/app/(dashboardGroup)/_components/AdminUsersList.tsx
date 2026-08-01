'use client';

import React, { useState } from 'react';
import { Users } from 'lucide-react';
import AdminUserCard from './AdminUsersCard';

type UserItem = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'ADMIN' | 'PROVIDER' | 'CUSTOMER';
  status?: string;
  createdAt?: string;
};

type AdminUsersListProps = {
  initialUsers: UserItem[];
};

export default function AdminUsersList({ initialUsers }: AdminUsersListProps) {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const users = initialUsers || [];

  if (!users || users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-16 bg-white rounded-3xl border border-slate-200 text-center shadow-sm">
        <Users className="size-10 text-slate-300 mb-3" />
        <p className="text-slate-700 font-bold text-sm">No users found.</p>
        <p className="text-xs text-slate-400 mt-1">There are no registered users in the system yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-4 px-6">User Info</th>
              <th className="py-4 px-6">Phone</th>
              <th className="py-4 px-6">Role</th>
              <th className="py-4 px-6">Joined Date</th>
              <th className="py-4 px-6 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((user: UserItem) => (
              <AdminUserCard 
                key={user.id} 
                user={user} 
                isOpen={openDropdownId === user.id}
                setIsOpen={(isOpen) => setOpenDropdownId(isOpen ? user.id : null)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}