import Image from "next/image";

export function Photo({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "(max-width: 800px) 100vw, 50vw",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const position = className.includes("absolute") || className.includes("relative") ? "" : "relative";
  return (
    <div className={`media zoom-media ${position} ${className}`}>
      <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
    </div>
  );
}
