import React from 'react';
import { ShieldAlert, Sparkles } from 'lucide-react';
import { MyPaymentList } from '../_components/MyPaymentList';

const MyPamentPage = () => {
  return (
    <main className="min-h-screen bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 font-semibold text-xs tracking-wider uppercase mb-1">
              <Sparkles className="h-4 w-4" />
              <span>Financial Overview</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              My Payments
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Track and manage all your gear rental transactions and secure invoices.
            </p>
          </div>
        </div>

        {/* List Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-800 px-1">Transaction History</h2>
          <MyPaymentList />
        </div>
      </div>
    </main>
  );
};

export default MyPamentPage;