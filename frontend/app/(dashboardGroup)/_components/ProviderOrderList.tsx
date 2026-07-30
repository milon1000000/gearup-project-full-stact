import React from 'react';
import { getProviderOrders } from '../_actions/getProviderRentalOrdersAction';
import ProviderOrderTable from "./ProviderOrderTable";

const ProviderOrderList = async () => {
  const data = await getProviderOrders();
  
  const orders = data?.success && Array.isArray(data.data) ? data.data : [];

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-900">Incoming Rental Requests</h3>
        <p className="text-sm text-slate-500">
          Review gear items, customer details, and update rental statuses.
        </p>
      </div>

      {/* Table Component */}
      <ProviderOrderTable orders={orders} />
    </div>
  );
};

export default ProviderOrderList;