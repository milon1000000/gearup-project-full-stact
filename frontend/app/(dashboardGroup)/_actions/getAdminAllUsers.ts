"use server";

import { isAccessTokenExists } from "@/service/refreshToken";

export const getAdminUsers = async () => {
  const accessToken = await isAccessTokenExists();

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/users`, {
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "no-store",
    next: {
      tags: ["admin-users"],
    },
  });

  const result = await res.json();
  return result;
};
