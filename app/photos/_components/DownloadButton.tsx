"use client";

import { Button } from "@/components/ui/button";
import { handleDownload } from "@/lib/utils";

const DownloadButton = ({
  download,
  downloadLocation,
  wallpaperId,
}: {
  download: string;
  downloadLocation: string;
  wallpaperId: string;
}) => {
  return (
    <Button variant="outline" className="rounded-full" asChild>
      <a
        href={download + "&force=true"}
        download={`${wallpaperId}.jpg`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={async (e) => {
          e.preventDefault();
          await handleDownload({ download, downloadLocation });
        }}
      >
        Download
      </a>
    </Button>
  );
};

export default DownloadButton;
