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
      cache: "no-store",
    }
  );

  const result = await res.json();
  return result;
};