import { notFound, redirect } from "next/navigation";
import { getSingleGear } from "../_actions/getAllGear";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

const GearDetailsPage = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const result = await getSingleGear(id);

  if (!result.success || !result.data) {
    notFound();
  }

  redirect(`/gear/${id}`);
};

export default GearDetailsPage;