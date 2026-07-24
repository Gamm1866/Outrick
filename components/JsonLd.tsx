export default function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': 'https://www.outrick.net/#business',
        name: 'Outrick',
        url: 'https://www.outrick.net',
        description: 'Data-driven growth consulting for SMBs. Performance metrics, UX optimization, AI automation.',
        serviceType: 'Business Growth Consulting',
        telephone: '+19045904962',
        email: 'sales@outrick.net',
        // TODO: añadir perfiles reales para reforzar la entidad ante Google e IAs.
        // sameAs: ['https://www.facebook.com/…', 'https://www.instagram.com/…', 'https://www.linkedin.com/company/…'],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Hollywood',
          addressRegion: 'FL',
          addressCountry: 'US',
        },
        areaServed: {
          '@type': 'Country',
          name: 'United States',
        },
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
      },
      {
        '@type': 'WebSite',
        '@id': 'https://www.outrick.net/#website',
        url: 'https://www.outrick.net',
        name: 'Outrick',
        publisher: { '@id': 'https://www.outrick.net/#business' },
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://www.outrick.net/#faq',
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
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
