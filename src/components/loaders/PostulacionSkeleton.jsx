const PostulacionSkeleton = () => (
    <div className="bg-white rounded-xl border-2 border-gray-200 p-4 flex items-center justify-between animate-pulse">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200" />
            <div className="flex flex-col gap-2">
                <div className="h-4 w-36 bg-gray-200 rounded" />
                <div className="h-3 w-52 bg-gray-200 rounded" />
                <div className="h-3 w-24 bg-gray-200 rounded" />
            </div>
        </div>
        <div className="h-9 w-24 bg-gray-200 rounded-lg" />
    </div>
);

export default PostulacionSkeleton;
