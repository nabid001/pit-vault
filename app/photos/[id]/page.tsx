import { Gallery } from "@/components/Gallery";

import WallpaperDetail from "@/components/WallpaperDetail";
import { getRelatedPhotos, getWallpaperById } from "@/lib/fetch";

import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import Header from "../_components/Header";

const Photos = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const [wallpaper, relatedWallpaper] = await Promise.all([
    getWallpaperById(id),
    getRelatedPhotos(id),
  ]);

  if (!wallpaper) {
    return notFound();
  }
  return (
    <>
      <div className="min-h-screen">
        <Header
          wallpaperId={wallpaper.id}
          username={wallpaper.user.username}
          avatar={wallpaper.user.profile_image.medium}
          download={wallpaper.links.download}
          downloadLocation={wallpaper.links.download_location}
        />
        <WallpaperDetail photo={wallpaper} />
      </div>
      <div className="root-container mt-10">
        <h1 className="text-2xl font-bold">Related Photos</h1>
        <div className="mt-5">
          <Suspense fallback="Loading related photos...">
            <Gallery initialImages={relatedWallpaper} />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default Photos;
