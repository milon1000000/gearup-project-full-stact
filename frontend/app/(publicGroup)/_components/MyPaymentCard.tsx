import React from 'react';
import Link from 'next/link';
import { CreditCard, CheckCircle2, Clock, XCircle, Calendar, DollarSign, Package, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaymentCardProps {
  payment: {
    id: string;
    transactionId: string;
    amount: number;
    provider: string;
    method: string;
    status: string;
    paidAt: string;
    customer?: {
      name: string;
      email: string;
    };
    rentalOrder: {
      quantity: number;
      startDate: string;
      endDate: string;
      totalPrice: number;
      gearItem: {
        name: string;
        image: string;
        brand: string;
        pricePerDay: number;
      };
    };
  };
}

const statusConfig: Record<string, { label: string; bg: string; icon: any }> = {
  COMPLETED: {
    label: 'Completed',
    bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    icon: CheckCircle2,
  },
  PENDING: {
    label: 'Pending',
    bg: 'bg-amber-50 text-amber-700 border-amber-200',
    icon: Clock,
  },
  FAILED: {
    label: 'Failed',
    bg: 'bg-rose-50 text-rose-700 border-rose-200',
    icon: XCircle,
  },
};

export const MyPaymentCard = ({ payment }: PaymentCardProps) => {
  const currentStatus = statusConfig[payment.status] || statusConfig.PENDING;
  const StatusIcon = currentStatus.icon;

  const gear = payment.rentalOrder?.gearItem;
  
  // Date format function
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all duration-200 space-y-4">
      {/* Top Header: TrxID & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
            {payment.provider} ({payment.method})
          </span>
          <span className="text-xs text-slate-400 font-mono">
            Trx: {payment.transactionId}
          </span>
        </div>
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold w-fit ${currentStatus.bg}`}>
          <StatusIcon className="h-3.5 w-3.5" />
          <span>{currentStatus.label}</span>
        </div>
      </div>

      {/* Middle Content: Gear Info & Image */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
            {gear?.image ? (
              <img src={gear.image} alt={gear.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-slate-400">
                <Package className="h-6 w-6" />
              </div>
            )}
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{gear?.brand}</span>
            <h4 className="font-bold text-slate-900 text-base">{gear?.name}</h4>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              <span>{formatDate(payment.rentalOrder.startDate)} — {formatDate(payment.rentalOrder.endDate)}</span>
            </div>
          </div>
        </div>

        {/* Amount Section */}
        <div className="text-left sm:text-right w-full sm:w-auto bg-slate-50 sm:bg-transparent p-3 sm:p-0 rounded-xl">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Paid Amount</p>
          <p className="text-xl font-extrabold text-slate-900 flex items-center sm:justify-end">
            <DollarSign className="h-5 w-5 text-emerald-600 -mr-1" />
            {payment.amount.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-slate-50">
        <span className="text-xs text-slate-400">
          Paid on: {new Date(payment.paidAt).toLocaleString()} (Qty: {payment.rentalOrder.quantity})
        </span>

        <Link href={`/my-payment/${payment.id}`}>
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-xl border-slate-200 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 font-semibold gap-1.5 transition-colors"
          >
            <span>View Details</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};