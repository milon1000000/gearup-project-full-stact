"use server";

import { revalidateTag } from "next/cache";
import { ICreateRentalPayload } from "@/lib/type";
import { isAccessTokenExists } from "@/service/refreshToken";

export const createRental = async (
  prevState: ICreateRentalPayload,
  formData: FormData,
) => {
  const payload = {
    gearItemId: formData.get("gearItemId")?.toString() ?? "",
    quantity: Number(formData.get("quantity")),
    startDate: formData.get("startDate")?.toString() ?? "",
    endDate: formData.get("endDate")?.toString() ?? "",
  };

  const accessToken = await isAccessTokenExists();

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
    method: "POST",
    headers: {
      Cookie: `accessToken=${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (result.success) {
    revalidateTag("my-rentals", { expire: 0 });
    revalidateTag("public-gears", { expire: 0 });
    revalidateTag("single-gear", { expire: 0 });
  }

  return result;
};