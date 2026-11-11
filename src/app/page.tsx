import { resolveAssets, resolveGallery } from "@/lib/resolve-assets";
import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Facilities from "@/components/sections/Facilities";
import Training from "@/components/sections/Training";
import Membership from "@/components/sections/Membership";
import Contact from "@/components/sections/Contact";
import Gallery from "@/components/sections/Gallery";
import Footer from "@/components/sections/Footer";

export default async function Home() {
  const a = await resolveAssets();
  const gallery = await resolveGallery(a);

  return (
    <>
      <Nav />
      <main>
        <Hero a={a} />
        <About a={a} />
        <Facilities a={a} />
        <Training a={a} />
        <Membership a={a} />
        <Contact a={a} />
        <Gallery columns={gallery} />
      </main>
      <Footer a={a} />
    </>
  );
}
