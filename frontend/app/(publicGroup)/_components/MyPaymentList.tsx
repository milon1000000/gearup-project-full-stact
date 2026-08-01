import React from 'react';
import { getMyPayments } from '../_actions/getMyPaymentActions';
import { MyPaymentCard } from './MyPaymentCard';
import { ReceiptText } from 'lucide-react';

export const MyPaymentList = async () => {
  const response = await getMyPayments();
  
  const paymentData = response?.data;
  const payments = Array.isArray(paymentData) 
    ? paymentData 
    : paymentData ? [paymentData] : [];

  return (
    <div className="space-y-4">
      {payments.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <ReceiptText className="h-12 w-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No payment records found</h3>
          <p className="text-sm text-slate-500 mt-1">You haven't made any transactions yet.</p>
        </div>
      ) : (
        payments.map((payment: any) => (
          <MyPaymentCard key={payment.id} payment={payment} />
        ))
      )}
    </div>
  );
};