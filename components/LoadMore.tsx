"use client";

import { getWallpaper } from "@/lib/fetch";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Gallery } from "./Gallery";
import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY!,
});

const LoadMore = () => {
  const [images, setImages] = useState<Array<any>>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchImages = async () => {
    const result = await unsplash.search.getPhotos({
      query: "nature",
      page: page,
      perPage: 30,
    });
    if (result.response) {
      setImages((prevImages) => [...prevImages, ...result.response.results]);
      setPage((prevPage) => prevPage + 1);
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        fetchImages();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div>
        <Gallery initialImages={images} />
        {isLoading && (
          <div className="flex animate-spin items-center justify-center">
            <Loader2 className="" />
          </div>
        )}
      </div>
    </>
  );
};

export default LoadMore;
