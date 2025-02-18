"use client";

import { handleDownload } from "../lib/utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DownloadButton = ({ image }: { image: any }) => {
  return (
    <div className="p-2 text-center">
      <a
        href={image.links.download + "&force=true"}
        download={`${image.id}.jpg`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-md bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
        onClick={async (e) => {
          e.preventDefault(); // Prevents default navigation
          await handleDownload(image);
        }}
      >
        Download
      </a>
    </div>
  );
};
