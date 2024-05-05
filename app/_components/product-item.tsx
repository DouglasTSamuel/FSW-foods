import { Prisma } from "@prisma/client";
import Image from "next/image";
import { calculateProductTotalPrice, formatCurrency } from "./_helpers/price";
import { ArrowDownIcon } from "lucide-react";

interface ProductItemProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className="min-w-[150px] space-y-2">
      <div className="relative h-[150px] w-full">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="rounded-lg object-cover shadow-md"
        />
        {product.discountPercentage > 0 && (
          <span className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full bg-primary px-2 py-[2px] text-xs font-semibold text-white">
            <ArrowDownIcon size={12} /> {product.discountPercentage}%
          </span>
        )}
      </div>
      <div>
        <h2 className="truncate text-sm">{product.name}</h2>
        <div className="flex gap-1">
          <h3 className="font-semibold">
            {formatCurrency(calculateProductTotalPrice(product))}
          </h3>
          {product.discountPercentage > 0 && (
            <span className="text-xs text-muted-foreground line-through">
              {formatCurrency(+product.price)}
            </span>
          )}
        </div>
        <span className="block truncate text-sm text-muted-foreground">
          {product.restaurant.name}
        </span>
      </div>
    </div>
  );
};

export default ProductItem;
