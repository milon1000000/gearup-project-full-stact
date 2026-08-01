"use server";

import { ICreateGearResponse, IGearItem } from "@/lib/type";
import { isAccessTokenExists } from "@/service/refreshToken";
import { revalidateTag } from "next/cache";

export const createGear = async (
  prevState: ICreateGearResponse,
  formData: FormData,
) => {
  const pricePerDayValue = formData.get("pricePerDay");
  const stockValue = formData.get("stock");

  const payload = {
    name: formData.get("name"),
    description: formData.get("description"),
    image: formData.get("image"),
    brand: formData.get("brand"),
    condition: formData.get("condition"),
    pricePerDay: Number(pricePerDayValue),
    stock: Number(stockValue),
    categoryId: formData.get("categoryId")?.toString() ?? "",
  };

  const accessToken = await isAccessTokenExists();

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/gear`, {
    method: "POST",
    headers: {
      Cookie: `accessToken=${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (result.success) {
    revalidateTag("public-gears", { expire: 0 });
    revalidateTag("my-gear", { expire: 0 });
    revalidateTag("single-gear", { expire: 0 });
  }

  return result;
};

export const updateGearItem = async (
  prevState: ICreateGearResponse | null,
  formData: FormData,
) => {
  const id = formData.get("id");
  const pricePerDayValue = formData.get("pricePerDay");
  const stockValue = formData.get("stock");

  const payload = {
    name: formData.get("name"),
    description: formData.get("description"),
    image: formData.get("image"),
    brand: formData.get("brand"),
    condition: formData.get("condition"),
    pricePerDay: Number(pricePerDayValue),
    stock: Number(stockValue),
  };

  const accessToken = await isAccessTokenExists();

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/gear/${id}`, {
    method: "PATCH",
    headers: {
      Cookie: `accessToken=${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (result.success) {
    revalidateTag("public-gears", { expire: 0 });
    revalidateTag("my-gear", { expire: 0 });
    revalidateTag("single-gear", { expire: 0 });
  }

  return result;
};

export const getMyGearItems = async () => {
  const accessToken = await isAccessTokenExists();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/gear/provider/gear`,
    {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-cache",
      // next: {
      //   revalidate: 60 * 60 * 24,
      //   tags: ["my-gear"],
      // },
    },
  );

  const result = await res.json();
  return result.data;
};

export const deleteGear = async (
  prevState: ICreateGearResponse,
  formData: FormData,
) => {
  const id = formData.get("id");

  const accessToken = await isAccessTokenExists();

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/gear/${id}`, {
    method: "DELETE",
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
  });

  const result = await res.json();

  if (result.success) {
    revalidateTag("public-gears", { expire: 0 });
    revalidateTag("my-gear", { expire: 0 });
    revalidateTag("single-gear", { expire: 0 });
  }

  return result;
};

