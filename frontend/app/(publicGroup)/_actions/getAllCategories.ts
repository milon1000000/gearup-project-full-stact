"use server";

import type { ICategory } from "@/lib/type";

type CategoriesResponse = {
  success: boolean;
  message: string;
  data: ICategory[];
};

export const getAllCategories = async (): Promise<CategoriesResponse> => {
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`, {
      cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 24,
        tags: ["public-categories"],
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.status}`);
    }

    const result = await res.json();

    return {
      success: result.success ?? true,
      message: result.message || "Categories fetched successfully",
      data: Array.isArray(result.data) ? result.data : [],
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to fetch categories",
      data: [],
    };
  }
};
