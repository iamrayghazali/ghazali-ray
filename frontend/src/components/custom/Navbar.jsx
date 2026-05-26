import {AnimatedThemeToggler} from "@/components/ui/animated-theme-toggler.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {FaGithub, FaLinkedin} from "react-icons/fa";
import {ShinyButton} from "@/components/ui/shiny-button.jsx";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet.jsx";
import {RxHamburgerMenu} from "react-icons/rx";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button.jsx";
import { IoMdMail } from "react-icons/io";
import { IoHome, IoHomeOutline } from 'react-icons/io5';
import { IoPerson, IoPersonOutline } from 'react-icons/io5';
import {useEffect} from "react";
import { Toggle } from "@/components/ui/toggle";
import {ThemeToggle} from "@/components/custom/ThemeToggle.jsx";

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;

    useEffect(() => {
        console.log(pathname);
    }, []);

    return (
        <nav className="p-3 m-2 max-w-2xl mx-auto">
        <div className="flex items-center justify-between ">
            <ShinyButton href="google.com">Let's talk</ShinyButton>

            {/* DESKTOP */}
            <div className="hidden md:flex flex-row items-center justify-between gap-5">

                <div className="">
                    <Button size="lg" variant={pathname === "/" ? "" : "ghost"} onClick={() => navigate("/")}>
                        Home
                    </Button>

                    <Button size="lg" variant={pathname === "/" ? "ghost" : ""} onClick={() => navigate("/")}>
                         Contact
                    </Button>
                </div>
                <a
                    href="https://github.com/"
                    className="text-neutral-800 dark:text-neutral-200 hover:scale-110 transition-all"
                >
                    <FaGithub size={22}/>
                </a>

                <a
                    href="https://linkedin.com/"
                    className="text-neutral-800 dark:text-neutral-200 hover:text-blue-500 hover:scale-110 transition-all"
                >
                    <FaLinkedin size={22}/>
                </a>
                <AnimatedThemeToggler duration={600}/>

            </div>


            {/* MOBILE NAV */}
            <div className="md:hidden flex">
                <Sheet>
                    <SheetTrigger>
                        <RxHamburgerMenu size={22}/>
                    </SheetTrigger>

                    <SheetContent>
                        <SheetHeader>

                            <SheetTitle className="mb-5 font-bold">Navigation</SheetTitle>
                            <Button size="lg" variant={pathname === "/" ? "" : "secondary"} onClick={() => navigate("/")}>
                                {pathname === "/" ? <IoHome/> : <IoHomeOutline/>} Home
                            </Button>

                            <Button  size="lg" variant={pathname === "/contact" ? "" : "secondary"} onClick={() => navigate("/contact")}>
                                {pathname === "/contact" ? <IoPerson/> : <IoPersonOutline/>} Contact
                            </Button>


                            <Separator className="my-3"></Separator>
                            <SheetTitle className="font-thin tracking-[0.1em] mb-2">Links</SheetTitle>

                            <div className="flex items-center gap-1">
                                <Button className="w-1/2" size="lg" variant="secondary" onClick={() => window.open("https://github.com/iamrayghazali", "_blank")}>
                                    <FaGithub size={25}/> GitHub
                                </Button>

                                <Button className="w-1/2" size="lg" variant="secondary" onClick={() => window.open("https://www.linkedin.com/in/raydan-ghazali/", "_blank")}>
                                    <FaLinkedin size={25}/> LinkedIn
                                </Button>
                            </div>


                            <Separator className="my-3"></Separator>
                            <SheetTitle className="font-thin tracking-[0.1em] mb-2">Theme</SheetTitle>
                            <div className="flex items-center">
                                    <ThemeToggle />
                            </div>


                            <Separator></Separator>

                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    </nav>);

}