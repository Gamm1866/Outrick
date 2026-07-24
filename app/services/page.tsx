import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getAllServices } from '@/lib/services';

export const metadata: Metadata = {
  title: 'Services | Outrick — AI Automation, Growth Marketing & UX',
  description: 'AI automation, data-driven growth marketing, and UX optimization for small businesses. Practical systems that save time and increase revenue.',
  alternates: {
    canonical: 'https://www.outrick.net/services',
  },
  openGraph: {
    title: 'Services | Outrick',
    description: 'AI automation, data-driven growth marketing, and UX optimization for small and medium businesses.',
    url: 'https://www.outrick.net/services',
    siteName: 'Outrick',
    locale: 'en_US',
    type: 'website',
  },
};

export default function ServicesPage() {
  const services = getAllServices();

  return (
    <main id="main-content" className="relative min-h-screen bg-deep-void text-ghost-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-plasma-purple" />
            <span className="font-mono text-[13px] text-plasma-purple tracking-widest uppercase">
              What We Do
            </span>
          </div>
          <h1 className="font-heading text-5xl md:text-6xl font-light text-ghost-white leading-tight mb-5">
            Services Built for<br />
            <span className="italic font-drama text-plasma-purple">Real Business Growth</span>
          </h1>
          <p className="font-body text-[18px] text-mist max-w-2xl leading-relaxed">
            Three focused services for small and medium businesses. No retainers for activity — engagements measured by results.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto grid md:grid-cols-1 gap-6">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group block rounded-2xl border border-white/8 hover:border-white/20 transition-all duration-300 overflow-hidden"
            >
              <div
                className="h-1.5 w-full"
                style={{ backgroundColor: service.accentColor, opacity: 0.6 }}
              />
              <div className="p-8 md:p-10 bg-white/[0.02] group-hover:bg-white/[0.04] transition-colors duration-300">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {/* Icon + Title */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-3xl" aria-hidden="true">{service.icon}</span>
                      <div>
                        <p className="font-mono text-[11px] tracking-widest uppercase mb-1" style={{ color: service.accentColor }}>
                          Service
                        </p>
                        <h2
                          className="font-heading text-xl md:text-2xl font-light text-ghost-white group-hover:transition-colors duration-300 leading-snug"
                          style={{ ['--hover-color' as string]: service.accentColor }}
                        >
                          {service.title}
                        </h2>
                      </div>
                    </div>
                    <p className="font-body text-[15px] text-mist leading-relaxed mb-5 max-w-xl">
                      {service.tagline}
                    </p>
                    <p className="font-body text-[14px] text-ash leading-relaxed max-w-xl line-clamp-2">
                      {service.description}
                    </p>
                  </div>

                  {/* Results Stats */}
                  <div className="md:w-56 shrink-0">
                    <div className="rounded-xl border border-white/6 bg-white/[0.02] p-5 space-y-4">
                      {service.results.map((result, i) => (
                        <div key={i}>
                          <p className="font-heading text-2xl font-light" style={{ color: service.accentColor }}>
                            {result.value}
                          </p>
                          <p className="font-mono text-[11px] text-ash tracking-wide">{result.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2 font-mono text-[13px]" style={{ color: service.accentColor }}>
                  <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">
                    Learn more →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl border border-plasma-purple/20 bg-plasma-purple/5 p-10 text-center">
            <p className="font-mono text-[12px] text-plasma-purple tracking-widest uppercase mb-4">Free Audit</p>
            <h2 className="font-heading text-2xl md:text-3xl font-light text-ghost-white mb-4">
              Not sure which service fits?
            </h2>
            <p className="font-body text-[16px] text-mist mb-8 max-w-md mx-auto">
              Get a free 0–100 score of your digital presence. We&apos;ll tell you exactly where the biggest opportunity is.
            </p>
            <Link
              href="/score"
              className="btn-pill-primary px-8 py-3 text-[15px] inline-block"
            >
              Get Your Free Score →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
