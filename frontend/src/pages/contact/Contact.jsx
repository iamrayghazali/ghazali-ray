import Navbar from "@/components/custom/Navbar.jsx";
import {DiaTextReveal} from "@/components/ui/dia-text-reveal.jsx";
import ContactForm from "@/components/custom/ContactForm.jsx";
import {Separator} from "@/components/ui/separator.jsx";
import { TbCopy } from "react-icons/tb";
import {toast} from "sonner";



export default function Contact() {

    const email = "ghazali.raydan@gmail.com";


    const copyText = async () => {
        try {
            await navigator.clipboard.writeText(email);
            toast.success("Copied!", { position: "bottom-right" });
        } catch (err) {
            toast.error("Couldn't copy — try manually selecting it", { position: "bottom-right" });
        }
    };

    return (
        <section className="min-h-screen">
            <Navbar />
            <div className="flex flex-col items-center justify-center w-full mt-40">
                <DiaTextReveal
                    className="text-4xl font-bold tracking-tight text-shadow"
                    text="Let's talk"
                    delay={0.7}
                    colors={["#f97316"]}
                />
                <ContactForm />
                <Separator className="w-2/3 mt-5" />
                <div className="flex flex-col items-center justify-center w-full mt-10">
                    <p className="mb-4">Or copy my email</p>
                    <div className="flex items-center justify-center gap-2" onClick={copyText}>
                        <p className="text-sm text-gray-500">{email}</p>
                        <Separator className="h-6" orientation="vertical"/>
                        <TbCopy className=""></TbCopy>
                    </div>
                </div>
            </div>
        </section>
    );
};