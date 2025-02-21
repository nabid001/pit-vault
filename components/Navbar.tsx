import Link from "next/link";
import { Camera } from "lucide-react";

export function Navbar() {
  return (
    <nav className="bg-white shadow dark:bg-gray-800">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Camera className="size-6 text-gray-800 dark:text-white" />
            <Link
              href="/"
              className="ml-2 text-xl font-bold text-gray-800 dark:text-white"
            >
              Pic Vault
            </Link>
          </div>

          <div className="flex items-center">
            <Link
              href="/"
              className="px-3 py-2 text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-400"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
