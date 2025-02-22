import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { createApi } from "unsplash-js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleDownload = async ({
  download,
  downloadLocation,
}: {
  download: string;
  downloadLocation: string;
}) => {
  const unsplash = createApi({
    accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY!,
  });
  try {
    await unsplash.photos.trackDownload({
      downloadLocation,
    });
    window.location.href = download + "&force=true";
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

export const randomTitle = () => {
  const titles = [
    "Stunning Wallpapers",
    "Beautiful mountain wallpapers",
    "Wallpaper",
    "Windows wallpapers",
    "Landscape wallpapers",
    "Astronomical",
    "Carton Wallpaper",
    "Anime wallpapers",
    "Beautiful anime wallpapers",
  ];

  return titles[Math.floor(Math.random() * titles.length)];
};
