import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';
import { getAllServices } from '@/lib/services';

export default function sitemap(): MetadataRoute.Sitemap {
  const url = process.env.NEXT_PUBLIC_SITE_URL || 'https://outrick.com';
  const posts = getAllPosts();
  const services = getAllServices();

  const blogPostUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const serviceUrls: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${url}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    {
      url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${url}/score`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${url}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${url}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...serviceUrls,
    ...blogPostUrls,
  ];
}
