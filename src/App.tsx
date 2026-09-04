import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { Rooms, Services, Stats, Ticker } from "./components/Sections";
import Carousel3D from "./components/Carousel3D";
import { Faq, Gallery, Schedule, Testimonials } from "./components/Extra";
import Booking from "./components/Booking";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-paper text-ink antialiased">
      <div className="noise-overlay" aria-hidden />
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <Stats />
        <Services />
        <Rooms />
        <Carousel3D />
        <Schedule />
        <Gallery />
        <Testimonials />
        <Ticker className="[--marquee-dur:26s]" />
        <Booking />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
