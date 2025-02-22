import { Gallery } from "@/components/Gallery";
import { SearchBar } from "@/components/Searchbar";
import { getWallpaper } from "@/lib/fetch";
import { Suspense } from "react";
import { Basic } from "unsplash-js/dist/methods/photos/types";

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string | undefined }>;
}) => {
  const search = (await searchParams).search;
  const data: Basic[] = (await getWallpaper({ query: search })) || [];

  return (
    <main className="root-container">
      <div className="mb-10 mt-16 flex flex-col items-center">
        <Suspense fallback="Loading...">
          <SearchBar />
        </Suspense>
      </div>
      <Gallery initialImages={data} />
    </main>
  );
};

export default Home;
