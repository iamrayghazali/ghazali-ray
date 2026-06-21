import {AnimatedThemeToggler} from "@/components/ui/animated-theme-toggler.jsx";
import { useLocation, useNavigate} from "react-router-dom";
import {FaGithub, FaLinkedin} from "react-icons/fa";
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet.jsx";
import {RxHamburgerMenu} from "react-icons/rx";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button.jsx";
import { IoHome, IoHomeOutline } from 'react-icons/io5';
import { IoPerson, IoPersonOutline } from 'react-icons/io5';
import {ThemeToggle} from "@/components/custom/ThemeToggle.jsx";
import { Highlighter } from "@/components/ui/highlighter";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import {NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger} from "@/components/ui/navigation-menu.jsx";

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;

    const hidden = useScrollDirection();

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out
        ${hidden ? "-translate-y-full" : "translate-y-0"} gradient-blur border-b-1 w-full md:max-w-lg h-14 md:rounded-b-lg justify-self-center `}
             style={{ paddingTop: "env(safe-area-inset-top)" }} >
            <div className="mx-auto p-2">

            {/* DESKTOP */}
            <div className="hidden md:flex flex-row items-center justify-around gap-5  rounded-none">
                <h1 className=" font-black leading-[0.95] tracking-tight text-2xl cursor-pointer" onClick={() => navigate("/")}>
                    Ray {" "}
                    <Highlighter action="underline" color="#f97316" iterations={3} animationDuration={1500}>
                        Ghazali
                    </Highlighter>
                </h1>
                <div className="flex gap-2">
                    <Button size="lg" variant={pathname === "/" ? "" : "ghost"} onClick={() => navigate("/")}>
                        Home
                    </Button>
                    <Button size="lg" variant={pathname === "/" ? "ghost" : ""} onClick={() => navigate("/contact")}>
                         Contact
                    </Button>
                </div>

                <div className="flex flex-row gap-5">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Links</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="w-34 gap-4">
                                            <Button className="w-full" size="lg" variant="secondary" onClick={() => window.open("https://github.com/iamrayghazali", "_blank")}>
                                                <FaGithub size={25}/> GitHub
                                            </Button>
                                        <Separator className="my-1" />
                                            <Button className="w-full" size="lg" variant="secondary" onClick={() => window.open("https://www.linkedin.com/in/raydan-ghazali/", "_blank")}>
                                                <FaLinkedin size={25}/> LinkedIn
                                            </Button>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                                </NavigationMenuList>
                            </NavigationMenu>

                    <AnimatedThemeToggler duration={600}/>
                </div>
            </div>


            {/* MOBILE NAV */}
            <div className="md:hidden flex justify-between mt-2">
                <Sheet>
                    <h1 className=" font-black leading-[0.95] tracking-tight text-2xl">
                        Ray {" "}
                        <Highlighter action="underline" color="#f97316" iterations={3} animationDuration={1500}>
                            Ghazali
                        </Highlighter>
                    </h1>

                    <SheetTrigger>
                        <RxHamburgerMenu size={22}/>
                    </SheetTrigger>

                    <SheetContent className="gradient-blur border-none">
                        <SheetHeader>

                            <SheetTitle className="mb-5 font-thin tracking-[0.1em] text-white ">Navigation</SheetTitle>
                            <Button size="lg" variant={pathname === "/" ? "" : "secondary"} onClick={() => navigate("/")}>
                                {pathname === "/" ? <IoHome/> : <IoHomeOutline/>} Home
                            </Button>

                            <Button  size="lg" variant={pathname === "/contact" ? "" : "secondary"} onClick={() => navigate("/contact")}>
                                {pathname === "/contact" ? <IoPerson/> : <IoPersonOutline/>} Contact
                            </Button>


                            <Separator className="my-3"></Separator>
                            <SheetTitle className="font-thin tracking-[0.1em] mb-2 text-white">Links</SheetTitle>

                            <div className="flex items-center gap-1">
                                <Button className="w-1/2" size="lg" variant="secondary" onClick={() => window.open("https://github.com/iamrayghazali", "_blank")}>
                                    <FaGithub size={25}/> GitHub
                                </Button>

                                <Button className="w-1/2" size="lg" variant="secondary" onClick={() => window.open("https://www.linkedin.com/in/raydan-ghazali/", "_blank")}>
                                    <FaLinkedin size={25}/> LinkedIn
                                </Button>
                            </div>


                            <Separator className="my-3"></Separator>
                            <SheetTitle className="font-thin tracking-[0.1em] mb-2 text-white ">Theme</SheetTitle>
                            <div className="flex items-center">
                                <ThemeToggle />
                            </div>


                            <Separator className="my-3"></Separator>

                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    </nav>);

}