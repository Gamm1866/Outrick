import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EmailCapture from '@/components/blog/EmailCapture';
import { getAllPosts, getPostBySlug, type PostSection } from '@/lib/posts';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Outrick`,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `https://outrick.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://outrick.com/blog/${post.slug}`,
      siteName: 'Outrick',
      locale: 'en_US',
      type: 'article',
      publishedTime: post.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  'Growth Strategy': 'text-plasma-purple border-plasma-purple/30 bg-plasma-purple/10',
  'AI Automation': 'text-electric-cyan border-electric-cyan/30 bg-electric-cyan/10',
  'UX & Conversion': 'text-green-400 border-green-400/30 bg-green-400/10',
  'Analytics': 'text-amber-400 border-amber-400/30 bg-amber-400/10',
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function renderSection(section: PostSection, idx: number) {
  switch (section.type) {
    case 'h2':
      return (
        <h2 key={idx} className="font-heading text-2xl font-light text-ghost-white mt-12 mb-5 leading-snug">
          {section.text}
        </h2>
      );
    case 'h3':
      return (
        <h3 key={idx} className="font-heading text-[18px] font-normal text-ghost-white mt-8 mb-3 leading-snug">
          {section.text}
        </h3>
      );
    case 'p':
      return (
        <p key={idx} className="font-body text-[17px] text-mist leading-[1.85] mb-5">
          {section.text}
        </p>
      );
    case 'ul':
      return (
        <ul key={idx} className="mb-6 space-y-2.5 pl-0">
          {section.items?.map((item, i) => (
            <li key={i} className="flex gap-3 font-body text-[16px] text-mist leading-relaxed">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-plasma-purple shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'ol':
      return (
        <ol key={idx} className="mb-6 space-y-3">
          {section.items?.map((item, i) => (
            <li key={i} className="flex gap-4 font-body text-[16px] text-mist leading-relaxed">
              <span className="font-mono text-[13px] text-plasma-purple shrink-0 mt-0.5 w-5">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      );
    case 'blockquote':
      return (
        <blockquote key={idx} className="my-8 pl-5 border-l-2 border-plasma-purple/50">
          <p className="font-body text-[17px] text-ghost-white/80 italic leading-relaxed">
            {section.text}
          </p>
        </blockquote>
      );
    case 'callout':
      return (
        <div key={idx} className="my-7 rounded-xl border border-plasma-purple/20 bg-plasma-purple/5 px-6 py-5">
          <p className="font-body text-[15px] text-ghost-white/90 leading-relaxed">
            {section.text}
          </p>
        </div>
      );
    default:
      return null;
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: 'Outrick',
      url: 'https://outrick.com',
    },
    publisher: {
      '@id': 'https://outrick.com/#business',
    },
    url: `https://outrick.com/blog/${post.slug}`,
    keywords: post.keywords.join(', '),
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://outrick.com' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://outrick.com/blog' },
        { '@type': 'ListItem', position: 3, name: post.title, item: `https://outrick.com/blog/${post.slug}` },
      ],
    },
  };

  return (
    <main id="main-content" className="relative min-h-screen bg-deep-void text-ghost-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      {/* Article Header */}
      <article className="pt-36 pb-24 px-6">
        <div className="max-w-2xl mx-auto">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 font-mono text-[12px] text-ash mb-8">
            <Link href="/" className="hover:text-ghost-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-ghost-white transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-mist truncate max-w-[200px]">{post.title}</span>
          </nav>

          {/* Category + Meta */}
          <div className="flex items-center gap-3 mb-6">
            <span className={`font-mono text-[11px] tracking-widest uppercase px-2.5 py-1 rounded-full border ${CATEGORY_COLORS[post.category] ?? 'text-mist border-white/10 bg-white/5'}`}>
              {post.category}
            </span>
            <span className="font-mono text-[12px] text-ash">{formatDate(post.date)}</span>
            <span className="font-mono text-[12px] text-ash">·</span>
            <span className="font-mono text-[12px] text-ash">{post.readTime}</span>
          </div>

          {/* Title */}
          <h1 className="font-heading text-3xl md:text-[42px] font-light text-ghost-white leading-tight mb-6">
            {post.title}
          </h1>

          {/* Description */}
          <p className="font-body text-[19px] text-mist leading-relaxed mb-12 border-b border-white/8 pb-12">
            {post.description}
          </p>

          {/* Content */}
          <div>
            {post.sections.map((section, idx) => renderSection(section, idx))}
          </div>

          {/* Author / Published by */}
          <div className="mt-16 pt-8 border-t border-white/8 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-plasma-purple/20 border border-plasma-purple/30 flex items-center justify-center">
              <span className="font-mono text-[11px] text-plasma-purple font-bold">O</span>
            </div>
            <div>
              <p className="font-body text-[14px] text-ghost-white">Outrick Team</p>
              <p className="font-mono text-[12px] text-ash">{formatDate(post.date)}</p>
            </div>
          </div>
        </div>
      </article>

      {/* Email capture */}
      <section className="px-6 pb-12">
        <div className="max-w-2xl mx-auto">
          <EmailCapture />
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-2xl mx-auto">
          <div className="rounded-2xl border border-plasma-purple/20 bg-plasma-purple/5 p-8 md:p-10">
            <p className="font-mono text-[12px] text-plasma-purple tracking-widest uppercase mb-3">
              Free · No Commitment
            </p>
            <h2 className="font-heading text-2xl font-light text-ghost-white mb-3">
              See how your business scores
            </h2>
            <p className="font-body text-[15px] text-mist mb-7">
              0–100 digital presence score with actionable recommendations. Delivered in a 15-minute call.
            </p>
            <Link href="/score" className="btn-pill-primary px-7 py-3 text-[15px] inline-block">
              Get Your Free Score →
            </Link>
          </div>
        </div>
      </section>

      {/* Back to Blog */}
      <div className="px-6 pb-16 max-w-2xl mx-auto">
        <Link
          href="/blog"
          className="font-mono text-[13px] text-mist hover:text-ghost-white transition-colors flex items-center gap-2"
        >
          ← Back to Blog
        </Link>
      </div>

      <Footer />
    </main>
  );
}
