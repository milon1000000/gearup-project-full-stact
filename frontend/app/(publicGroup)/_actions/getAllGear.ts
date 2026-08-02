"use server";

import type { IGearItem } from "@/lib/type";

export type GearListResponse = {
  success: boolean;
  statusCode?: number;
  message?: string;
  data: IGearItem[];
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export const getAllGear = async ({
  query,
}: {
  query?: { [key: string]: string | string[] | undefined };
}): Promise<GearListResponse> => {
  const params = new URLSearchParams();
  const searchTerm = Array.isArray(query?.searchTerm)
    ? query.searchTerm[0]
    : query?.searchTerm;

  if (searchTerm) {
    params.set("searchTerm", searchTerm);
  }

  const categoryId = Array.isArray(query?.categoryId)
    ? query.categoryId[0]
    : query?.categoryId;

  if (categoryId) {
    params.set("categoryId", categoryId);
  }

  const limit = Array.isArray(query?.limit) ? query.limit[0] : query?.limit;

  if (limit) {
    params.set("limit", limit);
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/gear${params.toString() ? `?${params.toString()}` : ""}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch gear: ${res.status}`);
  }

  return res.json() as Promise<GearListResponse>;
};


export const getSingleGear = async (id: string) => {
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/gear/${id}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
};