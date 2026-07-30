import React from "react";
import AdminRentalList from "../../_components/AdminRentalList";

const AdminAllRentals = () => {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">All Rentals</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Complete overview of all platform transactions, users, and gear statuses.
        </p>
      </div>

      {/* Admin Rental List Component */}
      <AdminRentalList />
    </section>
  );
};

export default AdminAllRentals;