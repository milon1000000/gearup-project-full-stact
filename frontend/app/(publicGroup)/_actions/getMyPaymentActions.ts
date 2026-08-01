"use server";

import { isAccessTokenExists } from "@/service/refreshToken";
export const getMyPayments = async () => {
  const accessToken = await isAccessTokenExists();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/payments`,
    {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store",
    }
  );

  return await res.json();
};


export const getSiglePayment = async (id:string) => {
  const accessToken = await isAccessTokenExists();

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/payments/${id}`,
    {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store",
    }
  );

  return await res.json();
};