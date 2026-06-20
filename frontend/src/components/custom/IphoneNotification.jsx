import {ArrowRightIcon} from "@radix-ui/react-icons";

export default function IphoneNotification({
                                               icon,
                                               appName = 'Gmail',
                                               time = "now",
                                               title,
                                               message,
                                               className = "",
                                           }) {
    return (
        <div
            className={`absolute md:opacity-100 dark:opacity-40 opacity-70 top-0 w-80 md:w-full max-w-[380px] rounded-[10px] bg-white/70 dark:bg-neutral-800/60 backdrop-blur-xl backdrop-saturate-150 ring-1 ring-black/5 dark:ring-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-none px-3 md:py-2 py-1 overflow-hidden ${className}`}
        >
            <div className="flex items-start gap-2.5">
                <div className="h-8 w-8 shrink-0 overflow-hidden mt-2">
                    {icon ? (
                        <img src={icon} alt="" className="w-10 object-cover" />
                    ) : (
                        <div className="h-full w-full bg-neutral-300 dark:bg-neutral-600" />
                    )}
                </div>

                <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                        <span className="text-[10px] font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                            {appName}
                        </span>
                        <span className="shrink-0 text-[11px] text-neutral-400 dark:text-neutral-500">
                            {time}
                        </span>
                    </div>

                    <p className="mt-0.2 text-[14px] font-semibold leading-tight text-neutral-900 dark:text-white truncate">
                        {title}
                    </p>

                    <p className="text-[13.5px] leading-snug text-neutral-700 dark:text-neutral-300 line-clamp-2 flex">
                        {message}
                        <ArrowRightIcon className="ms-2 mt-[0.5px] h-4 w-4 rtl:rotate-180" />
                    </p>
                </div>
            </div>

            {/* mobile-only bottom blur fade */}
        </div>
    );
}