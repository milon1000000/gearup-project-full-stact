"use server";
import { ICategoryResponse } from "@/lib/type";
import { isAccessTokenExists } from "@/service/refreshToken";
import { revalidateTag } from "next/cache";

export const createCategory = async (
  prevState: ICategoryResponse,
  formData: FormData,
) => {
  const payload = {
    name: formData.get("name"),
    description: formData.get("description"),
  };
  const accessToken = await isAccessTokenExists();

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`, {
    method: "POST",
    headers: {
      Cookie: `accessToken=${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (result.success) {
    revalidateTag("all-category", {
      expire: 0,
    });
  }

  return result;
};

export const getAllCaregory = async () => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`, {
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 24,
      tags: ["all-category"],
    },
  });

  const result = await res.json();
  return result;
};

export const updateCategory = async (
  prevState: ICategoryResponse,
  formData: FormData,
) => {
  const id = formData.get("id");

  const payload = {
    name: formData.get("name"),
    description: formData.get("description"),
  };

  const accessToken = await isAccessTokenExists();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/categories/${id}`,
    {
      method: "PATCH",
      headers: {
        Cookie: `accessToken=${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  const result = await res.json();

  if (result.success) {
    revalidateTag("all-category", {
      expire: 0,
    });
  }

  return result;
};

export const deleteCategory = async (
  prevState: ICategoryResponse,
  formData: FormData,
) => {
  const id = formData.get("id");

  const accessToken = await isAccessTokenExists();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/categories/${id}`,
    {
      method: "DELETE",
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
    },
  );

  const result = await res.json();

  if (result.success) {
    revalidateTag("all-category", {
      expire: 0,
    });
  }

  return result;
};
