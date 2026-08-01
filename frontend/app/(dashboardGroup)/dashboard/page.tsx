import React from "react";
import { getMe } from "@/service/getMe";
import { getMyRentals } from "../_actions/getRentals";
import { getMyPayments } from "@/app/(publicGroup)/_actions/getMyPaymentActions";
import UserDashboardContent from "../_components/UserDashboardContent";

const UserDashboardPage = async () => {
  const [userRes, rentals, paymentRes] = await Promise.all([
    getMe(),
    getMyRentals().catch(() => []),
    getMyPayments().catch(() => ({ data: [] })),
  ]);

  const rentalsList = Array.isArray(rentals) ? rentals : [];
  const paymentsList = Array.isArray(paymentRes?.data)
    ? paymentRes.data
    : Array.isArray(paymentRes)
      ? paymentRes
      : [];

  return (
    <UserDashboardContent
      user={userRes?.data || null}
      rentals={rentalsList}
      payments={paymentsList}
    />
  );
};

export default UserDashboardPage;