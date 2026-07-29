import { Suspense } from "react";
import CategoryList from "../_components/CategoryList";
import { CategorySkeleton } from "../_components/CategorySkeleton";

const AdminDashboardPage = () => {
  return (
    <div className="space-y-8 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Category Management
          </h1>
          <p className="text-muted-foreground">
            Create, update, and manage equipment categories.
          </p>
        </div>
      </div>

      <Suspense fallback={<CategorySkeleton />}>
        <CategoryList />
      </Suspense>
    </div>
  );
};

export default AdminDashboardPage;