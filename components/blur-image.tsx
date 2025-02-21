"use client";

import { useState, useEffect } from "react";
import { decode } from "blurhash";
import Image from "next/image";

interface BlurImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurHash: string;
  className?: string;
}

export function BlurImage({
  src,
  alt,
  width,
  height,
  blurHash,
  className,
}: BlurImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [blurDataUrl, setBlurDataUrl] = useState<string>("");

  useEffect(() => {
    if (!blurHash) return;

    const pixels = decode(blurHash, 32, 32);
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const context = canvas.getContext("2d");
    if (!context) return;

    const imageData = context.createImageData(32, 32);
    imageData.data.set(pixels);
    context.putImageData(imageData, 0, 0);
    setBlurDataUrl(canvas.toDataURL());
  }, [blurHash]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {blurDataUrl && !imageLoaded && (
        <Image
          src={blurDataUrl || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          className="absolute left-0 top-0 size-full object-cover"
        />
      )}
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        onLoad={() => setImageLoaded(true)}
        className={`size-full object-cover transition-opacity duration-500 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
