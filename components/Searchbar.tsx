"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useQueryState } from "nuqs";

export function SearchBar() {
  const [query, setQuery] = useQueryState("search", {
    defaultValue: "",
    shallow: false,
    throttleMs: 500,
  });

  return (
    <div className="relative w-full ">
      <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
        <Search className="size-4 text-gray-400" />
      </div>
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search wallpaper..."
        className=" w-full rounded-full border border-gray-300 py-2 pl-10 pr-4 transition-all focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
      />
    </div>
  );
}
