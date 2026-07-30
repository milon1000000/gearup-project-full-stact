import React from "react";
import ProviderOrderList from "../../_components/ProviderOrderList";

const RentalOrdersPage = () => {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Rental Orders</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage customer rental requests and track their status efficiently.
        </p>
      </div>

      {/* Provider Orders List Component */}
      <ProviderOrderList />
    </section>
  );
};

export default RentalOrdersPage;