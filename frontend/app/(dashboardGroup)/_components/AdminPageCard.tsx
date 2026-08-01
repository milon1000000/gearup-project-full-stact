import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface AdminPageCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
}

const AdminPageCard = ({ title, value, icon, description }: AdminPageCardProps) => {
  return (
    <Card className="border-slate-100 shadow-sm bg-white rounded-2xl overflow-hidden hover:shadow-md transition-all">
      <CardContent className="flex items-center justify-between p-6">
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{title}</p>
          <h3 className="text-2xl font-black text-slate-900">{value}</h3>
          {description && <p className="text-[11px] text-slate-500">{description}</p>}
        </div>
        <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
          {icon}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPageCard;