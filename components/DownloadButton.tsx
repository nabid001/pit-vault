"use client";

import { handleDownload } from "../lib/utils";
import { Download } from "lucide-react";

export const DownloadButton = ({
  imageId,
  downloadLink,
  downloadLocation,
}: {
  imageId: string;
  downloadLink: string;
  downloadLocation: string;
}) => {
  return (
    <a
      href={downloadLink + "&force=true"}
      download={`${imageId}.jpg`}
      target="_blank"
      rel="noopener noreferrer"
      className="absolute bottom-4 right-4 text-white opacity-0 transition-colors duration-200 hover:text-gray-200 group-hover:opacity-100"
      onClick={async (e) => {
        e.preventDefault(); // Prevents default navigation
        await handleDownload({ download: downloadLink, downloadLocation });
      }}
    >
      <Download className="size-5" />
    </a>
  );
};
