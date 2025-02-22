"use server";

import { createApi } from "unsplash-js";
import { Full } from "unsplash-js/dist/methods/photos/types";
const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY!,
});

export const getWallpaper = async ({
  page = 1,
  query,
  count = 25,
}: {
  page?: number;
  query?: string;
  count?: number;
}) => {
  try {
    const result = await unsplash.photos.getRandom({ count });

    return result.response;
  } catch (error) {
    console.error("Error fetching photos:", error);
  }
};

export const getWallpaperById = async (id: string) => {
  try {
    const wallpaper = await unsplash.photos.get({ photoId: id });

    return wallpaper.response;
  } catch (error) {
    console.log(`Failed to get wallpaper`, error);
  }
};

export async function getRelatedPhotos(photoId: string) {
  try {
    // First, get the photo to extract its topics and tags
    const photoResult = await unsplash.photos.get({ photoId });

    if (photoResult.type !== "success") {
      throw new Error("Failed to fetch photo details");
    }

    const photo = photoResult.response;

    // Combine topics and tags for better relevance
    const searchTerms = [
      ...(photo.tags || []).map((tag: { title: string }) => tag.title),
      photo.color || "",
    ].filter(Boolean);

    // If we have search terms, use them to find related photos
    if (searchTerms.length > 0) {
      const searchQuery = searchTerms.slice(0, 3).join(" ");
      const relatedResult = await unsplash.search.getPhotos({
        query: searchQuery,
        perPage: 25,
        orientation: photo.height > photo.width ? "portrait" : "landscape",
      });

      if (relatedResult.type === "success") {
        // Filter out the original photo and ensure uniqueness
        return relatedResult.response.results.filter(
          (relatedPhoto) => relatedPhoto.id !== photoId
        );
      }
    }

    // Fallback: If no good search terms or search fails, get random photos
    const randomResult = await unsplash.photos.getRandom({
      count: 6,
      orientation: photo.height > photo.width ? "portrait" : "landscape",
    });

    if (randomResult.type === "success") {
      const photos = Array.isArray(randomResult.response)
        ? randomResult.response
        : [randomResult.response];
      return photos.filter((p) => p.id !== photoId);
    }

    return [];
  } catch (error) {
    console.error("Error fetching related photos:", error);
    return [];
  }
}
