"use server";

export const getAllGear = async ({
  query,
}: {
  query?: { [key: string]: string | string[] | undefined };
}) => {
  const params = new URLSearchParams();
  const searchTerm = Array.isArray(query?.searchTerm)
    ? query.searchTerm[0]
    : query?.searchTerm;

  if (searchTerm) {
    params.set("searchTerm", searchTerm);
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/gear${params.toString() ? `?${params.toString()}` : ""}`,
    {
      cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 24,
        tags: ["public-gears"],
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch gear: ${res.status}`);
  }

  return res.json();
};


export const getSingleGear = async (id: string) => {
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/gear/${id}`,
    {
      cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 24,
        tags: ["single-gear"],
      },
    }
  );

  return res.json();
};