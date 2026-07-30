"use server";

import { isAccessTokenExists } from "@/service/refreshToken";

export const getAdminRentals = async () => {
  const accessToken = await isAccessTokenExists();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/rentals/admin/rentals`,
    {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 24,
        tags: ["admin-rentals"],
      },
    }
  );

  const result = await res.json();
  return result;
};