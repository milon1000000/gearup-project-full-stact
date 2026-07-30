import { getSingleGear } from "../../_actions/getAllGear";
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

  const result = await getSingleGear(id);
  const user = await getMe();

  if (!result.success || !result.data) {
    notFound();
  }

  return <GearDetailsClient gear={result.data} userRole={user?.data?.role} />;
};

export default GearDetailsPage;
