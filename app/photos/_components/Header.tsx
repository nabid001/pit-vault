import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import React from "react";
import DownloadButton from "./DownloadButton";
import Link from "next/link";

interface HeaderProps {
  wallpaperId: string;
  username: string;
  avatar: string;
  download: string;
  downloadLocation: string;
}
const Header = ({
  avatar,
  username,
  wallpaperId,
  download,
  downloadLocation,
}: HeaderProps) => {
  return (
    <header className="fixed inset-x-0 top-16 z-40 flex h-14 items-center justify-between border-b bg-white px-4">
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100"
        >
          <ArrowLeft className="size-5" />
        </Link>
        <div className="flex items-center gap-3">
          <Image
            src={avatar}
            alt={username}
            width={32}
            height={32}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <span className="text-sm font-medium">{username}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <DownloadButton
          download={download}
          downloadLocation={downloadLocation}
          wallpaperId={wallpaperId}
        />
      </div>
    </header>
  );
};

export default Header;
