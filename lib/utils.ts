import { clsx, type ClassValue } from "clsx";
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

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
