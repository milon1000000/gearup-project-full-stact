import React from 'react';
import { getAdminRentals } from '../_actions/getAdminRentals';
import AdminRentalTable from './AdminRentalTable';

const AdminRentalList = async () => {
  const response = await getAdminRentals();
  
  // ব্যাকএন্ড রেসপন্স স্ট্রাকচার অনুযায়ী সেফটি চেক (response.data বা রেসপন্স অ্যারে হ্যান্ডেল করতে)
  const rentals = response?.success && Array.isArray(response.data) 
    ? response.data 
    : Array.isArray(response) 
    ? response 
    : [];

  return (
    <div>
      <AdminRentalTable rentals={rentals} />
    </div>
  );
};

export default AdminRentalList;