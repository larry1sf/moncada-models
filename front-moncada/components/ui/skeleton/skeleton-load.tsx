import { CardSkeleton } from "@/components/ui/skeleton/card-skeleton";

export default function SkeletonLoad({
    itemsSkeleton,
    type = "product"
}: {
    itemsSkeleton: number;
    type?: "product" | "category";
}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {Array(itemsSkeleton).fill(null).map((_, i) => (
                <CardSkeleton key={i} variant={type} />
            ))}
        </div>
    )
}