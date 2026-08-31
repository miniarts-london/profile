import type { Metadata } from "next";
import { IBM_Plex_Mono, Instrument_Serif, Outfit } from "next/font/google";
import "./globals.css";

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const ibm = IBM_Plex_Mono({
  variable: "--font-ibm",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://miniarts.uk"),
  title: "Kaori Nishimura — Senior Front-End Engineer",
  description:
    "Portfolio of Kaori Nishimura, a London-based senior front-end engineer. Eighteen years in front-end, including seven years in React — AI products, migrations, and careful user experience.",
  authors: [{ name: "Kaori Nishimura" }],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${instrument.variable} ${outfit.variable} ${ibm.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-paper font-sans text-ink">{children}</body>
    </html>
  );
}
