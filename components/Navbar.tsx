import Link from "next/link";
import { Camera } from "lucide-react";

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white shadow dark:bg-gray-800">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="">
            <Link
              href="/"
              className="ml-2 flex items-center gap-1 text-xl font-bold text-gray-800 dark:text-white"
            >
              <Camera className="size-6 text-gray-800 dark:text-white" />
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
      </nav>
    </header>
  );
}
