import CategoryCard from "./CategoryCard";
import { getAllCaregory } from "../../(dashboardGroup)/_actions/myCategoryActions";
import { getMe } from "@/service/getMe";

const CategoryList = async () => {
  const result = await getAllCaregory();
  const user = await getMe();

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {result.data.map((category: any) => (
        <CategoryCard
          key={category.id}
          category={category}
          user={user}
        />
      ))}
    </div>
  );
};

export default CategoryList;