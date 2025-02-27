import Category from "@/components/Category";
import { Gallery } from "@/components/Gallery";
import { GallerySkeleton } from "@/components/GallerySkeleton";
import { SearchBar } from "@/components/Searchbar";
import { getWallpaper } from "@/lib/fetch";
import { Suspense } from "react";
import type { Basic } from "unsplash-js/dist/methods/photos/types";

const Home = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string | undefined };
}) => {
  const search = await searchParams.search;

  const data: Basic[] = (await getWallpaper({ query: search })) || [];
  console.log(data);

  return (
    <main className="root-container pb-5">
      <div className="mt-20 flex flex-col flex-wrap items-center justify-center sm:mt-24">
        <h1 className="text-center text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl">
          Discover Beautiful Images
        </h1>
        <p className="mb-9 max-w-2xl text-center text-sm text-gray-400 sm:mb-4 sm:mt-5 sm:text-base">
          Browse through our collection of high-quality photos from talented
          photographers around the world.
        </p>
        <div className="w-full max-w-md sm:mt-6">
          <Suspense
            fallback={
              <div className="h-10 w-full animate-pulse rounded-md bg-gray-200"></div>
            }
          >
            <SearchBar />
          </Suspense>
        </div>
      </div>

      <div className="mt-4">
        <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-4 sm:gap-3 md:justify-center">
          <Category />
        </div>
      </div>

      <div className="mt-5 sm:mt-10">
        <Suspense fallback={<GallerySkeleton />}>
          <Gallery initialImages={data} searchQuery={search || ""} />
        </Suspense>
      </div>
    </main>
  );
};

export default Home;
