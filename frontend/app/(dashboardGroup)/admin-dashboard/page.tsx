import React from "react";
import CategoryFormDialog from "../_components/CategoryFormDialog";

const AdminDashboardPage = () => {
  return (
    <div className="p-6">
      <CategoryFormDialog mode="create" />
    </div>
  );
};

export default AdminDashboardPage;