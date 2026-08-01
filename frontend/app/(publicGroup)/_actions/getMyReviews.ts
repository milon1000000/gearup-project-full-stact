"use server";

import { isAccessTokenExists } from "@/service/refreshToken";
import { revalidateTag } from "next/cache";

export const getMyReviews = async () => {
  const accessToken = await isAccessTokenExists();

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/reviews/my`, {
      method: "GET",
      headers: {
        Cookie: `accessToken=${accessToken || ""}`,
        "Content-Type": "application/json",
      },
      next: {
        tags: ["my-reviews"],
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch my reviews: ${res.status}`);
    }

    const result = await res.json();

    return result.data?.reviews ?? [];
  } catch (error) {
    console.error(error);

    return [];
  }
};

export const updateReview = async (
  reviewId: string,
  payload: { rating?: number; comment?: string },
) => {
  const accessToken = await isAccessTokenExists();

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/reviews/${reviewId}`,
      {
        method: "PATCH",
        headers: {
          Cookie: `accessToken=${accessToken || ""}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Failed to update review",
      };
    }

    revalidateTag("my-reviews", { expire: 0 });

    return {
      success: true,
      message: result.message || "Review updated successfully",
      data: result.data,
    };
  } catch (error: any) {
    console.error("Update Review Error:", error);

    return {
      success: false,
      message: error?.message || "Something went wrong!",
    };
  }
};

export const deleteReview = async (reviewId: string) => {
  const accessToken = await isAccessTokenExists();

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/reviews/${reviewId}`,
      {
        method: "DELETE",
        headers: {
          Cookie: `accessToken=${accessToken || ""}`,
          "Content-Type": "application/json",
        },
      },
    );

    const result = await res.json().catch(() => ({}));

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Failed to delete review",
      };
    }

    revalidateTag("my-reviews", { expire: 0 });

    return {
      success: true,
      message: result.message || "Review deleted successfully",
      data: result.data || null,
    };
  } catch (error: any) {
    console.error("Delete Review Error:", error);

    return {
      success: false,
      message: error?.message || "Something went wrong!",
    };
  }
};