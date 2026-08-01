"use server";

export const getReviewsByGearId = async (gearId: string) => {
  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/reviews/gear/${gearId}`,
      {
        next: {
          tags: ["all-reviews"],
        },
      },
    );

    const result = await res.json();

    const reviewData = result.data || result;

    return {
      success: result.success ?? true,
      message: result.message || "Reviews fetched successfully",
      data: reviewData,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to fetch reviews",
      data: { averageRating: 0, totalReviews: 0, reviews: [] },
    };
  }
};
