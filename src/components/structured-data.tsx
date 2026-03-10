import { DATA } from "@/data/resume";

export default function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: DATA.name,
    url: DATA.url,
    image: `${DATA.url}${DATA.avatarUrl}`,
    jobTitle: "Full Stack Developer",
    worksFor: DATA.work.map((w) => ({
      "@type": "Organization",
      name: w.company,
      url: w.href,
    })),
    sameAs: Object.values(DATA.contact.social).map((s) => s.url),
    description: DATA.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "New Delhi",
      addressCountry: "IN",
    },
    alumniOf: DATA.education.map((e) => ({
      "@type": "EducationalOrganization",
      name: e.school,
      url: e.href,
    })),
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${DATA.name} | Portfolio`,
    url: DATA.url,
    description: DATA.description,
    author: {
      "@type": "Person",
      name: DATA.name,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([personSchema, websiteSchema]),
      }}
    />
  );
}
