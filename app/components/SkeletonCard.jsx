
const SkeletonCard = () => {
    return (
      <div className="animate-pulse bg-white rounded-xl p-4 shadow-md space-y-4">
        <div className="h-3 bg-gray-300 rounded w-1/2" />
        <div className="h-3 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-2/3" />
      </div>
    );
  };
  
  export default SkeletonCard;
  