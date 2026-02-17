import Header from "./ui/header";
import Hero from "./ui/hero";
import About from "./ui/about";
import Portfolio from "./ui/portfolio";
import Exhibitions from "./ui/exhibitions";
import Footer from "./ui/footer";
import PetModal from "./ui/pet_model";
import Contact from "./ui/contact";

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <About />
      <Portfolio />
      <Exhibitions />
      <Contact />
      <Footer />
      {/* <PetModal /> */}
    </main>
  );
}
