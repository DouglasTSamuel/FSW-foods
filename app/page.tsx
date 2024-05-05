import Image from "next/image";
import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";

export default function Home() {
  return (
    <>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>
      <div className="px-5 pt-6">
        <CategoryList />
      </div>

      <div className="px-5">
        <Image
          src="/banner-promo-01.png"
          alt="Até 30% de desconto em pizzas!"
          width={0}
          height={0}
          quality={100}
          sizes="100vw"
          className="h-auto w-full object-contain"
        />
      </div>
    </>
  );
}
