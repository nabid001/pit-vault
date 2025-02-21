"use server";

import { createApi } from "unsplash-js";

export const getWallpaper = async ({
  page = 1,
  query,
  count = 25,
}: {
  page?: number;
  query?: string;
  count?: number;
}) => {
  const unsplash = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY!,
  });

  try {
    const result = await unsplash.photos.getRandom({ count });

    return result.response;
  } catch (error) {
    console.error("Error fetching photos:", error);
  }
};
