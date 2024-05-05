import { Category } from "@prisma/client";
import Image from "next/image";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <div className="flex h-[54px] min-w-fit items-center gap-3 overflow-x-auto scroll-smooth rounded-full bg-white px-4 py-3 shadow-md [&::-webkit-scrollbar]:hidden">
      <Image
        src={category.imageUrl}
        alt={category.name}
        width={30}
        height={30}
      />
      <span className="inline-block text-sm font-semibold">
        {category.name}
      </span>
    </div>
  );
};

export default CategoryItem;
