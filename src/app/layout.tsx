import type { Metadata, Viewport } from "next";
import { Montserrat, Yellowtail, Noto_Serif_Kannada } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import SmoothScroll from "@/components/providers/SmoothScroll";
import WhatsAppFab from "@/components/ui/WhatsAppFab";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", display: "swap" });
const yellowtail = Yellowtail({ weight: "400", subsets: ["latin"], variable: "--font-yellowtail", display: "swap" });
const kannada = Noto_Serif_Kannada({
  weight: ["400", "600"],
  subsets: ["kannada"],
  variable: "--font-kannada",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.shortName} Vyayama Shale | Gym in Hosangadi, Manjeshwar`,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  keywords: [
    "gym Hosangadi",
    "gym Manjeshwar",
    "gym Bangramanjeshwar",
    "vyayama shale",
    "fitness Kasaragod",
    "Veera Maruthi gym",
  ],
  openGraph: {
    title: site.name,
    description: site.description,
    type: "website",
    locale: "en_IN",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f3ec",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ExerciseGym",
  name: site.name,
  description: site.description,
  telephone: site.phones[0],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Hosangadi, Bangramanjeshwar",
    addressLocality: "Manjeshwar",
    addressRegion: "Kerala",
    postalCode: "671323",
    addressCountry: "IN",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${yellowtail.variable} ${kannada.variable}`}>
      <body className="antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <SmoothScroll>{children}</SmoothScroll>
        <WhatsAppFab />
      </body>
    </html>
  );
}
