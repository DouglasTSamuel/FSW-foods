"use client";

import {
  calculateProductTotalPrice,
  formatCurrency,
} from "@/app/_components/_helpers/price";
import DeliveryInfo from "@/app/_components/delivery-info";
import DiscountBadge from "@/app/_components/discount-badge";
import ProductList from "@/app/_components/product-list";
import { Button } from "@/app/_components/ui/button";
import { Prisma } from "@prisma/client";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
      category: true;
    };
  }>;
  otherProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>[];
}

const ProductDetails = ({ product, otherProducts }: ProductDetailsProps) => {
  const [count, setCount] = useState(1);

  const handleInscreaseQuantityClick = () => {
    if (count < 99) {
      setCount((prev) => prev + 1);
    }
  };

  const handleDecreaseQuantityClick = () => {
    if (count > 1) {
      setCount((prev) => prev - 1);
    }
  };

  return (
    <div className="relative mt-[-22px] rounded-tl-3xl rounded-tr-3xl bg-white pt-5">
      <div className="flex items-center gap-[6px] px-5">
        <div className="relative h-6 w-6">
          <Image
            className="rounded-full object-cover"
            src={product.restaurant.imageUrl}
            alt={product.restaurant.name}
            fill
          />
        </div>
        <span className="text-xs text-muted-foreground">
          {product.restaurant.name}
        </span>
      </div>

      <h1 className="mb-3 mt-1 px-5 text-xl font-semibold">{product.name}</h1>
      <div className="flex justify-between px-5">
        <div>
          <div className="relative flex items-center gap-2">
            <h2 className="text-xl font-semibold">
              {formatCurrency(calculateProductTotalPrice(product))}
            </h2>
            <DiscountBadge product={product} isAbsolute={false} />
          </div>

          {product.discountPercentage > 0 && (
            <span className="block text-sm text-muted-foreground">
              De: {formatCurrency(+product.price)}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 text-center">
          <Button
            size="icon"
            aria-label="Diminuir a quantidade"
            variant="ghost"
            className="border border-solid border-muted-foreground"
            onClick={handleDecreaseQuantityClick}
          >
            <ChevronLeftIcon />
          </Button>
          <span className="w-4"> {count}</span>

          <Button
            size="icon"
            aria-label="Aumentar a quantidade"
            onClick={handleInscreaseQuantityClick}
          >
            <ChevronRightIcon />
          </Button>
        </div>
      </div>

      <div className="px-5">
        <DeliveryInfo restaurant={product.restaurant} />
      </div>

      <div className="mt-6 space-y-3 px-5">
        <h3 className="text-semibold">Sobre</h3>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </div>

      <div className="mt-6 space-y-3">
        <h3 className="text-semibold px-5">{product.category.name}</h3>
        <ProductList products={otherProducts} />
      </div>

      <div className="sticky bottom-0 left-0 w-full bg-white px-5 py-6">
        <Button
          aria-label="Adicionar à sacola"
          className="w-full font-semibold"
        >
          Adicionar à sacola
        </Button>
      </div>
    </div>
  );
};

export default ProductDetails;
