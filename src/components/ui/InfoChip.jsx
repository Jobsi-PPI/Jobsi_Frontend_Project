const InfoChip = ({ icon: Icon, children }) => (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eef2fb] px-3 py-1.5 text-sm font-semibold text-[#1e3a8a]">
        {Icon && <Icon className="h-4 w-4 shrink-0" />}
        {children}
    </span>
);

export default InfoChip;
