"use client";

import Masonry from "react-masonry-css";
import Link from "next/link";
import { BlurImage } from "@/components/blur-image";
import Image from "next/image";
import { Heart, Loader2 } from "lucide-react";
import { breakpointColumnsObj } from "@/constant";
import { Basic } from "unsplash-js/dist/methods/photos/types";
import { DownloadButton } from "./DownloadButton";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { getWallpaper } from "@/lib/fetch";

export function Gallery({
  initialImages,
  searchQuery,
}: {
  initialImages: Basic[];
  searchQuery: string;
}) {
  const { ref, inView } = useInView();
  const [images, setImages] = useState<Basic[]>(initialImages || []);
  const [page, setPage] = useState(2);
  const [isLoading, setIsLoading] = useState(false);

  // Reset state when search query changes
  useEffect(() => {
    setImages(initialImages || []);
    setPage(2);
  }, [searchQuery, initialImages]);

  const fetchMoreWallpaper = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const result = await getWallpaper({ page, query: searchQuery });
      if (result && result.length > 0) {
        setImages((prev) => [...prev, ...result]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error fetching more wallpapers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (inView) {
      fetchMoreWallpaper();
    }
  }, [inView, searchQuery]); // Add searchQuery as dependency

  return (
    <>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="-ml-4 flex w-auto"
        columnClassName="pl-4 mb-10"
      >
        {images?.map((image) => (
          <div key={image.id} className="group relative mb-4">
            <Link href={`/photos/${image.id}`} className="block">
              <BlurImage
                src={image.urls.regular}
                alt={image.alt_description || "Unsplash Image"}
                width={image.width}
                height={image.height}
                blurHash={image.blur_hash || ""}
                className="h-auto w-full rounded-lg shadow-md transition-all duration-300 ease-in-out group-hover:shadow-xl"
              />
              <div className="absolute inset-0 flex flex-col justify-between rounded-lg bg-black bg-opacity-0 p-4 opacity-0 transition-opacity duration-300 group-hover:bg-opacity-30 group-hover:opacity-100">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <Image
                      src={image.user.profile_image.small || "/placeholder.svg"}
                      alt={image.user.name}
                      width={32}
                      height={32}
                      className="mr-2 rounded-full"
                    />
                    <span className="text-sm font-semibold text-white">
                      {image.user.name}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-white">
                  <Heart className="size-4" />
                  {image.likes}
                </div>
              </div>
            </Link>
            <DownloadButton
              imageId={image.id}
              downloadLink={image?.links?.download}
              downloadLocation={image?.links?.download_location}
            />
          </div>
        ))}
      </Masonry>
      {images.length > 0 && (
        <div ref={ref} className="my-3 flex items-center justify-center">
          <Loader2
            className={`size-6 ${isLoading ? "animate-spin" : "opacity-0"}`}
          />
        </div>
      )}
    </>
  );
}
