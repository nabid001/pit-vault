import { Gallery } from "@/components/Gallery";
import WallpaperDetail from "@/components/WallpaperDetail";
import { getRelatedPhotos, getWallpaperById } from "@/lib/fetch";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

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
      <WallpaperDetail photo={wallpaper} />
      <div className="mt-10 root-container">
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
