import React from "react";
import { getMe } from "@/service/getMe";
import { getMyGearItems } from "../_actions/myGearActions";
import { getProviderOrders } from "../_actions/getProviderRentalOrdersAction";
import ProviderDashboardContent from "../_components/ProviderDashboardContent";

const ProviderDashboardPage = async () => {
  const [userRes, gearRes, ordersRes] = await Promise.all([
    getMe(),
    getMyGearItems().catch(() => null),
    getProviderOrders().catch(() => ({ success: false, data: [] })),
  ]);

  const gearsList =
    Array.isArray(gearRes) ? gearRes : Array.isArray(gearRes?.data) ? gearRes.data : [];
  const ordersList =
    ordersRes?.success && Array.isArray(ordersRes.data) ? ordersRes.data : [];

  return (
    <ProviderDashboardContent
      user={userRes?.data || null}
      gears={gearsList}
      orders={ordersList}
    />
  );
};

export default ProviderDashboardPage;