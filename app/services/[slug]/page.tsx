import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getAllServices, getServiceBySlug, type ServiceSection } from '@/lib/services';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllServices().map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: `${service.title} | Outrick`,
    description: service.description,
    keywords: service.keywords,
    alternates: {
      canonical: `https://outrick.com/services/${service.slug}`,
    },
    openGraph: {
      title: service.title,
      description: service.description,
      url: `https://outrick.com/services/${service.slug}`,
      siteName: 'Outrick',
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: service.title,
      description: service.description,
    },
  };
}

function renderSection(section: ServiceSection, idx: number) {
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

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'ProfessionalService',
      '@id': 'https://outrick.com/#business',
      name: 'Outrick',
      url: 'https://outrick.com',
    },
    url: `https://outrick.com/services/${service.slug}`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://outrick.com' },
        { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://outrick.com/services' },
        { '@type': 'ListItem', position: 3, name: service.title, item: `https://outrick.com/services/${service.slug}` },
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

      <article className="pt-36 pb-24 px-6">
        <div className="max-w-2xl mx-auto">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 font-mono text-[12px] text-ash mb-8">
            <Link href="/" className="hover:text-ghost-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-ghost-white transition-colors">Services</Link>
            <span>/</span>
            <span className="text-mist truncate max-w-[200px]">{service.title}</span>
          </nav>

          {/* Icon + Meta */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl" aria-hidden="true">{service.icon}</span>
            <span
              className="font-mono text-[11px] tracking-widest uppercase px-2.5 py-1 rounded-full border"
              style={{
                color: service.accentColor,
                borderColor: `${service.accentColor}40`,
                backgroundColor: `${service.accentColor}15`,
              }}
            >
              Service
            </span>
          </div>

          {/* Title */}
          <h1 className="font-heading text-3xl md:text-[42px] font-light text-ghost-white leading-tight mb-4">
            {service.title}
          </h1>

          {/* Tagline */}
          <p className="font-body text-[19px] leading-relaxed mb-6" style={{ color: service.accentColor }}>
            {service.tagline}
          </p>

          {/* Description + Results */}
          <div className="mb-12 border-b border-white/8 pb-12">
            <p className="font-body text-[17px] text-mist leading-relaxed mb-8">
              {service.description}
            </p>
            <div className="grid grid-cols-3 gap-4">
              {service.results.map((result, i) => (
                <div key={i} className="rounded-xl border border-white/6 bg-white/[0.02] p-4 text-center">
                  <p className="font-heading text-2xl font-light mb-1" style={{ color: service.accentColor }}>
                    {result.value}
                  </p>
                  <p className="font-mono text-[11px] text-ash tracking-wide leading-tight">{result.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div>
            {service.sections.map((section, idx) => renderSection(section, idx))}
          </div>

          {/* Author block */}
          <div className="mt-16 pt-8 border-t border-white/8 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-plasma-purple/20 border border-plasma-purple/30 flex items-center justify-center">
              <span className="font-mono text-[11px] text-plasma-purple font-bold">O</span>
            </div>
            <div>
              <p className="font-body text-[14px] text-ghost-white">Outrick Team</p>
              <p className="font-mono text-[12px] text-ash">Growth consultants for SMBs</p>
            </div>
          </div>
        </div>
      </article>

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

      {/* Back to Services */}
      <div className="px-6 pb-16 max-w-2xl mx-auto">
        <Link
          href="/services"
          className="font-mono text-[13px] text-mist hover:text-ghost-white transition-colors flex items-center gap-2"
        >
          ← All Services
        </Link>
      </div>

      <Footer />
    </main>
  );
}
