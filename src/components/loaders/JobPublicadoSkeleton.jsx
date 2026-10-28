const JobPublicadoSkeleton = () => (
    <div className="flex animate-pulse flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4">
        <div className="h-6 w-20 rounded-full bg-gray-200" />
        <div className="h-6 w-2/3 rounded bg-gray-200" />
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-5/6 rounded bg-gray-200" />

        <div className="flex gap-2">
            <div className="h-8 w-28 rounded-full bg-gray-200" />
            <div className="h-8 w-24 rounded-full bg-gray-200" />
        </div>

        <div className="flex items-end justify-between border-t border-gray-100 pt-3">
            <div className="h-8 w-24 rounded bg-gray-200" />
            <div className="flex flex-col items-end gap-2">
                <div className="flex gap-2">
                    <div className="h-10 w-24 rounded-lg bg-gray-200" />
                    <div className="h-10 w-10 rounded-lg bg-gray-200" />
                </div>
                <div className="h-10 w-32 rounded-lg bg-gray-200" />
            </div>
        </div>
    </div>
);

export default JobPublicadoSkeleton;
