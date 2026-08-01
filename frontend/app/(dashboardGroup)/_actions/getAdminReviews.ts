"use server";

import type { IReview } from "@/lib/type";

export const getAdminReviews = async (gearIds: string[]) => {
  // Fetch reviews for a bounded set of gears (newest first) in parallel
  const ids = gearIds.slice(0, 8);

  if (ids.length === 0) {
    return { success: true, totalReviews: 0, reviews: [] };
  }

  try {
    const results = await Promise.all(
      ids.map(async (gearId) => {
        const res = await fetch(
          `${process.env.BACKEND_API_URL}/api/reviews/gear/${gearId}`,
          {
            next: {
              tags: ["all-reviews"],
            },
          },
        );
        return res.json().catch(() => null);
      }),
    );

    const reviews: IReview[] = [];

    results.forEach((result, index) => {
      if (!result) return;

      const data = result.data || result;
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.reviews)
          ? data.reviews
          : [];

      list.forEach((review: IReview) => {
        reviews.push({
          ...review,
          gearItem: {
            id: ids[index],
            name: review.gearItem?.name || "Gear item",
            image: review.gearItem?.image || null,
          },
        });
      });
    });

    // Sort newest first
    reviews.sort(
      (a, b) =>
        new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime(),
    );

    return {
      success: true,
      totalReviews: reviews.length,
      reviews,
    };
  } catch (error) {
    console.error("Failed to fetch admin reviews:", error);
    return { success: false, totalReviews: 0, reviews: [] };
  }
};
