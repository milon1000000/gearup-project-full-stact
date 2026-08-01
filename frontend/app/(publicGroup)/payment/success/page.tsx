import React from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Package, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const PaymentSuccessPage = ({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) => {
  const sessionId = searchParams?.session_id;

  return (
    <div className="min-h-screen bg-slate-50/50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card className="rounded-3xl border border-slate-100 shadow-xl bg-white overflow-hidden text-center">
          <CardContent className="p-8 sm:p-10 space-y-6">
            {/* Success Icon */}
            <div className="mx-auto w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-inner">
              <CheckCircle2 className="h-12 w-12 text-emerald-600 animate-bounce" />
            </div>

            {/* Header Texts */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                Payment Successful
              </span>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Thank You For Your Payment!
              </h1>
              <p className="text-sm text-slate-500 leading-relaxed">
                Your payment has been processed successfully and your gear
                rental order is now confirmed.
              </p>
            </div>

            {/* Session ID Box (Optional for debugging/reference) */}
            {sessionId && (
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3 text-left">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Session Reference
                </p>
                <p className="text-xs font-mono text-slate-600 truncate mt-0.5">
                  {sessionId}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <Button
                asChild
                className="w-full rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold h-11 shadow-lg shadow-emerald-600/20 gap-2"
              >
                <Link href="/dashboard/my-rentals">
                  <Package className="h-4 w-4" />
                  View My Rentals
                  <ArrowRight className="h-4 w-4 ml-auto" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="w-full rounded-2xl border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold h-11 gap-2"
              >
                <Link href="/">
                  <Home className="h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer Support Text */}
        <p className="text-center text-xs text-slate-400">
          Having trouble?{" "}
          <span className="text-emerald-600 font-medium cursor-pointer hover:underline">
            Contact Support
          </span>
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
