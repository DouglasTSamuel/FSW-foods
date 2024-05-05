import Header from "@/app/_components/header";
import RestaurantItem from "@/app/_components/restaurant-item";
import { db } from "@/app/_lib/prisma";

const RecommendedRestaurantsPage = async () => {
  const restaurants = await db.restaurant.findMany({});
  return (
    <>
      <Header />
      <div className="px-5 pt-6">
        <h1 className="mb-6 text-lg font-semibold">
          Restaurantes recomendados
        </h1>
        <div className="flex w-full flex-col gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={restaurant}
              className="max-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RecommendedRestaurantsPage;
