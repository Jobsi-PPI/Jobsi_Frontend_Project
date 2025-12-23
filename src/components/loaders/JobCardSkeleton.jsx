const JobCardSkeleton = () => {
    return (
        <div className="w-[300px] min-h-[380px] bg-gray-200 rounded-2xl p-5 animate-pulse flex flex-col justify-between">
            
            <div className="h-6 bg-gray-300 rounded w-3/4" />
            
            <div className="mt-3 h-4 bg-gray-300 rounded w-1/2" />

            <div className="mt-4 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-full" />
                <div className="h-4 bg-gray-300 rounded w-5/6" />
                <div className="h-4 bg-gray-300 rounded w-4/6" />
            </div>

            <div className="mt-4 h-10 bg-gray-300 rounded" />
        </div>
    );
};

export default JobCardSkeleton;
