import CategoryList from "@/app/(publicGroup)/_components/CategoryList";
import CategoryFormDialog from "../../_components/CategoryFormDialog";

const MyCategoryPage = () => {
  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Category Management
          </h1>
          <p className="text-muted-foreground">
            Create, update, and manage equipment categories.
          </p>
        </div>

        <CategoryFormDialog mode="create" />
      </div>

      {/* Category List */}
      <CategoryList />
    </div>
  );
};

export default MyCategoryPage;