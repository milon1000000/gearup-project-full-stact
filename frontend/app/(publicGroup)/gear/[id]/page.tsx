import { getSingleGear } from "../../_actions/getAllGear";
import { getReviewsByGearId } from "../../_actions/getAllReviews";
import { notFound } from "next/navigation";
import GearDetailsClient from "../../_components/GearDetailsClient";
import { getMe } from "@/service/getMe";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

const GearDetailsPage = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const [result, user, reviewResult] = await Promise.all([
    getSingleGear(id),
    getMe(),
    getReviewsByGearId(id),
  ]);

  if (!result.success || !result.data) {
    notFound();
  }

  return (
    <GearDetailsClient
      gear={result.data}
      userRole={user?.data?.role}
      reviews={reviewResult?.data?.reviews ?? []}
    />
  );
};

export default GearDetailsPage;
