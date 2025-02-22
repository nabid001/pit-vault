"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { formatDate, handleDownload } from "@/lib/utils";

interface WallpaperDetailsProps {
  photo: any;
}

const WallpaperDetail = ({ photo }: WallpaperDetailsProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed inset-x-0 top-16 z-40 flex h-14 items-center justify-between border-b bg-white px-4">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="size-5" />
          </Link>
          <div className="flex items-center gap-3">
            <Image
              src={photo.user.profile_image.medium || "/placeholder.svg"}
              alt={photo.user.name}
              width={32}
              height={32}
              className="rounded-full"
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium">{photo.user.name}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="rounded-full" asChild>
            <a
              href={photo?.links?.download + "&force=true"}
              download={`${photo.id}.jpg`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={async (e) => {
                e.preventDefault();
                await handleDownload(photo);
              }}
            >
              Download
            </a>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-screen-2xl px-4 pt-36">
        {/* Image */}
        <div className="relative flex justify-center">
          <div
            className={`relative transition-opacity duration-300 ${
              isImageLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={photo.urls.full || "/placeholder.svg"}
              alt={photo.alt_description || "Unsplash Photo"}
              width={photo.width}
              height={photo.height}
              className="max-h-[80vh] rounded-lg object-contain"
              onLoadingComplete={() => setIsImageLoaded(true)}
              priority
            />
          </div>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-6 max-w-5xl">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex gap-6">
              <div>
                <div className="text-sm text-gray-500">Views</div>
                <div className="text-lg font-medium">
                  {photo.views?.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Downloads</div>
                <div className="text-lg font-medium">
                  {photo.downloads?.toLocaleString()}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-gray-500">
                Share
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-500">
                Info
              </Button>
            </div>
          </div>

          {/* Details */}
          <div className="grid gap-8 border-t py-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
              {photo.description && (
                <p className="mb-6 text-gray-700">{photo.description}</p>
              )}
              <div className="space-y-4">
                {photo.location && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Location
                    </h3>
                    <p className="text-sm">{photo.location.name}</p>
                  </div>
                )}
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Published on
                  </h3>
                  <p className="text-sm">{formatDate(photo.created_at)}</p>
                </div>
                {photo.exif?.name && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Camera
                    </h3>
                    <p className="text-sm">{photo.exif.name}</p>
                  </div>
                )}
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Free to use under
                  </h3>
                  <p className="text-sm">Unsplash License</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2">
              {photo.tags && (
                <div>
                  <h3 className="mb-3 text-sm font-medium text-gray-500">
                    Related tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {photo.tags.map((tag: any) => (
                      <Link
                        key={tag.title}
                        href={`/?query=${encodeURIComponent(tag.title)}`}
                        className="rounded-md bg-gray-100 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-200"
                      >
                        {tag.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WallpaperDetail;
