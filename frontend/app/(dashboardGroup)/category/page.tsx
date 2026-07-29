import CategoryList from "../_components/CategoryList";

const CategoryPage = () => {
  return (
    <div className="space-y-8 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Category</h1>
          <p className="text-muted-foreground">
            Browse and manage equipment categories.
          </p>
        </div>
      </div>

      <CategoryList />
    </div>
  );
};

export default CategoryPage;
