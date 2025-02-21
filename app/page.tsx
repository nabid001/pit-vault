import { Gallery } from "@/components/Gallery";
import { SearchBar } from "@/components/Searchbar";
import { getWallpaper } from "@/lib/fetch";
import { Suspense } from "react";
import { Basic } from "unsplash-js/dist/methods/photos/types";

const Home = async () => {
  const data: Basic[] = await getWallpaper({});

  return (
    <main className="root-container">
      <div className="mb-8 flex flex-col items-center">
        <Suspense fallback="Loading...">
          <SearchBar />
        </Suspense>
      </div>
      <Gallery initialImages={data} />
    </main>
  );
};

export default Home;
