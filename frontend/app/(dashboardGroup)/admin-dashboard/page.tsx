import React from "react";
import { getMe } from "@/service/getMe";
import { getAdminRentals } from "../_actions/getAdminRentals";
import { getAdminUsers } from "../_actions/getAdminAllUsers";
import { getAllGear } from "@/app/(publicGroup)/_actions/getAllGear";
import { getAdminReviews } from "../_actions/getAdminReviews";
import AdminDashboardContent from "../_components/AdminDashboardContent";

const AdminPage = async () => {
  const [userRes, rentalsRes, usersRes, gearRes, reviewsRes] =
    await Promise.all([
      getMe(),
      getAdminRentals().catch(() => ({ success: false, data: [] })),
      getAdminUsers().catch(() => ({ success: false, data: [] })),
      getAllGear({}).catch(() => ({ success: false, data: [] })),
      getAdminReviews([]),
    ]);

  const rentals =
    rentalsRes?.success && Array.isArray(rentalsRes.data)
      ? rentalsRes.data
      : Array.isArray(rentalsRes)
        ? rentalsRes
        : [];

  const users = Array.isArray(usersRes)
    ? usersRes
    : usersRes?.data || usersRes?.users || [];

  const gears = gearRes?.success && Array.isArray(gearRes.data) ? gearRes.data : [];

  // Fetch reviews for gears after we know the gear list
  const gearIds = gears.map((g) => g.id);
  const reviewsData =
    gearIds.length > 0
      ? await getAdminReviews(gearIds).catch(() => ({
          success: false,
          totalReviews: 0,
          reviews: [],
        }))
      : reviewsRes;

  const reviews = Array.isArray(reviewsData?.reviews) ? reviewsData.reviews : [];

  return (
    <AdminDashboardContent
      user={userRes?.data || null}
      gears={gears}
      rentals={rentals}
      users={users}
      reviews={reviews}
    />
  );
};

export default AdminPage;