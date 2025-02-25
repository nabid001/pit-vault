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

let page = 2;

export function Gallery({
  initialImages,
  searchQuery,
}: {
  initialImages: Basic[];
  searchQuery: string;
}) {
  const { ref, inView } = useInView();
  const [images, setImages] = useState<Basic[]>(initialImages || []);

  const fetchMoreWallpaper = async () => {
    const result = await getWallpaper({ page, query: searchQuery });
    if (result) {
      page++;
      setImages((prev) => [...prev, ...result]);
    }
  };

  useEffect(() => {
    if (inView) {
      fetchMoreWallpaper();
    }
  }, [inView]);
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
      <div ref={ref} className="my-3 flex items-center justify-center">
        <Loader2 className="size-6 animate-spin" />
      </div>
    </>
  );
}
