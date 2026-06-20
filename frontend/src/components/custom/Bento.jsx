import {BentoCard, BentoGrid} from "@/components/ui/bento-grid.jsx";
import { MdBrush } from "react-icons/md";
import { BiServer } from "react-icons/bi";
import { GoProjectRoadmap } from "react-icons/go";
import { FiMail } from "react-icons/fi";
import {DotPattern} from "@/components/ui/dot-pattern.jsx";
import {cn} from "@/lib/utils.js";
import {BlurFade} from "@/components/ui/blur-fade.jsx";
import {ScrollVelocityContainer, ScrollVelocityRow} from "@/components/ui/scroll-based-velocity.jsx";
import { PROJECTS } from "@/providers/projects-provider.js";
import { MdCode } from "react-icons/md";
import IphoneNotification from "@/components/custom/IphoneNotification.jsx";
import favicon from "../../../public/assets/gmail.svg"


export default function Bento() {
    const features = [
        {
            Icon: FiMail,
            name: "Contact",
            description: "Use the calendar to filter your files by date.",
            href: "/contact",
            cta: "Contact me",
            background: (
                <BlurFade blur="6px" delay={0.35} inView className="flex justify-center mt-2 relative">
                    <IphoneNotification
                        icon={favicon}
                        title="Ray Ghazali"
                        message="Hey! Let's talk"
                    />
                </BlurFade>
            ),
            className: "lg:col-start-1 lg:col-end-3 lg:row-start-3 lg:row-end-4",

        },
        {
            Icon: MdCode,
            name: "Projects",
            description:
                "Check out my project on GitHub",
            href: "https://github.com/iamrayghazali",
            cta: "Checkout my projects",
            background: (
                <div className="lg:relative">
                    <ScrollVelocityContainer className="dark:opacity-40 opacity-70 absolute md:top-8 top-3 left-0 text-4xl font-bold md:text-7xl -z-10">
                        <ScrollVelocityRow baseVelocity={5} direction={1} >
                            {PROJECTS.map((project) => (
                                <img src={project.src}
                                     alt="Project Image"
                                     loading="lazy"
                                     decoding="async"
                                     className="pr-5 max-h-20 rounded-lg transform-gpu blur-[0.5px] transition-all duration-300 ease-out hover:blur-none flex items-center justify-center"
                                />
                            ))}
                        </ScrollVelocityRow>
                    </ScrollVelocityContainer>


                </div>),
            className: "lg:col-start-1 lg:col-end-3 lg:row-start-1 lg:row-end-2",
        },
        {
            Icon: MdBrush,
            name: "Design",
            description: "We automatically save your files as you type.",
            href: "https://github.com/iamrayghazali",
            cta: "Checkout my projects",
            background: (
                <>
                    <DotPattern
                        glow={true}
                        className={cn(
                            "mask-[radial-gradient(300px_circle_at_center,white,transparent)] dark:opacity-40 opacity-70"
                        )}
                    />
                </>
            ),
            className: "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-4",
        },
        {
            Icon: GoProjectRoadmap,
            name: "Front End",
            description: "Search through all your files in one place.",
            href: "/",
            cta: "Checkout my projects",
            background: (
                <>
                    <div className="flex items-center justify-end mt-2 mr-2">
                        <GoProjectRoadmap className="text-5xl dark:opacity-40 opacity-70"></GoProjectRoadmap>
                    </div>
                </>
            ),
            className: "lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3",

        },
        {
            Icon: BiServer,
            name: "Back End",
            description: "Supports 100+ languages and counting.",
            href: "/",
            cta: "Checkout my projects",
            background: (
                <div className="flex items-center justify-end mt-2 mr-2">
                    <BiServer className="text-6xl dark:opacity-40 opacity-70"></BiServer>
                </div>
            ),
            className: "lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-3",

        },
    ]

    return (
        <div id="bento" className="min-h-screen mx-auto flex justify-center items-center max-w-6xl">

            <BlurFade delay={0.2} inView>
                <h1 className="p-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl text-shadow">
                    Quick access
                </h1>

                <BentoGrid className="">
                {features.map((feature) => (
                    <BentoCard key={feature.name} {...feature} />
                ))}
            </BentoGrid>
                </BlurFade>
        </div>
    )
}