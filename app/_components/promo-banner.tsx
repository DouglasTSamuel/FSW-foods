import Image, { ImageProps } from "next/image";

const PromoBanner = (props: ImageProps) => {
  return (
    <Image
      width={0}
      height={0}
      quality={100}
      sizes="100vw"
      className="h-auto w-full object-contain"
      {...props}
    />
  );
};

export default PromoBanner;
