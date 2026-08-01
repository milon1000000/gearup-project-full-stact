"use server";

import { revalidateTag } from "next/cache";
import { isAccessTokenExists } from "@/service/refreshToken";

export const createReviews = async (prevState: any, formData: FormData) => {
  const payload = {
    gearItemId: String(formData.get("gearItemId")),
    rating: Number(formData.get("rating") || 0),
    comment: String(formData.get("comment") || ""),
  };

  const accessToken = await isAccessTokenExists();

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/reviews`, {
      method: "POST",
      headers: {
        Cookie: `accessToken=${accessToken || ""}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Failed to create review",
      };
    }

    revalidateTag("all-reviews",{expire:0});

    return {
      success: true,
      message: result.message || "Review created successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Something went wrong!",
    };
  }
};