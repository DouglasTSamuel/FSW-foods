import { Product } from "@prisma/client";
import { ArrowDownIcon } from "lucide-react";

interface DiscountBadgeProps {
  product: Pick<Product, "discountPercentage">;
  isAbsolute: boolean;
}

const DiscountBadge = ({ product, isAbsolute = false }: DiscountBadgeProps) => {
  return (
    <>
      {product.discountPercentage > 0 && (
        <span
          className={`left-2 top-2 flex items-center gap-[2px] rounded-full bg-primary px-2 py-[2px] text-xs font-semibold text-white ${
            isAbsolute ? "absolute" : ""
          }`}
        >
          <ArrowDownIcon size={12} /> {product.discountPercentage}%
        </span>
      )}
    </>
  );
};

export default DiscountBadge;
