"use server";

import { jwtUtils } from "@/utils/jwt";
import { cookies } from "next/headers";

export const getNewAccessToken = async () => {
  const cookeiStore = await cookies();

  const refreshToken = cookeiStore.get("refreshToken")?.value;

  if (!refreshToken) {
    // throw new Error("User Not Logged in!")
    return {
      success: false,
      message: "Refresh token not found!",
    };
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/auth/refresh-token`,
    {
      method: "POST",
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
      },
      cache: "no-cache",
    },
  );
  const result = await res.json();
  return result;
};

export const isAccessTokenExists = async () => {
  const cookieStore = await cookies();

  let accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!accessToken && !refreshToken) {
    return {
      success: false,
      message: "User not logged in!",
    };
  }

  const decodedAccessToken = accessToken
    ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string)
    : null;

  let decodedRefreshToken = refreshToken
    ? jwtUtils.verifyToken(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as string,
      )
    : null;

  if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
    const result = await getNewAccessToken();

    if (result.success) {
      const newAccessToken = result.data.accessToken;

      cookieStore.set("accessToken", newAccessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        sameSite: "lax",
      });
      accessToken = newAccessToken;
    }
  }
  return accessToken;
};
