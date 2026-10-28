const JobPostuladoSkeleton = () => (
    <div className="flex animate-pulse flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4">
        <div className="h-6 w-20 rounded-full bg-gray-200" />
        <div className="h-6 w-1/2 rounded bg-gray-200" />
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-4/6 rounded bg-gray-200" />
        <div className="h-4 w-3/5 rounded bg-gray-200" />

        <div className="flex gap-2">
            <div className="h-8 w-36 rounded-full bg-gray-200" />
            <div className="h-8 w-24 rounded-full bg-gray-200" />
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
            <div className="h-8 w-24 rounded bg-gray-200" />
            <div className="h-10 w-28 rounded-lg bg-gray-200" />
        </div>
    </div>
);

export default JobPostuladoSkeleton;
