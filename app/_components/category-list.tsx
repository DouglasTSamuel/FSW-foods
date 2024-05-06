import { db } from "../_lib/prisma";
import CategoryItem from "./category-item";

const CategoryList = async () => {
  const categories = await db.category.findMany();

  return (
    //TODO: Mudar falar display flex
    <div className="flex items-center gap-3 overflow-x-auto scroll-smooth pb-6 [&::-webkit-scrollbar]:hidden">
      {categories.map((category) => (
        <CategoryItem category={category} key={category.id} />
      ))}
    </div>
  );
};

export default CategoryList;
