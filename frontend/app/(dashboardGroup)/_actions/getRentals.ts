"use server";

import { isAccessTokenExists } from "@/service/refreshToken";
import { revalidateTag } from "next/cache";

export const getMyRentals = async () => {
  const accessToken = await isAccessTokenExists();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/rentals`,
    {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-cache",
      // next: {
      //   revalidate: 60 * 60 * 24,
      //   tags: ["my-rentals"],
      // },
    },
  );

  const result = await res.json();

  return result.data;
};

export const cancleMyRental = async (rentalId: string) => {
  const accessToken = await isAccessTokenExists();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/rentals/${rentalId}/cancel`,
    {
      method: "PATCH",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
    },
  );

  const result = await res.json();

  if (result.success) {
    revalidateTag("public-gears", { expire: 0 });
    revalidateTag("my-gear", { expire: 0 });
    revalidateTag("single-gear", { expire: 0 });
    revalidateTag("my-rentals", { expire: 0 });
    revalidateTag("admin-rentals", { expire: 0 });
  }

  return result;
};
