"use client";

import { Input } from "@/components/ui/input";

import { useQueryState } from "nuqs";

export function SearchBar() {
  const [query, setQuery] = useQueryState("search", {
    defaultValue: "",
    shallow: false,
    throttleMs: 300,
  });
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search wallpaper..."
        className="grow rounded-md shadow-sm"
      />
    </div>
  );
}
