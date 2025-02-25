"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { decode } from "blurhash";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurHash: string;
  priority?: boolean;
  className?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  blurHash,
  priority = false,
  className = "",
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [blurDataUrl, setBlurDataUrl] = useState<string>("");
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "200px 0px", // Load images 200px before they come into view
  });
  const imageRef = useRef<HTMLImageElement>(null);

  // Generate blur placeholder from blurhash
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

  // Preload image when in viewport
  useEffect(() => {
    if (!inView || isLoaded || !src || priority) return;

    const img = document.createElement("img");
    img.src = src;
    img.onload = () => setIsLoaded(true);
  }, [inView, isLoaded, src, priority]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Placeholder or blurred image */}
      {!isLoaded && blurDataUrl && (
        <div className="absolute inset-0">
          <Image
            src={blurDataUrl || "/placeholder.svg"}
            alt={alt}
            fill
            className="object-cover transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gray-200/20 backdrop-blur-sm" />
        </div>
      )}

      {/* Main image - only load if in viewport or priority */}
      {(inView || priority) && (
        <Image
          ref={imageRef}
          src={src || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          onLoadingComplete={() => setIsLoaded(true)}
          className={`transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          priority={priority}
        />
      )}
    </div>
  );
}
