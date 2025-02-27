"use client";

import { categories } from "@/constant";
import { CategoriesProps } from "@/types/types";
import { useQueryState } from "nuqs";

const Category = () => {
  const [category, setCategory] = useQueryState("search", {
    defaultValue: "",
    shallow: false,
    throttleMs: 300,
  });

  return (
    <>
      {categories.map((item: CategoriesProps) => {
        const isActive = category === item.value;
        return (
          <button
            key={item.id}
            onClick={() => {
              // Toggle logic: if already selected, clear it; otherwise, set it
              if (isActive) {
                setCategory("");
              } else {
                setCategory(item.value);
              }
            }}
            className={`whitespace-nowrap rounded-full bg-gray-100 px-4 py-2 text-sm transition-all hover:bg-gray-200 ${
              isActive
                ? "bg-gray-400 text-white transition-colors hover:bg-gray-300"
                : ""
            }`}
          >
            {item.name}
          </button>
        );
      })}
    </>
  );
};

export default Category;
