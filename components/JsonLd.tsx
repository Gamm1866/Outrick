export default function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Outrick',
    url: 'https://outrick.com',
    description: 'Data-driven growth consulting for SMBs. Performance metrics, UX optimization, AI automation.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hollywood',
      addressRegion: 'FL',
      addressCountry: 'US',
    },
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Performance metrics setup & continuous tracking',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI-powered automation',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Scientific growth plans with conversion optimization',
          },
        },
      ],
    },
    mainEntity: {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is a Performance Score?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Free 0-100 evaluation of digital presence, delivered in a 15-minute video call.',
          },
        },
        {
          '@type': 'Question',
          name: 'What services does Outrick offer?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Performance metrics, conversion optimization, AI automation, scientific growth plans.',
          },
        },
        {
          '@type': 'Question',
          name: "How does Outrick's process work?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: '5 steps: Audit, Diagnose, Plan, Implement, Measure & Optimize.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is the Performance Score free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, 100% free, no commitment.',
          },
        },
        {
          '@type': 'Question',
          name: 'Where is Outrick located?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '100% digital consultancy based in Hollywood, FL.',
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
