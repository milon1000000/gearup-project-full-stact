"use server";
import { IUser } from "@/lib/type";
import { isAccessTokenExists } from "@/service/refreshToken";
import { revalidateTag } from "next/cache";

export const updateProfile = async (prevState: IUser, formData: FormData) => {
  const id = formData.get("id");

  const payload = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    profileImage: formData.get("profileImage"),
  };

  const accessToken = await isAccessTokenExists();

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/user`, {
    method: "PATCH",
    headers: {
      Cookie: `accessToken=${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (result.success) {
    revalidateTag("my-profile", {
      expire: 0,
    });
  }

  return result;
};
