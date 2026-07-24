import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getAllPosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Blog | Outrick — Data-Driven Growth Insights',
  description: 'Practical guides on growth metrics, AI automation, UX optimization, and analytics for small and medium businesses. No fluff, just data.',
  alternates: {
    canonical: 'https://www.outrick.net/blog',
  },
  openGraph: {
    title: 'Blog | Outrick — Data-Driven Growth Insights',
    description: 'Practical guides on growth metrics, AI automation, UX optimization, and analytics for SMBs.',
    url: 'https://www.outrick.net/blog',
    siteName: 'Outrick',
    locale: 'en_US',
    type: 'website',
  },
};

const CATEGORY_COLORS: Record<string, string> = {
  'Growth Strategy': 'text-plasma-purple border-plasma-purple/30 bg-plasma-purple/10',
  'AI Automation': 'text-electric-cyan border-electric-cyan/30 bg-electric-cyan/10',
  'UX & Conversion': 'text-green-400 border-green-400/30 bg-green-400/10',
  'Analytics': 'text-amber-400 border-amber-400/30 bg-amber-400/10',
};

const CATEGORY_COVERS: Record<string, string> = {
  'Growth Strategy': 'from-plasma-purple/20 via-plasma-purple/5 to-transparent',
  'AI Automation':   'from-cyan-400/20 via-cyan-400/5 to-transparent',
  'UX & Conversion': 'from-green-400/20 via-green-400/5 to-transparent',
  'Analytics':       'from-amber-400/20 via-amber-400/5 to-transparent',
};

const CATEGORY_ICONS: Record<string, string> = {
  'Growth Strategy': '📈',
  'AI Automation':   '🤖',
  'UX & Conversion': '🎯',
  'Analytics':       '📊',
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <main id="main-content" className="relative min-h-screen bg-deep-void text-ghost-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-plasma-purple" />
            <span className="font-mono text-[13px] text-plasma-purple tracking-widest uppercase">
              Outrick Blog
            </span>
          </div>
          <h1 className="font-heading text-5xl md:text-6xl font-light text-ghost-white leading-tight mb-5">
            Growth Insights<br />
            <span className="italic font-drama text-plasma-purple">Backed by Data</span>
          </h1>
          <p className="font-body text-[18px] text-mist max-w-2xl leading-relaxed">
            Practical guides on metrics, AI automation, UX, and analytics for small businesses. No theory without application.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {featured && (
        <section className="px-6 pb-16">
          <div className="max-w-4xl mx-auto">
            <Link
              href={`/blog/${featured.slug}`}
              className="group block rounded-2xl border border-white/8 hover:border-plasma-purple/30 transition-all duration-300 overflow-hidden"
            >
              {/* Cover strip */}
              <div className={`h-2 w-full bg-gradient-to-r ${CATEGORY_COVERS[featured.category] ?? 'from-plasma-purple/20 to-transparent'} opacity-80`} />
              <div className="p-8 md:p-10 bg-white/[0.03] group-hover:bg-white/[0.05] transition-colors duration-300">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-xl" aria-hidden="true">{CATEGORY_ICONS[featured.category]}</span>
                  <span className={`font-mono text-[11px] tracking-widest uppercase px-2.5 py-1 rounded-full border ${CATEGORY_COLORS[featured.category] ?? 'text-mist border-white/10 bg-white/5'}`}>
                    {featured.category}
                  </span>
                  <span className="font-mono text-[12px] text-ash">Featured</span>
                </div>
                <h2 className="font-heading text-2xl md:text-3xl font-light text-ghost-white group-hover:text-plasma-purple transition-colors duration-300 leading-snug mb-4">
                  {featured.title}
                </h2>
                <p className="font-body text-[16px] text-mist leading-relaxed mb-6 max-w-2xl">
                  {featured.description}
                </p>
                <div className="flex items-center gap-4 text-ash font-mono text-[12px]">
                  <span>{formatDate(featured.date)}</span>
                  <span>·</span>
                  <span>{featured.readTime}</span>
                  <span className="ml-auto text-plasma-purple group-hover:translate-x-1 transition-transform duration-200">
                    Read article →
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Post Grid */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-5">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block rounded-xl border border-white/8 hover:border-plasma-purple/25 transition-all duration-300 overflow-hidden"
              >
                {/* Cover */}
                <div className={`h-24 bg-gradient-to-br ${CATEGORY_COVERS[post.category] ?? 'from-plasma-purple/20 to-transparent'} flex items-center justify-center`}>
                  <span className="text-4xl opacity-60" aria-hidden="true">
                    {CATEGORY_ICONS[post.category]}
                  </span>
                </div>
                <div className="p-6 bg-white/[0.02] group-hover:bg-white/[0.04] transition-colors duration-300">
                  <div className="mb-4">
                    <span className={`font-mono text-[11px] tracking-widest uppercase px-2.5 py-1 rounded-full border ${CATEGORY_COLORS[post.category] ?? 'text-mist border-white/10 bg-white/5'}`}>
                      {post.category}
                    </span>
                  </div>
                  <h2 className="font-heading text-[18px] font-light text-ghost-white group-hover:text-plasma-purple transition-colors duration-300 leading-snug mb-3">
                    {post.title}
                  </h2>
                  <p className="font-body text-[14px] text-mist leading-relaxed mb-5 line-clamp-2">
                    {post.description}
                  </p>
                  <div className="flex items-center gap-3 text-ash font-mono text-[12px]">
                    <span>{formatDate(post.date)}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl border border-plasma-purple/20 bg-plasma-purple/5 p-10 text-center">
            <p className="font-mono text-[12px] text-plasma-purple tracking-widest uppercase mb-4">Free Audit</p>
            <h2 className="font-heading text-2xl md:text-3xl font-light text-ghost-white mb-4">
              See how your business scores
            </h2>
            <p className="font-body text-[16px] text-mist mb-8 max-w-md mx-auto">
              0–100 score of your digital presence. 15-minute call. No commitment.
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
