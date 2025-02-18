import { Button } from "@/components/ui/button";

const categories = [
  "Nature",
  "Travel",
  "Architecture",
  "Food",
  "Animals",
  "Technology",
  "People",
];

interface PopularCategoriesProps {
  onCategorySelect: (category: string) => void;
}

export function PopularCategories({
  onCategorySelect,
}: PopularCategoriesProps) {
  return (
    <div className="my-4 flex flex-wrap justify-center gap-2">
      {categories.map((category) => (
        <Button
          key={category}
          variant="outline"
          onClick={() => onCategorySelect(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
