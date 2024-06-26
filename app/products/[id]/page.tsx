import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import ProductImage from "./_components/product-image";
import ProductDetails from "./_components/product-details";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
      category: true,
    },
  });

  const otherProducts = await db.product.findMany({
    where: {
      category: {
        id: product?.categoryId,
      },
      restaurant: {
        id: product?.restaurantId,
      },
    },
    take: 10,
    include: {
      restaurant: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <div>
      <ProductImage product={product} />

      <ProductDetails product={product} otherProducts={otherProducts} />
    </div>
  );
};

export default ProductPage;
