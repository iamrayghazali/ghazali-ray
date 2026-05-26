import './App.css'
import {ThemeToggle} from "@/components/custom/ThemeToggle.jsx";
import Hero from "@/pages/home/Hero.jsx";
import Navbar from "@/components/custom/Navbar.jsx";
import {LightRays} from "@/components/ui/light-rays.jsx";

function App() {

  return (
    <>
      <LightRays />
        <Navbar />
        <Hero></Hero>
    </>
  )
}

export default App
