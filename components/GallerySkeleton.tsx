export function GallerySkeleton() {
  return (
    <div className="grid animate-pulse grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="aspect-[3/4] rounded-lg bg-gray-200" />
      ))}
    </div>
  );
}
