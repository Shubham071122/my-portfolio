import Script from "next/script";
import Navbar from "@/components/navbar";
import { DATA } from "@/data/resume";
import type { Metadata, Viewport } from "next";
import StructuredData from "@/components/structured-data";
import Footer from "@/components/footer";
import React from "react";

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  keywords: [
    "Full Stack Developer",
    "Web Development",
    "React",
    "Next.js",
    "Node.js",
    "AWS",
    "TypeScript",
    "Software Engineer",
    "Portfolio",
    "Shubham",
    "DevOps",
    "Cloud Computing",
  ],
  authors: [{ name: DATA.name, url: DATA.url }],
  creator: DATA.name,
  publisher: DATA.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${DATA.name}`,
    description: DATA.description,
    url: DATA.url,
    siteName: `${DATA.name}`,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/me.jpeg",
        width: 800,
        height: 800,
        alt: DATA.name,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: `${DATA.name}`,
    card: "summary_large_image",
    creator: "@ShubhamRawat_7",
    description: DATA.description,
    images: ["/me.jpeg"],
  },
  verification: {
    google: "9xOKjilHIgxPVMWktiZCP9nNdCWpvA5J6YWrGwBoqHk",
  },
  category: "technology",
};

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-KMB4DVNJ');`}
      </Script>
      <StructuredData />
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-KMB4DVNJ"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
      <div className="max-w-3xl mx-auto pb-12 pt-10 sm:pb-24 sm:pt-18 px-4 sm:px-6">
        {children}
        <Footer />
        <Navbar />
      </div>
    </>
  );
}
