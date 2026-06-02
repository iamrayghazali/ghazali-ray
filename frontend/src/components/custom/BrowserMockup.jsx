export default function BrowserMockup({ imageSrc, url }) {
    return (
        <div className="overflow-hidden rounded-xl border border-border bg-white shadow-2xl">
            {/* Browser Top Bar */}
            <div className="flex items-center gap-1 border-b border-border px-4 py-3">
                <div className="h-2 w-2 rounded-full bg-red-500/50" />
                <div className="h-2 w-2 rounded-full bg-yellow-500/50" />
                <div className="h-2 w-2 rounded-full bg-green-500/50" />

                <div className="ml-4 flex-1">
                    <div className="truncate rounded-md bg-gray-300 px-3 py-1 text-center text-[6px] md:text-[8px] text-black">
                        {url}
                    </div>
                </div>
            </div>

            {/* Screenshot */}
            <div className=" w-full overflow-hidden bg-muted">
                <img
                    src={imageSrc}
                    alt=""
                    loading="lazy"
                    className="h-auto w-full  object-top"
                />
            </div>
        </div>
    );
}