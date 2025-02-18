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

    // Decode the blurhash
    const pixels = decode(blurHash, 32, 32);

    // Create a canvas to draw the blurhash
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const context = canvas.getContext("2d");
    if (!context) return;

    // Create an ImageData object
    const imageData = context.createImageData(32, 32);
    imageData.data.set(pixels);

    // Draw the ImageData to the canvas
    context.putImageData(imageData, 0, 0);

    // Convert the canvas to a data URL
    setBlurDataUrl(canvas.toDataURL());
  }, [blurHash]);

  return (
    <div className="relative overflow-hidden">
      {blurDataUrl && !imageLoaded && (
        <Image
          src={blurDataUrl || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          className={`${className} absolute left-0 top-0 transition-opacity duration-500`}
        />
      )}
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        className={`${className} ${
          imageLoaded ? "opacity-100" : "opacity-0"
        } transition-opacity duration-500`}
        onLoadingComplete={() => setImageLoaded(true)}
      />
    </div>
  );
}
