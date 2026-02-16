export default function Spinner({ size = "size-12", sizeInner = "size-6" }: { size?: string, sizeInner?: string }) {
    return (
        <div className="relative">
            {/* Elegant Loading Spinner */}
            <div className={`${size} rounded-full border-[3px] border-primary/5 shadow-[0_0_20px_rgba(0,0,0,0.05)]`} />
            <div className={`absolute inset-0 ${size} rounded-full border-[3px] border-primary border-t-transparent animate-spin duration-1000`} />

            {/* Inner pulse */}
            <div className={`absolute inset-0 m-auto ${sizeInner} rounded-full bg-primary/10 animate-pulse`} />
        </div>
    )
}