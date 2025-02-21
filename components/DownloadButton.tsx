"use client";

import { Basic } from "unsplash-js/dist/methods/photos/types";
import { handleDownload } from "../lib/utils";
import { Download } from "lucide-react";

export const DownloadButton = ({ image }: { image: Basic }) => {
  return (
    <a
      href={image?.links?.download + "&force=true"}
      download={`${image.id}.jpg`}
      target="_blank"
      rel="noopener noreferrer"
      className="absolute bottom-4 right-4 text-white opacity-0 transition-colors duration-200 hover:text-gray-200 group-hover:opacity-100"
      onClick={async (e) => {
        e.preventDefault(); // Prevents default navigation
        await handleDownload(image);
      }}
    >
      <Download className="size-5" />
    </a>
  );
};
