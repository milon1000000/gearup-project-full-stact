"use server";

import { isAccessTokenExists } from "@/service/refreshToken";
import { revalidateTag } from "next/cache";

export const getProviderOrders = async () => {
  const accessToken = await isAccessTokenExists();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/rentals/provider/orders`,
    {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 24,
        tags: ["provider-orders"],
      },
    },
  );

  const result = await res.json();
  return result;
};

export const updateRentalStatus = async (rentalId: string) => {
  const accessToken = await isAccessTokenExists();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/rentals/provider/orders/${rentalId}`,
    {
      method: "PATCH",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "CONFIRMED",
      }),
    },
  );

  const result = await res.json();

  if (result.success) {
    revalidateTag("provider-orders", { expire: 0 });
    revalidateTag("my-rentals", { expire: 0 });
    revalidateTag("admin-rentals", { expire: 0 });
    revalidateTag("single-gear", { expire: 0 });
    revalidateTag("public-gears", { expire: 0 });
  }

  return result;
};



export const updateRentalReturn = async (rentalId: string) => {
  const accessToken = await isAccessTokenExists();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/rentals/provider/orders/${rentalId}`,
    {
      method: "PATCH",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "RETURNED",
      }),
    },
  );

  const result = await res.json();

  if (result.success) {
    revalidateTag("provider-orders", { expire: 0 });
    revalidateTag("my-rentals", { expire: 0 });
    revalidateTag("admin-rentals", { expire: 0 });
    revalidateTag("single-gear", { expire: 0 });
    revalidateTag("public-gears", { expire: 0 });
  }

  return result;
};