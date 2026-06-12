import {BentoCard, BentoGrid} from "@/components/ui/bento-grid.jsx";

import { MdBrush } from "react-icons/md";

import { BiServer } from "react-icons/bi";


import { GoProjectRoadmap } from "react-icons/go";


import { FiMail } from "react-icons/fi";
import { RiLinkedinBoxFill } from "react-icons/ri";
import {DotPattern} from "@/components/ui/dot-pattern.jsx";
import {cn} from "@/lib/utils.js";
import {BlurFade} from "@/components/ui/blur-fade.jsx";

export default function Bento() {
    const features = [
        {
            Icon: MdBrush,
            name: "Design",
            description: "We automatically save your files as you type.",
            href: "https://github.com/iamrayghazali",
            cta: "Checkout my projects",
            background: (
                <></>
            ),
            className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
        },
        {
            Icon: GoProjectRoadmap,
            name: "Front End",
            description: "Search through all your files in one place.",
            href: "/",
            cta: "Checkout my projects",
            background: (
                <></>
            ),
            className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
        },
        {
            Icon: BiServer,
            name: "Back End",
            description: "Supports 100+ languages and counting.",
            href: "/",
            cta: "Checkout my projects",
            background: (
                <></>
            ),
            className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
        },
        {
            Icon: FiMail,
            name: "Contact",
            description: "Use the calendar to filter your files by date.",
            href: "/",
            cta: "Contact me",
            background: (
                <DotPattern
                    glow={true}
                    className={cn(
                        "mask-[radial-gradient(300px_circle_at_center,white,transparent)]"
                    )}
                />            ),
            className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
        },
        {
            Icon: RiLinkedinBoxFill,
            name: "Projects",
            description:
                "Get notified when someone shares a file or mentions you in a comment.",
            href: "/",
            cta: "Checkout my projects",
            background: (
              <></>
            ),
            className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
        },
    ]

    return (
        <div id="bento" className="min-h-screen flex justify-center items-center ">

            <BlurFade delay={0.2} inView>
                <h1 className="p-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl text-shadow">
                    Quick access
                </h1>

                <BentoGrid className="lg:grid-rows-3">
                {features.map((feature) => (
                    <BentoCard key={feature.name} {...feature} />
                ))}
            </BentoGrid>
                </BlurFade>
        </div>
    )
}