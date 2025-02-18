import { clsx, type ClassValue } from "clsx";
import { randomUUID } from "crypto";
import { twMerge } from "tailwind-merge";
import { createApi } from "unsplash-js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleDownload = async (image: any) => {
  const unsplash = createApi({
    accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY!,
  });
  try {
    await unsplash.photos.trackDownload({
      downloadLocation: image.links.download_location,
    });
    window.location.href = image.links.download + "&force=true";
  } catch (error) {
    console.error("Download failed", error);
  }
};

export const uniqId = (id: string) => {
  return `${id}+${randomUUID}`;
};
