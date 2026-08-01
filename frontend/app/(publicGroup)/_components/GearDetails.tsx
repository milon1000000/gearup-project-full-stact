"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Package,
  ShieldCheck,
  Tag,
  FolderTree,
  CircleDollarSign,
  User,
  Mail,
  Star,
  MessageSquare,
  Pencil,
  Trash2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  getMyReviews,
  updateReview,
  deleteReview,
} from "../_actions/getMyReviews";
import { GearSkeleton } from "./GearSkeleton";

interface GearDetailsProps {
  gear: any;
  userRole?: string;
  onRentClick: () => void;
  reviews?: any[]; 
  isLoading?: boolean;
}

const GearDetails = ({ gear, userRole, onRentClick, reviews = [], isLoading = false }: GearDetailsProps) => {
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  
  const [isMyReviewsOpen, setIsMyReviewsOpen] = useState(false);
  const [myReviews, setMyReviews] = useState<any[]>([]);
  const [loadingMyReviews, setLoadingMyReviews] = useState(false);

  const [editingReview, setEditingReview] = useState<any>(null);
  const [editRating, setEditRating] = useState(1);
  const [editComment, setEditComment] = useState("");
  const [savingReview, setSavingReview] = useState(false);

  const [deletingReview, setDeletingReview] = useState<any>(null);
  const [deleting, setDeleting] = useState(false);

  const normalizedRole = userRole?.toUpperCase();
  const canRent = normalizedRole === "CUSTOMER";
  const isCustomer = normalizedRole === "CUSTOMER";

  if (isLoading || !gear) {
    return <GearSkeleton />;
  }

  const imageSrc =
    typeof gear?.image === "string" && gear.image && !gear.image.includes("example.com")
      ? gear.image
      : "/placeholder-image.svg";

  const refreshMyReviews = async () => {
    const res = await getMyReviews();
    const dataList = Array.isArray(res) ? res : res?.data || [];
    setMyReviews(dataList);
  };

  const openEditReview = (review: any) => {
    setEditingReview(review);
    setEditRating(review.rating || 1);
    setEditComment(review.comment || "");
  };

  const handleUpdateReview = async () => {
    if (!editingReview) return;
    setSavingReview(true);
    try {
      const res = await updateReview(editingReview.id, {
        rating: editRating,
        comment: editComment,
      });
      if (res.success) {
        toast.success(res.message || "Review updated successfully!");
        setEditingReview(null);
        await refreshMyReviews();
      } else {
        toast.error(res.message || "Failed to update review.");
      }
    } catch (error) {
      console.error("Update review error:", error);
      toast.error("Failed to update review.");
    } finally {
      setSavingReview(false);
    }
  };

  const handleDeleteReview = async () => {
    if (!deletingReview) return;
    setDeleting(true);
    try {
      const res = await deleteReview(deletingReview.id);
      if (res.success) {
        toast.success(res.message || "Review deleted successfully!");
        setDeletingReview(null);
        await refreshMyReviews();
      } else {
        toast.error(res.message || "Failed to delete review.");
      }
    } catch (error) {
      console.error("Delete review error:", error);
      toast.error("Failed to delete review.");
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    if (isMyReviewsOpen && isCustomer) {
      const fetchMyReviewsData = async () => {
        setLoadingMyReviews(true);
        try {
          const res = await getMyReviews();
          const dataList = Array.isArray(res) ? res : res?.data || [];
          setMyReviews(dataList);
        } catch (error) {
          console.error("Failed to fetch my reviews", error);
        } finally {
          setLoadingMyReviews(false);
        }
      };

      fetchMyReviewsData();
    }
  }, [isMyReviewsOpen, isCustomer]);

  return (
    <>
      <div className="container mx-auto max-w-7xl px-4 py-10">
        <Card className="overflow-hidden rounded-3xl border-0 shadow-xl bg-white">
        <div className="grid lg:grid-cols-12 gap-0 items-center">
          {/* Image Area */}
          <div className="lg:col-span-5 relative h-[300px] sm:h-[380px] lg:h-[480px] w-full bg-slate-900/5 lg:m-6 lg:w-auto lg:rounded-2xl overflow-hidden flex items-center justify-center border border-slate-100">
            <Image
              src={imageSrc}
              alt={gear.name || "Gear image"}
              fill
              priority
              className="object-contain p-2"
            />
          </div>

          {/* Content Area */}
          <CardContent className="lg:col-span-7 space-y-6 p-6 sm:p-8">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="px-3 py-1 text-xs">
                  {gear.category?.name}
                </Badge>
                <Badge
                  variant={gear.available ? "default" : "destructive"}
                  className="px-3 py-1 text-xs"
                >
                  {gear.available ? "Available" : "Unavailable"}
                </Badge>
              </div>

              {/* Action Buttons: All Reviews & My Reviews (for Customer) */}
              <div className="flex items-center gap-2 flex-wrap">
                {/* View Reviews Button with Dialog */}
                <Dialog open={isReviewsOpen} onOpenChange={setIsReviewsOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-xl border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 text-xs font-semibold h-8 px-3 gap-1.5 shadow-sm"
                    >
                      <MessageSquare className="h-3.5 w-3.5" />
                      Reviews ({reviews.length})
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="rounded-3xl border-slate-100 p-6 shadow-2xl sm:max-w-lg max-h-[80vh] overflow-y-auto">
                    <DialogHeader className="space-y-1 mb-4">
                      <DialogTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-blue-600" />
                        Gear Reviews & Feedbacks
                      </DialogTitle>
                      <DialogDescription className="text-sm text-slate-500">
                        What users are saying about <span className="font-semibold text-slate-800">&quot;{gear.name}&quot;</span>.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                      {reviews.length === 0 ? (
                        <div className="text-center py-10 text-slate-400 text-sm">
                          No reviews found for this gear yet.
                        </div>
                      ) : (
                        reviews.map((review: any, index: number) => (
                          <div
                            key={review.id || index}
                            className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                                  {review.customer?.name?.charAt(0) || "U"}
                                </div>
                                <div>
                                  <h4 className="text-xs font-bold text-slate-900">
                                    {review.customer?.name || "Anonymous User"}
                                  </h4>
                                  <span className="text-[10px] text-slate-400">
                                    {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : ""}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-100">
                                <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                                <span className="text-xs font-bold text-amber-800">
                                  {review.rating}
                                </span>
                              </div>
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed pl-10">
                              {review.comment}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </DialogContent>
                </Dialog>

                {/* My Reviews Button (Only for CUSTOMER) */}
                {isCustomer && (
                  <Dialog open={isMyReviewsOpen} onOpenChange={setIsMyReviewsOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-xl border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 text-xs font-semibold h-8 px-3 gap-1.5 shadow-sm"
                      >
                        <Star className="h-3.5 w-3.5 fill-emerald-600" />
                        My Reviews
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="rounded-3xl border-slate-100 p-6 shadow-2xl sm:max-w-lg max-h-[80vh] overflow-y-auto">
                      <DialogHeader className="space-y-1 mb-4">
                        <DialogTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
                          <Star className="h-5 w-5 text-emerald-600 fill-emerald-600" />
                          My Given Reviews
                        </DialogTitle>
                        <DialogDescription className="text-sm text-slate-500">
                          All the reviews you have submitted across the platform.
                        </DialogDescription>
                      </DialogHeader>

                      <div className="space-y-4">
                        {loadingMyReviews ? (
                          <div className="text-center py-10 text-slate-400 text-sm">
                            Loading your reviews...
                          </div>
                        ) : myReviews.length === 0 ? (
                          <div className="text-center py-10 text-slate-400 text-sm">
                            You haven&apos;t written any reviews yet.
                          </div>
                        ) : (
                          myReviews.map((review: any, index: number) => (
                            <div
                              key={review.id || index}
                              className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2"
                            >
                              <div className="flex items-center justify-between gap-2">
                                <div>
                                  <h4 className="text-xs font-bold text-slate-900">
                                    {review.gear?.name || "Gear Item"}
                                  </h4>
                                  <span className="text-[10px] text-slate-400">
                                    {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : ""}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0">
                                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-100">
                                    <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                                    <span className="text-xs font-bold text-amber-800">
                                      {review.rating}
                                    </span>
                                  </div>
                                  {/* Edit Button */}
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50"
                                    onClick={() => openEditReview(review)}
                                    title="Edit review"
                                  >
                                    <Pencil className="h-3.5 w-3.5" />
                                  </Button>
                                  {/* Delete Button */}
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50"
                                    onClick={() => setDeletingReview(review)}
                                    title="Delete review"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </Button>
                                </div>
                              </div>
                              <p className="text-xs text-slate-600 leading-relaxed">
                                {review.comment}
                              </p>
                            </div>
                          ))
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                {gear.name}
              </h1>
              <p className="mt-2 flex items-center gap-2 text-sm text-slate-500 font-medium">
                <Tag className="h-4 w-4 text-primary" />
                {gear.brand}
              </p>
            </div>

            <Separator />

            <p className="text-sm leading-relaxed text-slate-600">
              {gear.description}
            </p>

            <div className="grid grid-cols-2 gap-3">
              <Card className="border-slate-100 bg-slate-50/50 shadow-none">
                <CardContent className="flex items-center gap-3 p-4">
                  <ShieldCheck className="h-6 w-6 text-blue-600 shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Condition</p>
                    <h3 className="text-xs sm:text-sm font-semibold text-slate-800">{gear.condition}</h3>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-100 bg-slate-50/50 shadow-none">
                <CardContent className="flex items-center gap-3 p-4">
                  <Package className="h-6 w-6 text-emerald-600 shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Stock</p>
                    <h3 className="text-xs sm:text-sm font-semibold text-slate-800">{gear.stock} Units</h3>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-100 bg-slate-50/50 shadow-none">
                <CardContent className="flex items-center gap-3 p-4">
                  <FolderTree className="h-6 w-6 text-orange-600 shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Category</p>
                    <h3 className="text-xs sm:text-sm font-semibold text-slate-800 truncate">{gear.category?.name}</h3>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-100 bg-slate-50/50 shadow-none">
                <CardContent className="flex items-center gap-3 p-4">
                  <CircleDollarSign className="h-6 w-6 text-purple-600 shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Price</p>
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                      ৳{gear.pricePerDay}
                      <span className="text-xs font-normal text-slate-500"> / day</span>
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </div>

            {gear.provider && (
              <Card className="border-slate-100 bg-slate-50/50 shadow-none">
                <CardHeader className="py-3 px-4">
                  <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Provider Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 pb-3 px-4 text-sm">
                  <div className="flex items-center gap-2.5 text-slate-700">
                    <User className="h-4 w-4 text-primary" />
                    <span className="font-medium">{gear.provider.name}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-700">
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="font-medium">{gear.provider.email}</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {canRent && (
              <Button
                className="h-11 w-full text-sm font-semibold shadow-md transition-all"
                disabled={!gear.available}
                onClick={onRentClick}
              >
                {gear.available ? "Rent Now" : "Currently Unavailable"}
              </Button>
            )}

            {userRole && !canRent && (
              <p className="text-xs text-center text-slate-500 font-medium italic">
                Only customers can rent gear.
              </p>
            )}
          </CardContent>
        </div>
      </Card>
      </div>

      {/* Edit Review Dialog */}
      <Dialog
        open={!!editingReview}
        onOpenChange={(open) => !open && setEditingReview(null)}
      >
        <DialogContent className="rounded-3xl border-slate-100 p-6 shadow-2xl sm:max-w-md">
          <DialogHeader className="space-y-1 mb-4">
            <DialogTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Pencil className="h-5 w-5 text-blue-600" />
              Edit Review
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-500">
              Update your rating and feedback for{" "}
              <span className="font-semibold text-slate-800">
                &quot;{editingReview?.gear?.name || "Gear Item"}&quot;
              </span>
              .
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Rating Input */}
            <div className="space-y-1.5">
              <Label
                htmlFor="edit-rating"
                className="text-xs font-semibold text-slate-700"
              >
                Rating (1 to 5 Stars)
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id="edit-rating"
                  type="number"
                  min="1"
                  max="5"
                  value={editRating}
                  onChange={(e) => setEditRating(Number(e.target.value))}
                  className="rounded-xl border-slate-200"
                  required
                />
                <Star className="h-5 w-5 text-amber-500 fill-amber-500 shrink-0" />
              </div>
            </div>

            {/* Comment Input */}
            <div className="space-y-1.5">
              <Label
                htmlFor="edit-comment"
                className="text-xs font-semibold text-slate-700"
              >
                Your Comment
              </Label>
              <Textarea
                id="edit-comment"
                placeholder="Write your feedback here..."
                value={editComment}
                onChange={(e) => setEditComment(e.target.value)}
                className="rounded-xl border-slate-200 resize-none h-24"
              />
            </div>
          </div>

          <DialogFooter className="mt-6 gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setEditingReview(null)}
              className="rounded-2xl border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleUpdateReview}
              disabled={savingReview}
              className="rounded-2xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20"
            >
              {savingReview ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Review Confirmation */}
      <AlertDialog
        open={!!deletingReview}
        onOpenChange={(open) => !open && setDeletingReview(null)}
      >
        <AlertDialogContent className="rounded-3xl border-slate-100 p-6 shadow-2xl sm:max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-rose-600" />
              Delete Review?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-slate-500">
              Are you sure you want to delete your review for{" "}
              <span className="font-semibold text-slate-800">
                &quot;{deletingReview?.gear?.name || "Gear Item"}&quot;
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6 gap-2 sm:gap-0">
            <AlertDialogCancel
              className="rounded-2xl border-slate-200 text-slate-600 hover:bg-slate-50"
              onClick={() => setDeletingReview(null)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleDeleteReview();
              }}
              disabled={deleting}
              className="rounded-2xl bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-600/20"
            >
              {deleting ? "Deleting..." : "Yes, Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default GearDetails;