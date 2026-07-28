import { ICategoryResponse } from "@/lib/type";

export const createCategory = async (
  prevState: ICategoryResponse,
  formData: FormData,
) => {
  const payload = {
    name: formData.get("name"),
    description: formData.get("description"),
  };
  //  const accessToken=await isAccessTokenExists();

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  return result;
};
