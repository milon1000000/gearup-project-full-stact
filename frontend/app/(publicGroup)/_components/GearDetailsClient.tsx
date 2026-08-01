"use client";

import React, { useState } from "react";
import GearDetails from "./GearDetails";
import RentalFormDialog from "./rentalFormDialog";

interface Props {
  gear: any;
  userRole?: string;
}

export default function GearDetailsClient({ gear, userRole }: Props) {
  const [open, setOpen] = useState(false);

  const handleRentClick = () => {
    setOpen(true);
  };

  return (
    <>
      <GearDetails gear={gear} userRole={userRole} onRentClick={handleRentClick} />
      <RentalFormDialog
        isOpen={open}
        onClose={() => setOpen(false)}
        gearItemId={gear.id || gear._id || gear.uuid || ""}
      />
    </>
  );
}
