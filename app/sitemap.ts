import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const url = process.env.NEXT_PUBLIC_SITE_URL || 'https://outrick.com';

  return [
    {
      url: url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: {
          en: `${url}/en`,
          es: `${url}/es`,
        },
      },
    },
  ];
}
