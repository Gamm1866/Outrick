export interface ServiceSection {
  type: 'p' | 'h2' | 'h3' | 'ul' | 'ol' | 'callout' | 'stat';
  text?: string;
  items?: string[];
  value?: string;
  label?: string;
}

export interface Service {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  keywords: string[];
  icon: string;
  accentColor: string;
  sections: ServiceSection[];
  results: { value: string; label: string }[];
}

export const services: Service[] = [
  {
    slug: 'ai-automation',
    title: 'AI Automation for Small Business',
    tagline: 'Save 30+ hours per month. Qualify leads while you sleep.',
    description: 'We design and deploy AI-powered workflows that eliminate repetitive work, automate lead qualification via WhatsApp and voice, and connect your existing tools — without hiring a developer.',
    keywords: ['AI automation small business', 'business automation consulting', 'workflow automation SMB', 'AI for small business', 'WhatsApp automation'],
    icon: '🤖',
    accentColor: '#22d3ee',
    results: [
      { value: '30+', label: 'hours saved per month' },
      { value: '9×', label: 'faster lead response time' },
      { value: '100%', label: 'automated first response' },
    ],
    sections: [
      {
        type: 'p',
        text: 'The average small business owner spends 23 hours per week on tasks that could be automated. Scheduling, data entry, follow-up emails, lead qualification, report generation — none of these require human judgment. They require consistency, and machines are better at consistency than people.',
      },
      {
        type: 'p',
        text: 'At Outrick, we design AI automation systems built for how SMBs actually operate — not enterprise frameworks stripped down, but purpose-built workflows that connect your real tools (WhatsApp, Gmail, your CRM, your calendar) and eliminate the manual steps between them.',
      },
      {
        type: 'h2',
        text: 'What We Automate',
      },
      {
        type: 'h3',
        text: 'Lead Qualification & Follow-Up',
      },
      {
        type: 'p',
        text: 'When someone contacts you via WhatsApp, your website, or Instagram, an AI assistant responds instantly (even at 3am), qualifies the lead with 3–4 targeted questions, and books the call — before your competitors have even seen the notification. Businesses that respond within 5 minutes close 9× more deals than those who respond the next day.',
      },
      {
        type: 'h3',
        text: 'Content & Marketing Workflows',
      },
      {
        type: 'p',
        text: 'AI-powered content pipelines that take a single brief and generate first drafts for blog posts, social captions, email sequences, and ad copy — in your brand voice. You review and approve; the machine does the production work.',
      },
      {
        type: 'h3',
        text: 'Reporting & Data Consolidation',
      },
      {
        type: 'p',
        text: 'Weekly automated reports pulling from your analytics, CRM, and ad accounts — delivered to your inbox or Slack every Monday morning. No more manual spreadsheet work before every team meeting.',
      },
      {
        type: 'h3',
        text: 'Customer Support First Response',
      },
      {
        type: 'p',
        text: '80% of customer questions are variations of the same 10–15 questions. We build AI assistants trained on your specific business — services, pricing, policies, FAQs — that handle first contact and escalate only the genuine edge cases.',
      },
      {
        type: 'h2',
        text: 'Our Automation Stack',
      },
      {
        type: 'ul',
        items: [
          'n8n (open source) — orchestrates every workflow between your tools',
          'OpenAI API — language processing, classification, content generation',
          'ManyChat — WhatsApp and Instagram automation without code',
          'Make.com — simpler flows for non-technical teams',
          'Your existing CRM, email, and calendar tools — we connect what you already use',
        ],
      },
      {
        type: 'callout',
        text: 'We don\'t sell you new software. We automate with tools you already pay for — or open-source tools with no licensing cost. The value is in the workflow design, not the software.',
      },
      {
        type: 'h2',
        text: 'How It Works',
      },
      {
        type: 'ol',
        items: [
          'Audit: we map every repetitive task your team does in a week',
          'Prioritize: we rank by time saved × frequency × automation feasibility',
          'Build: we design, test, and deploy the first workflow in 2 weeks',
          'Measure: we track time saved and error rate for 30 days',
          'Expand: we automate the next target on the list',
        ],
      },
      {
        type: 'h2',
        text: 'Who This Is For',
      },
      {
        type: 'p',
        text: 'AI automation works best for businesses with 2–50 employees that have clear, repeatable processes but limited technical staff. If your team is doing the same thing more than 3 times per week, we can likely automate it.',
      },
      {
        type: 'p',
        text: 'Industries we\'ve worked with: service businesses, real estate agencies, coaching and consulting firms, e-commerce operators, healthcare practices, and professional services.',
      },
    ],
  },
  {
    slug: 'growth-marketing',
    title: 'Data-Driven Growth Marketing for SMBs',
    tagline: 'More leads from the same budget. Every decision backed by metrics.',
    description: 'AI-powered SEO, content strategy, paid media, and GEO (Generative Engine Optimization) that puts your business in front of the right audience — including AI search engines like ChatGPT and Perplexity.',
    keywords: ['growth marketing for small business', 'data-driven marketing SMB', 'SEO for small business', 'content marketing strategy', 'GEO generative engine optimization'],
    icon: '📈',
    accentColor: '#7B61FF',
    results: [
      { value: '3×', label: 'average organic traffic growth' },
      { value: '40%', label: 'average CAC reduction' },
      { value: '6 mo', label: 'to measurable results' },
    ],
    sections: [
      {
        type: 'p',
        text: 'Most marketing agencies sell you activity — posts published, ads running, emails sent. We sell you results — leads generated, cost per acquisition, revenue attributed. The difference is measurement, and measurement requires strategy before execution.',
      },
      {
        type: 'p',
        text: 'Our growth marketing engagements start with a data audit: what are you currently tracking, what does it tell us, and what does it not tell us. Only after we understand the baseline do we build a growth plan.',
      },
      {
        type: 'h2',
        text: 'What\'s Included',
      },
      {
        type: 'h3',
        text: 'SEO & Content Strategy',
      },
      {
        type: 'p',
        text: 'Keyword research mapped to buyer intent, not volume. Content that targets the questions your ideal customers actually type into Google at the moment they\'re deciding to buy. Long-form articles, landing pages, and local SEO — all built on search data, not guesses.',
      },
      {
        type: 'h3',
        text: 'GEO — Generative Engine Optimization',
      },
      {
        type: 'p',
        text: 'A growing percentage of purchase journeys now start with ChatGPT, Perplexity, or Google\'s AI Overviews instead of traditional search. GEO is the practice of structuring your content so AI engines cite your business. We optimize for both traditional search and AI discovery.',
      },
      {
        type: 'callout',
        text: 'By 2026, an estimated 40% of search queries will be handled by AI engines. Businesses that appear in AI-generated answers will have a significant first-mover advantage over those optimizing only for traditional search.',
      },
      {
        type: 'h3',
        text: 'Paid Media Management',
      },
      {
        type: 'p',
        text: 'Google Ads and Meta Ads managed against real business metrics — not CTR or impressions, but cost per lead and cost per closed customer. We set up proper conversion tracking first (most agencies don\'t), then optimize toward what actually generates revenue.',
      },
      {
        type: 'h3',
        text: 'Email & Lifecycle Marketing',
      },
      {
        type: 'p',
        text: 'Automated email sequences for lead nurturing, customer onboarding, and re-engagement. Each sequence is tested and measured — open rates, click rates, and ultimately conversion to paying customer.',
      },
      {
        type: 'h2',
        text: 'Our Process',
      },
      {
        type: 'ol',
        items: [
          'Performance Score: audit of your current digital presence and traffic sources',
          'Competitive analysis: keyword gaps, content gaps, paid media gaps vs. competitors',
          'Growth roadmap: 90-day plan with specific channels, tactics, and KPI targets',
          'Execution: content production, campaign setup, tracking configuration',
          'Monthly reporting: CAC, organic traffic, conversion rates, attribution',
        ],
      },
      {
        type: 'h2',
        text: 'What Makes This Different',
      },
      {
        type: 'p',
        text: 'We don\'t outsource content to generic AI tools and call it done. We don\'t run ads without first installing proper conversion tracking. We don\'t define success by vanity metrics.',
      },
      {
        type: 'p',
        text: 'Every growth marketing engagement includes: conversion tracking setup, monthly CAC calculation, A/B testing of at least one key variable per cycle, and a written hypothesis for each test before it runs.',
      },
    ],
  },
  {
    slug: 'product-development',
    title: 'UX Optimization & Product Development',
    tagline: 'More conversions from your existing traffic. Built on data, not assumptions.',
    description: 'UX audits, conversion rate optimization, and custom software — CRMs, landing pages, dashboards — designed with real user data. Every pixel backed by behavioral analytics, not assumptions.',
    keywords: ['UX optimization consulting', 'conversion rate optimization SMB', 'custom CRM development', 'landing page optimization', 'UX audit small business'],
    icon: '🎯',
    accentColor: '#4ade80',
    results: [
      { value: '2×', label: 'average conversion rate improvement' },
      { value: '20%', label: 'average bounce rate reduction' },
      { value: '30d', label: 'to first measurable lift' },
    ],
    sections: [
      {
        type: 'p',
        text: 'Most businesses invest in getting more traffic when the real problem is that their existing traffic doesn\'t convert. A website that converts 2% instead of 1% doubles revenue without spending another dollar on ads. That\'s the lever we pull first.',
      },
      {
        type: 'p',
        text: 'Our product development work is always data-first: we install behavioral analytics before we change anything, identify exactly where users drop off, form hypotheses, test, and measure. We don\'t redesign by opinion.',
      },
      {
        type: 'h2',
        text: 'UX Audit & Conversion Optimization',
      },
      {
        type: 'p',
        text: 'We install Microsoft Clarity or Hotjar to capture heatmaps and session recordings, run funnel analysis in GA4, and identify the specific points where visitors leave without converting. Then we fix them — systematically, one at a time, with measurement after each change.',
      },
      {
        type: 'ul',
        items: [
          'Heatmap and session recording analysis across key pages',
          'Funnel drop-off identification (homepage → product → contact → thank you)',
          'Form optimization — field reduction, label clarity, friction removal',
          'A/B testing of headlines, CTAs, and page structure',
          'Mobile UX audit — most SMB sites lose 60%+ of conversions on mobile',
          'Page speed optimization — each 1-second improvement increases conversions ~20%',
        ],
      },
      {
        type: 'h2',
        text: 'Custom Software Development',
      },
      {
        type: 'h3',
        text: 'CRM & Pipeline Management',
      },
      {
        type: 'p',
        text: 'When off-the-shelf CRMs don\'t fit your workflow, we build custom solutions that do. Built on proven stacks (Next.js, Supabase, n8n), designed around your actual sales process — not a generic template you have to adapt to.',
      },
      {
        type: 'h3',
        text: 'Landing Pages',
      },
      {
        type: 'p',
        text: 'High-conversion landing pages built specifically for your campaigns — not your homepage adapted for ads, but purpose-built pages with one job: convert the visitor from this specific traffic source. Every element tested against real user behavior.',
      },
      {
        type: 'h3',
        text: 'Analytics Dashboards',
      },
      {
        type: 'p',
        text: 'Custom dashboards that consolidate your analytics, CRM data, and ad metrics in one view. Built in Looker Studio or as custom applications, depending on complexity. Designed for your team to actually use in weekly reviews.',
      },
      {
        type: 'callout',
        text: 'Before we build anything custom, we\'ll tell you honestly if an off-the-shelf tool does the job. We only build custom when the business case is clear — custom software is expensive to maintain, and we factor that into the recommendation.',
      },
      {
        type: 'h2',
        text: 'Our Development Process',
      },
      {
        type: 'ol',
        items: [
          'Discovery: map the user journey and identify the highest-impact intervention',
          'Data setup: install analytics and establish baseline metrics',
          'Design: wireframes based on data, not aesthetics',
          'Build: 2-week sprints with deliverables at the end of each',
          'Test: A/B or before/after measurement for every significant change',
          'Iterate: continue optimizing based on data from the live product',
        ],
      },
      {
        type: 'h2',
        text: 'Tech Stack',
      },
      {
        type: 'ul',
        items: [
          'Next.js 16 — fast, SEO-friendly, production-ready',
          'Supabase — open-source backend, PostgreSQL, real-time capabilities',
          'Tailwind CSS — design system that scales without CSS debt',
          'n8n — automation layer connecting your product to your other tools',
          'Vercel — deployment with global CDN and zero configuration',
          'Microsoft Clarity + GA4 — behavioral analytics on every project',
        ],
      },
    ],
  },
];

export function getAllServices(): Service[] {
  return services;
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
