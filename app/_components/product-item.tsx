"use client";

import { Prisma } from "@prisma/client";
import Image from "next/image";
import { calculateProductTotalPrice, formatCurrency } from "./_helpers/price";
import Link from "next/link";
import DiscountBadge from "./discount-badge";

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
    <Link className="min-w-[150px]" href={`/products/${product.id}`}>
      <div className="min-w-[150px] space-y-2">
        <div className="relative h-[150px] w-full">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="rounded-lg object-cover shadow-md"
          />

          <DiscountBadge product={product} isAbsolute={true} />
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
    </Link>
  );
};

export default ProductItem;
