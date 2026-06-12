import {IoBookOutline, IoLockClosed, IoRefreshOutline} from "react-icons/io5";
import {LuPanelLeftDashed} from "react-icons/lu";
import {MdChevronLeft, MdChevronRight} from "react-icons/md";
import { IoShieldHalfSharp } from "react-icons/io5";
import {GoShare} from "react-icons/go";
import {FiPlus} from "react-icons/fi";
import {IoIosRefresh} from "react-icons/io";

export default function BrowserMockup({ imageSrc, url }) {
    return (
        <div className="overflow-hidden rounded-xl border border-border bg-white shadow-2xl">
            {/* Browser Top Bar */}


            <div className="flex items-center gap-1 border-b border-border px-4 py-2 bg-gray-100">
                <div className="h-2 w-2 rounded-full bg-gray-300" />
                <div className="h-2 w-2 rounded-full bg-gray-300" />
                <div className="h-2 w-2 rounded-full bg-gray-300" />
                <LuPanelLeftDashed size={10} className="text-gray-400 ml-2"/>
                <MdChevronLeft size={12} className="text-gray-400"/>
                <MdChevronRight size={12} className="text-gray-400"/>
                <IoShieldHalfSharp  size={10} className="text-gray-400 ml-6 mr-1"/>
                <div className=" flex-1">
                    <div className="relative flex items-center truncate rounded-sm bg-gray-300  py-1 text-center text-[6px] md:text-[8px] text-black">
                        <div className="w-2">

                        </div>
                        <div className="absolute left-1/2 -translate-x-1/2 flex items-center">
                            <IoLockClosed className=""/>
                            {url}
                        </div>
                        <IoIosRefresh  className="ml-auto mr-4"/>
                    </div>
                </div>

                <GoShare size={10} className="text-gray-400 ml-6 mr-1"/>
                <FiPlus size={10} className="text-gray-400 mr-1"/>



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