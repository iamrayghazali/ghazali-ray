import { Button } from "@/components/ui/button";
import {useNavigate} from "react-router-dom";

export default function SkipButton() {
    const navigate = useNavigate();

    return (
        <>
            <div className="fixed md:bottom-15 md:right-15 bottom-4 right-3 font-light z-10">
                <Button variant="secondary" size="lg" className="text-md"
                    onClick={() => {
                        document.getElementById("bento")?.scrollIntoView({
                        behavior: "smooth",
                    });
                }}>SKIP INTRO</Button>
            </div>
        </>
    )
}