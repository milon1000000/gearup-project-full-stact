"use server";

import { isAccessTokenExists } from "@/service/refreshToken";
import { revalidateTag } from "next/cache";

export type ActionState = {
  success: boolean;
  message: string;
  status?: string;
} | null;

export async function adminUpdateUser(
  userId: string,
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const accessToken = await isAccessTokenExists();
  const status = formData.get("status") as string;

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/admin/users/${userId}`,
      {
        method: "PATCH",
        headers: {
          Cookie: `accessToken=${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      },
    );

    const result = await res.json();

    if (result.success) {
      revalidateTag("admin-users", { expire: 0 });
      return { success: true, message: "Status updated successfully", status };
    } else {
      return { success: false, message: result.message || "Failed to update status" };
    }
  } catch (error) {
    return { success: false, message: "Something went wrong!" };
  }
}