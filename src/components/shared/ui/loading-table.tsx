import { Skeleton } from "./skeleton";

function LoadingTable() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-16 w-full bg-gray-200" />
      <Skeleton className="h-16 w-full bg-gray-200" />
      <Skeleton className="h-16 w-full bg-gray-200" />
      <Skeleton className="h-16 w-full bg-gray-200" />
      <Skeleton className="h-16 w-full bg-gray-200" />
    </div>
  );
}

export default LoadingTable;
