"use server";

import { createApi } from "unsplash-js";

export const getWallpaper = async () => {
  try {
    const unsplash = createApi({
      accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY!,
    });

    const photo = unsplash.photos.getRandom({ count: 1 });

    return (await photo).response;
  } catch (error) {
    console.log(error);
  }
};
