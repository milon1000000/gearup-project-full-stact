"use server";

import { isAccessTokenExists } from "@/service/refreshToken";
import { refresh, revalidateTag, updateTag } from "next/cache";

export const createPayment = async (rentalOrderId: string, prevState: any) => {
  const payload = {
    rentalOrderId,
  };

  const accessToken = await isAccessTokenExists();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/payments/create`,
    {
      method: "POST",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  const result = await res.json();

  if (result.success) {
    revalidateTag("admin-rentals", { expire: 0 });
    revalidateTag("provider-orders", { expire: 0 });
    revalidateTag("my-rentals",{expire:0});

  }

  return result;
};
