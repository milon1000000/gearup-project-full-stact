import { Suspense } from "react";
import { notFound } from "next/navigation";
import GearDetailsClient from "../_components/GearDetailsClient";
import { getMe } from "@/service/getMe";
import { getSingleGear } from "../_actions/getAllGear";

type PageProps = {
  searchParams: Promise<{ id?: string | string[] | undefined }>;
};

const RentalPage = async ({ searchParams }: PageProps) => {
  const resolvedSearchParams = await searchParams;
  const gearId = Array.isArray(resolvedSearchParams?.id)
    ? resolvedSearchParams.id[0]
    : resolvedSearchParams?.id;

  if (!gearId) {
    notFound();
  }

  const [userResult, gearResult] = await Promise.all([
    getMe(),
    getSingleGear(gearId),
  ]);

  if (!gearResult.success || !gearResult.data) {
    notFound();
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <GearDetailsClient gear={gearResult.data} userRole={userResult?.data?.role} />
      </div>
    </Suspense>
  );
};

export default RentalPage;