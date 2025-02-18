"use client";

import { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import { createApi } from "unsplash-js";
import { BlurImage } from "@/components/blur-image";

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY!,
});

export default function Home() {
  const [images, setImages] = useState<Array<any>>([]);
  const [page, setPage] = useState(1);

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
    fetchImages();
  }, []); // Removed page from dependencies

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

  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-4xl font-bold text-gray-800">
        Discover Amazing Photos
      </h1>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-auto"
        columnClassName="bg-clip-padding px-2"
      >
        {images.map((image) => (
          <div key={image.id} className="mb-4">
            <BlurImage
              src={image.urls.regular}
              alt={image.alt_description || "Unsplash Image"}
              width={image.width}
              height={image.height}
              blurHash={image.blur_hash}
              className="h-auto w-full rounded-lg shadow-md transition-shadow duration-300 ease-in-out hover:shadow-xl"
            />
          </div>
        ))}
      </Masonry>
    </main>
  );
}
