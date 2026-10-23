const JobCardSkeleton = () => {
    return (
        <div className="flex min-h-[340px] w-full animate-pulse flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

            <div className="h-6 w-3/4 rounded bg-gray-200" />

            <div className="mt-3 h-4 w-1/2 rounded bg-gray-200" />

            <div className="mt-4 space-y-2">
                <div className="h-4 w-full rounded bg-gray-200" />
                <div className="h-4 w-5/6 rounded bg-gray-200" />
                <div className="h-4 w-4/6 rounded bg-gray-200" />
            </div>

            <div className="mt-4 h-10 rounded-xl bg-gray-200" />
        </div>
    );
};

export default JobCardSkeleton;
