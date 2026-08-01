import React from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Calendar, 
  DollarSign, 
  Package, 
  CreditCard, 
  ShieldCheck,
  Receipt,
  Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getSiglePayment } from '../../_actions/getMyPaymentActions';

interface SinglePaymentPageProps {
  params: Promise<{ id: string }>; // Next.js 15+ এর জন্য Promise হতে পারে
}

const statusConfig: Record<string, { label: string; bg: string; icon: any; text: string }> = {
  COMPLETED: {
    label: 'Completed',
    bg: 'bg-emerald-50 border-emerald-200',
    text: 'text-emerald-700',
    icon: CheckCircle2,
  },
  PENDING: {
    label: 'Pending',
    bg: 'bg-amber-50 border-amber-200',
    text: 'text-amber-700',
    icon: Clock,
  },
  FAILED: {
    label: 'Failed',
    bg: 'bg-rose-50 border-rose-200',
    text: 'text-rose-700',
    icon: XCircle,
  },
};

export default async function SinglePaymentPage({ params }: SinglePaymentPageProps) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  // API Call
  const response = await getSiglePayment(id);
  console.log("API Response:", response); // টার্মিনালে চেক করার জন্য

  const payment = response?.data;

  // যদি পেমেন্ট ডাটা না পাওয়া যায়
  if (!payment) {
    return (
      <main className="min-h-screen bg-slate-50/50 flex items-center justify-center py-20 px-4 text-center">
        <div className="max-w-md mx-auto space-y-4 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800">Payment Not Found</h2>
          <p className="text-sm text-slate-500">
            ID: <span className="font-mono text-xs text-slate-700">{id}</span> এর জন্য কোনো পেমেন্ট রেকর্ড পাওয়া যায়নি। ব্যাকএন্ড রেসপন্স চেক করুন।
          </p>
          <Link href="/my-payment">
            <Button className="rounded-xl bg-slate-900 text-white font-semibold w-full">Back to Payments</Button>
          </Link>
        </div>
      </main>
    );
  }

  const currentStatus = statusConfig[payment.status] || statusConfig.PENDING;
  const StatusIcon = currentStatus.icon;
  const gear = payment.rentalOrder?.gearItem;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <main className="min-h-screen bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        
        <div className="flex items-center justify-between">
          <Link href="/my-payment">
            <Button variant="ghost" className="rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 gap-2 pl-0 font-semibold">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Payments</span>
            </Button>
          </Link>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-white px-3 py-1.5 rounded-xl border border-slate-100 shadow-sm">
            <Receipt className="h-4 w-4 text-emerald-600" />
            <span>Invoice Details</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Transaction ID</p>
              <p className="font-mono text-sm sm:text-base text-emerald-400 font-bold">{payment.transactionId}</p>
            </div>
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-bold ${currentStatus.bg} ${currentStatus.text}`}>
              <StatusIcon className="h-4 w-4" />
              <span>{currentStatus.label}</span>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            {gear && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Rented Gear Item</h3>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="h-20 w-20 rounded-xl overflow-hidden bg-white shrink-0 border border-slate-200">
                    {gear.image ? (
                      <img src={gear.image} alt={gear.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-slate-400">
                        <Package className="h-6 w-6" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-1 flex-1">
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-100">
                      {gear.brand} • {gear.condition}
                    </span>
                    <h4 className="font-extrabold text-slate-900 text-lg">{gear.name}</h4>
                    <p className="text-xs text-slate-500">{gear.description}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {payment.rentalOrder && (
                <div className="p-4 rounded-2xl border border-slate-100 bg-white space-y-1 shadow-sm">
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase">
                    <Calendar className="h-4 w-4 text-emerald-600" />
                    <span>Rental Period</span>
                  </div>
                  <p className="font-bold text-slate-800 text-sm pt-1">
                    {formatDate(payment.rentalOrder.startDate)}
                  </p>
                  <p className="text-xs text-slate-500">To {formatDate(payment.rentalOrder.endDate)}</p>
                </div>
              )}

              <div className="p-4 rounded-2xl border border-slate-100 bg-white space-y-1 shadow-sm">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase">
                  <CreditCard className="h-4 w-4 text-emerald-600" />
                  <span>Payment Gateway</span>
                </div>
                <p className="font-bold text-slate-800 text-sm pt-1 uppercase">
                  {payment.provider} ({payment.method})
                </p>
                <p className="text-xs text-slate-500">Paid on {new Date(payment.paidAt).toLocaleString()}</p>
              </div>
            </div>

            {payment.customer && (
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Customer Information</h3>
                <div className="flex items-center gap-3 p-4 rounded-2xl border border-slate-100 bg-slate-50">
                  <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0">
                    {payment.customer.name ? payment.customer.name.charAt(0) : 'U'}
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900 text-sm">{payment.customer.name}</p>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {payment.customer.email}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                {payment.rentalOrder && (
                  <p className="text-xs text-slate-500 font-medium">Quantity: <span className="text-slate-800 font-bold">{payment.rentalOrder.quantity} Item</span></p>
                )}
                {gear && (
                  <p className="text-xs text-slate-500 font-medium">Rate: <span className="text-slate-800 font-bold">${gear.pricePerDay} / day</span></p>
                )}
              </div>
              <div className="text-left sm:text-right w-full sm:w-auto bg-emerald-50/50 p-4 sm:p-0 rounded-2xl border sm:border-0 border-emerald-100">
                <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Total Paid Amount</p>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center sm:justify-end">
                  <DollarSign className="h-6 w-6 text-emerald-600 -mr-1" />
                  {payment.amount?.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Encrypted and Secure Transaction</span>
          </div>
        </div>
      </div>
    </main>
  );
}