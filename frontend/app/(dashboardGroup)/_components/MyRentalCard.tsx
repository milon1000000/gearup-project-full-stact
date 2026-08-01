"use client";

import React, { useActionState, useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar, Package, CircleDollarSign, Ban, CreditCard, Star, MessageSquarePlus } from "lucide-react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { cancleMyRental } from "../_actions/getRentals";
import { createPayment } from "../_actions/mypaymentActions";
import { createReviews } from "../_actions/reviewActions"; // আপনার সার্ভার অ্যাকশনের সঠিক পাথ দিন

interface MyRentalCardProps {
  rental: {
    id: string;
    quantity: number;
    startDate: string;
    endDate: string;
    totalPrice: number;
    status: string;
    gearItem: {
      id: string;
      name: string;
      image: string;
      brand: string;
      pricePerDay: number;
    };
  };
}

const MyRentalCard = ({ rental }: MyRentalCardProps) => {
  // Review Modal State
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // Review Action Hook
  const [reviewState, reviewFormAction, isReviewPending] = useActionState(
    createReviews,
    null
  );

  // 1. Cancel Rental Action Hook
  const cancelRentalAction = cancleMyRental.bind(null, rental.id);
  const [cancelState, cancelFormAction, isCancelPending] = useActionState(
    cancelRentalAction,
    null
  );

  // 2. Payment Action Hook bound with rental.id as rentalOrderId
  const paymentAction = createPayment.bind(null, rental.id);
  const [paymentState, paymentFormAction, isPaymentPending] = useActionState(
    paymentAction,
    null
  );

  useEffect(() => {
    if (cancelState) {
      if (cancelState.success) {
        toast.success(cancelState.message || "Rental cancelled successfully!");
      } else {
        toast.error(cancelState.message || "Failed to cancel rental.");
      }
    }
  }, [cancelState]);

  useEffect(() => {
    if (paymentState) {
      if (paymentState.success) {
        const paymentUrl = paymentState.data?.paymentUrl || paymentState.paymentUrl;
        if (paymentUrl) {
          window.location.href = paymentUrl;
        }
      } else {
        toast.error(paymentState.message || "Failed to initiate payment.");
      }
    }
  }, [paymentState]);

  // Review Response Handle
  useEffect(() => {
    if (reviewState) {
      if (reviewState.success) {
        toast.success(reviewState.message || "Review submitted successfully!");
        setIsReviewOpen(false);
        setComment("");
        setRating(5);
      } else {
        toast.error(reviewState.message || "Failed to submit review.");
      }
    }
  }, [reviewState]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "CONFIRMED":
      case "PAID":
      case "PICKED_UP":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "RETURNED":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "CANCELLED":
        return "bg-rose-100 text-rose-800 border-rose-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  const isCancellable = rental.status === "PENDING";
  const isPayable = rental.status === "CONFIRMED";
  const isReturnable = rental.status === "RETURNED";

  return (
    <Card className="overflow-hidden border border-slate-100 shadow-md hover:shadow-lg transition-all rounded-2xl bg-white">
      <CardContent className="p-5">
        <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
          {/* Gear Image */}
          <div className="relative w-full sm:w-28 h-28 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0 flex items-center justify-center">
            <Image
              src={rental.gearItem.image || "/placeholder-image.svg"}
              alt={rental.gearItem.name}
              fill
              className="object-cover p-1"
            />
          </div>

          {/* Details */}
          <div className="flex-1 space-y-2 w-full text-center sm:text-left">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  {rental.gearItem.brand}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  {rental.gearItem.name}
                </h3>
              </div>
              <Badge
                className={`px-2.5 py-0.5 text-xs font-semibold border ${getStatusColor(rental.status)}`}
              >
                {rental.status}
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
              <div className="flex items-center justify-center sm:justify-start gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                <span>
                  {formatDate(rental.startDate)} - {formatDate(rental.endDate)}
                </span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-1.5">
                <Package className="h-3.5 w-3.5 text-slate-400" />
                <span>
                  Quantity: <b>{rental.quantity}</b> Unit(s)
                </span>
              </div>
            </div>

            {/* Price & Dynamic Action Buttons Section */}
            <div className="flex flex-col sm:flex-row justify-between items-center pt-3 border-t border-slate-100 gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">
                  Total Cost:
                </span>
                <div className="flex items-center text-slate-900 font-extrabold text-base">
                  <CircleDollarSign className="h-4 w-4 text-emerald-600 mr-1" />
                  ৳{rental.totalPrice}
                </div>
              </div>

              {/* Action Buttons based on Status */}
              <div className="flex items-center gap-2">
                {/* Cancel Button (Only if PENDING) */}
                {isCancellable && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-xl border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700 text-xs font-semibold h-8 px-3 gap-1.5"
                      >
                        <Ban className="h-3.5 w-3.5" />
                        Cancel Rental
                      </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent className="rounded-3xl border-slate-100 p-6 shadow-2xl">
                      <form action={cancelFormAction}>
                        <AlertDialogHeader className="space-y-2">
                          <AlertDialogTitle className="text-xl font-bold text-slate-900">
                            Cancel Rental Request?
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-sm text-slate-500 leading-relaxed">
                            Are you sure you want to cancel your rental for{" "}
                            <span className="font-semibold text-slate-800">
                              &quot;{rental.gearItem.name}&quot;
                            </span>
                            ? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter className="mt-6 gap-2 sm:gap-0">
                          <AlertDialogCancel className="rounded-2xl border-slate-200 text-slate-600 hover:bg-slate-50">
                            Keep Rental
                          </AlertDialogCancel>

                          <AlertDialogAction
                            type="submit"
                            disabled={isCancelPending}
                            className="rounded-2xl bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-600/20"
                          >
                            {isCancelPending ? "Cancelling..." : "Yes, Cancel Rental"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </form>
                    </AlertDialogContent>
                  </AlertDialog>
                )}

                {/* Payment Now Button (Only if CONFIRMED) */}
                {isPayable && (
                  <form action={paymentFormAction}>
                    <Button
                      type="submit"
                      size="sm"
                      disabled={isPaymentPending}
                      className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold h-8 px-4 gap-1.5 shadow-lg shadow-emerald-600/20"
                    >
                      <CreditCard className="h-3.5 w-3.5" />
                      {isPaymentPending ? "Processing..." : "Pay Now"}
                    </Button>
                  </form>
                )}

                {/* Review Button (Only if RETURNED) */}
                {isReturnable && (
                  <Dialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold h-8 px-4 gap-1.5 shadow-lg shadow-blue-600/20"
                      >
                        <MessageSquarePlus className="h-3.5 w-3.5" />
                        Write Review
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="rounded-3xl border-slate-100 p-6 shadow-2xl sm:max-w-md">
                      <form action={reviewFormAction}>
                        {/* Hidden input to pass gearItemId */}
                        <input type="hidden" name="gearItemId" value={rental.gearItem.id} />

                        <DialogHeader className="space-y-2 mb-4">
                          <DialogTitle className="text-xl font-bold text-slate-900">
                            Rate Your Experience
                          </DialogTitle>
                          <DialogDescription className="text-sm text-slate-500">
                            Share your feedback for <span className="font-semibold text-slate-800">&quot;{rental.gearItem.name}&quot;</span>.
                          </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4">
                          {/* Rating Input */}
                          <div className="space-y-1.5">
                            <Label htmlFor="rating" className="text-xs font-semibold text-slate-700">
                              Rating (1 to 5 Stars)
                            </Label>
                            <div className="flex items-center gap-2">
                              <Input
                                id="rating"
                                name="rating"
                                type="number"
                                min="1"
                                max="5"
                                value={rating}
                                onChange={(e) => setRating(Number(e.target.value))}
                                className="rounded-xl border-slate-200"
                                required
                              />
                              <Star className="h-5 w-5 text-amber-500 fill-amber-500 shrink-0" />
                            </div>
                          </div>

                          {/* Comment Input */}
                          <div className="space-y-1.5">
                            <Label htmlFor="comment" className="text-xs font-semibold text-slate-700">
                              Your Comment
                            </Label>
                            <Textarea
                              id="comment"
                              name="comment"
                              placeholder="Write your feedback here..."
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              className="rounded-xl border-slate-200 resize-none h-24"
                              required
                            />
                          </div>
                        </div>

                        <DialogFooter className="mt-6 gap-2 sm:gap-0">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsReviewOpen(false)}
                            className="rounded-2xl border-slate-200 text-slate-600 hover:bg-slate-50"
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            disabled={isReviewPending}
                            className="rounded-2xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20"
                          >
                            {isReviewPending ? "Submitting..." : "Submit Review"}
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MyRentalCard;