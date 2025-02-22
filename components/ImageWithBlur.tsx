"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { decode } from "blurhash";

interface ImageWithBlurProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurHash: string;
  priority?: boolean;
  className?: string;
}

export function ImageWithBlur({
  src,
  alt,
  width,
  height,
  blurHash,
  priority = false,
  className = "",
}: ImageWithBlurProps) {
  const [isLoading, setIsLoading] = useState(true);
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
      <AnimatePresence mode="wait">
        {isLoading && blurDataUrl && (
          <motion.div
            key="blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={blurDataUrl || "/placeholder.svg"}
              alt={alt}
              fill
              className="object-cover"
              priority
            />
            <motion.div
              className="absolute inset-0 bg-white/10 backdrop-blur-sm"
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          className={`transition-transform duration-700 ease-in-out ${className}`}
          onLoadingComplete={() => setIsLoading(false)}
          priority={priority}
        />
      </motion.div>
    </div>
  );
}
