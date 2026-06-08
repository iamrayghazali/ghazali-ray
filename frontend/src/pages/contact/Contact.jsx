import Navbar from "@/components/custom/Navbar.jsx";
import {DiaTextReveal} from "@/components/ui/dia-text-reveal.jsx";
import ContactForm from "@/components/custom/ContactForm.jsx";



export default function Contact() {
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
            </div>
        </section>
    );
};