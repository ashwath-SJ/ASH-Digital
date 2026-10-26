import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Offers from "@/components/Offers";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { readContent } from "@/lib/content";
import { SITE, nav as allNav } from "@/lib/siteData";

// Read fresh content on every visit so admin edits show immediately
export const dynamic = "force-dynamic";

export default async function Home() {
  const { contact, services, projects, offers } = await readContent();
  // The "Projects" section and its menu link appear only after you add a project in /admin
  // The "Offers" section and its menu link appear only when it is switched on in /admin and has a poster
  const showOffers = offers.enabled && offers.posters.length > 0;
  const nav = allNav.filter((n) => (n.href !== "#projects" || projects.length > 0) && (n.href !== "#offers" || showOffers));
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // Structured data for Google (JSON-LD)
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#org`,
        name: SITE.name,
        url: siteUrl,
        logo: `${siteUrl}/logo.png`,
        email: contact.email,
        sameAs: [contact.linkedin, contact.instagram].filter(Boolean),
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: SITE.name,
        publisher: { "@id": `${siteUrl}/#org` },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#service`,
        name: SITE.name,
        url: siteUrl,
        email: contact.email,
        address: { "@type": "PostalAddress", addressLocality: contact.location },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Digital services",
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.title, description: s.text },
          })),
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />
      <Navbar nav={nav} />
      <main>
        <Hero />
        <Marquee />
        <div className="bg-[#111111]">
          <About />
          <Services services={services} />
          <Process />
          {projects.length > 0 && <Projects projects={projects} />}
          {showOffers && <Offers posters={offers.posters} />}
          <Contact contact={contact} services={services} />
        </div>
      </main>
      <Footer contact={contact} nav={nav} />
    </>
  );
}
