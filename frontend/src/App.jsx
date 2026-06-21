import './App.css'
import Hero from "@/pages/home/Hero.jsx";
import Navbar from "@/components/custom/Navbar.jsx";
import {LightRays} from "@/components/ui/light-rays.jsx";
import SkipButton from "@/components/custom/SkipButton.jsx";
import Bento from "@/components/custom/Bento.jsx";
import {TooltipProvider} from "@/components/ui/tooltip.jsx";
import ProjectsScroll from "@/pages/home/Projectscroll.jsx";
import ScrollTextReveal from "@/components/custom/ScrollTextReveal.jsx";
import {FaCss3Alt, FaFigma, FaJava, FaJs, FaReact} from "react-icons/fa";
import {SiExpress, SiMongodb, SiMysql, SiPostgresql, SiTailwindcss, SiTypescript} from "react-icons/si";
import BackgroundFX from "@/components/custom/BackgroundFX.jsx";

function App() {

    const techList = [
        {
            label: "The Plan",
            title: "Design.",
            description: "I create websites from A to Z. Batteries included.",
            logos: [
                <FaFigma className="text-muted-foreground" size={50}/>
            ]
        },
        {
            label: "The Visuals",
            title: "Front End.",
            description: "Although I am a Full stack software engineer, I like Front-end work more.",
            logos: [
                <FaReact className="text-muted-foreground" size={50}/>,
                <FaJs className="text-muted-foreground" size={50}/>,
                <SiTypescript className="text-muted-foreground" size={50}/>,
                <FaCss3Alt className="text-muted-foreground" size={50}/>,
                <SiTailwindcss className="text-muted-foreground" size={50}/>,
            ]
        },
        {
            label: "The Brain",
            title: "Back End.",
            description: "From building APIs to databases.",
            logos: [
                <FaJava className="text-muted-foreground" size={50}/>,
                <SiExpress className="text-muted-foreground" size={50}/>,
                <SiMysql className="text-muted-foreground" size={50}/>,
                <SiMongodb className="text-muted-foreground" size={50}/>,
                <SiPostgresql className="text-muted-foreground" size={50}/>
            ]
        },
    ];

    return (
        <TooltipProvider>
            <BackgroundFX />
            <LightRays/>
            <SkipButton/>
            <div className="flex justify-center items-center">
                <Navbar/>
            </div>
            <Hero/>
            {techList.map((tech, index) => (
                <ScrollTextReveal key={index} label={tech.label} title={tech.title} description={tech.description} logos={tech.logos} first={index === 0} />
            ))}
            <ProjectsScroll/>

            <Bento></Bento>
        </TooltipProvider>
    )
}

export default App
