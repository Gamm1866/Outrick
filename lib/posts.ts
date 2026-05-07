export interface PostSection {
  type: 'p' | 'h2' | 'h3' | 'ul' | 'ol' | 'blockquote' | 'callout';
  text?: string;
  items?: string[];
}

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  keywords: string[];
  sections: PostSection[];
}

export const posts: Post[] = [
  {
    slug: 'smb-growth-metrics-that-matter',
    title: 'The 5 Metrics Every SMB Must Track (And Why Gut Feeling Costs You Money)',
    description: 'Most small businesses track the wrong numbers — or none at all. Here are the 5 metrics that actually predict growth, and how to set them up today.',
    date: '2025-04-15',
    readTime: '7 min read',
    category: 'Growth Strategy',
    keywords: ['smb growth metrics', 'small business kpis', 'business performance metrics', 'data-driven growth'],
    sections: [
      {
        type: 'p',
        text: "Most small business owners we talk to can tell us their revenue — and not much else. They know roughly how many customers they have, roughly what their costs are, and they rely on a general sense of whether things feel better or worse than last quarter. That gut feeling is costing them money.",
      },
      {
        type: 'p',
        text: "Data-driven businesses grow 3x faster than those that don't use analytics, according to McKinsey. The gap isn't talent or product — it's measurement. Here are the five metrics that separate businesses that scale from those that plateau.",
      },
      {
        type: 'h2',
        text: '1. Customer Acquisition Cost (CAC)',
      },
      {
        type: 'p',
        text: "CAC is how much you spend to acquire one new customer. Divide total marketing and sales spend by the number of new customers in the same period. If you spent $4,000 in ads last month and got 20 new customers, your CAC is $200.",
      },
      {
        type: 'p',
        text: "Why it matters: if your CAC exceeds what a customer is worth to you, you're growing yourself into debt. Most SMBs don't know their CAC and therefore can't know whether their marketing spend is working.",
      },
      {
        type: 'callout',
        text: "Target: CAC should be less than 1/3 of your Customer Lifetime Value (LTV). If your average customer spends $900 over their lifetime with you, your CAC should be under $300.",
      },
      {
        type: 'h2',
        text: '2. Conversion Rate by Stage',
      },
      {
        type: 'p',
        text: "Your conversion rate isn't one number — it's a chain. Visitor → Lead → Qualified Lead → Customer. Each transition has its own rate, and each tells a different story.",
      },
      {
        type: 'ul',
        items: [
          "Visitor → Lead: typically 1–5% for most industries. Below 1% means your site or offer isn't compelling.",
          "Lead → Qualified Lead: depends on your qualification criteria. Below 20% often signals a targeting problem.",
          "Qualified Lead → Customer: below 25% usually indicates a sales process or pricing issue.",
        ],
      },
      {
        type: 'p',
        text: "Track these in your CRM or even a spreadsheet. When one stage drops, you know exactly where to focus instead of changing everything at once.",
      },
      {
        type: 'h2',
        text: '3. Monthly Recurring Revenue (MRR) or Revenue Consistency',
      },
      {
        type: 'p',
        text: "For service businesses without subscriptions, this becomes: what percentage of last month's revenue is predictable this month? The higher this number, the more stable your growth. One-time projects are volatile; retainers and recurring services are not.",
      },
      {
        type: 'p',
        text: "If your revenue swings more than 30% month-to-month, your priority isn't getting more customers — it's building more predictable revenue from existing ones.",
      },
      {
        type: 'h2',
        text: '4. Net Promoter Score (NPS)',
      },
      {
        type: 'p',
        text: "Ask your customers one question: 'On a scale of 0–10, how likely are you to recommend us to a friend?' Anyone who answers 9 or 10 is a promoter. Anyone who answers 0–6 is a detractor. NPS = % Promoters minus % Detractors.",
      },
      {
        type: 'p',
        text: "NPS predicts churn before it happens. If your NPS is negative or below 20, you have a retention problem that no marketing budget will fix.",
      },
      {
        type: 'callout',
        text: "How to collect NPS: a simple one-question email survey to customers after their first 30 days, and again at 90 days. Free tools like Typeform or Google Forms are enough to start.",
      },
      {
        type: 'h2',
        text: '5. Website Speed and Core Web Vitals',
      },
      {
        type: 'p',
        text: "Every 1-second delay in mobile page load reduces conversions by 20% (Google). This is a metric most SMBs ignore completely because it sounds like a developer problem. It's actually a revenue problem.",
      },
      {
        type: 'p',
        text: "Check your Core Web Vitals for free at pagespeed.web.dev. Focus on: Largest Contentful Paint (under 2.5s), and Cumulative Layout Shift (under 0.1). These two numbers predict whether Google ranks you and whether visitors stay.",
      },
      {
        type: 'h2',
        text: 'How to Start Tracking These Today',
      },
      {
        type: 'ol',
        items: [
          "Set up Google Analytics 4 if you haven't — it's free and tracks visitors, sessions, and basic conversion events.",
          "Add a free CRM (HubSpot free tier is excellent) to track leads through stages.",
          "Send an NPS survey to your last 20 customers this week.",
          "Check PageSpeed Insights for your homepage and top landing page.",
          "Calculate your CAC for last month using your marketing spend and new customer count.",
        ],
      },
      {
        type: 'p',
        text: "You don't need expensive software to start. You need a consistent habit of measuring. Once you have baseline numbers, even small improvements become visible — and visible improvements get prioritized.",
      },
      {
        type: 'blockquote',
        text: '"What gets measured gets managed." — Peter Drucker. The inverse is also true: what you don\'t measure, you can\'t improve.',
      },
    ],
  },
  {
    slug: 'ai-automation-small-business-where-to-start',
    title: 'AI Automation for Small Business: Where to Start in 2025',
    description: 'AI automation isn\'t just for enterprises. Here\'s how small businesses can save 20+ hours per week using tools available today — without hiring a developer.',
    date: '2025-04-28',
    readTime: '8 min read',
    category: 'AI Automation',
    keywords: ['AI automation small business', 'business automation tools', 'AI for SMB', 'workflow automation 2025'],
    sections: [
      {
        type: 'p',
        text: "In 2023, AI automation was a competitive advantage for large companies. In 2025, it's table stakes. The businesses that don't automate repetitive work are already losing ground to competitors who do — and those competitors are often smaller, not larger.",
      },
      {
        type: 'p',
        text: "The challenge for most small business owners isn't willingness — it's knowing where to start. There are hundreds of AI tools, most of them promising everything and delivering confusion. Here's a practical framework.",
      },
      {
        type: 'h2',
        text: 'The Right Starting Point: Map Your Repetitive Tasks',
      },
      {
        type: 'p',
        text: "Before choosing any tool, spend 30 minutes listing every task your team repeats more than once a week. Be specific. 'Admin work' is not a task. 'Copying lead information from email into the CRM' is a task. 'Scheduling follow-up calls after demos' is a task.",
      },
      {
        type: 'p',
        text: "Once you have the list, sort by: (1) how often it happens, (2) how long it takes, (3) how much skill it actually requires. The high-frequency, low-skill tasks at the top of that list are your automation targets.",
      },
      {
        type: 'h2',
        text: 'The 4 Highest-ROI Automations for SMBs',
      },
      {
        type: 'h3',
        text: 'Lead Qualification and Follow-Up',
      },
      {
        type: 'p',
        text: "The average lead response time for SMBs is 47 hours. The businesses that respond within 5 minutes close 9x more deals. An AI assistant connected to your contact form or WhatsApp can respond instantly, qualify the lead with 3–4 questions, and book the call — all without human involvement.",
      },
      {
        type: 'p',
        text: "Tools: n8n + OpenAI for custom flows, or ManyChat for WhatsApp-native automation. Setup time: 4–8 hours. Weekly time saved: 5–10 hours.",
      },
      {
        type: 'h3',
        text: 'Content Creation Workflows',
      },
      {
        type: 'p',
        text: "Writing one blog post, repurposing it into social content, generating email sequences, and translating it — manually, this takes a full day. With an AI workflow, it takes 20 minutes of your time for direction, and 2 hours of automated processing.",
      },
      {
        type: 'p',
        text: "This is not about AI writing your content — it's about AI handling the mechanical repetition while you handle the strategy and voice.",
      },
      {
        type: 'h3',
        text: 'Customer Support First Response',
      },
      {
        type: 'p',
        text: "80% of customer questions are variations of the same 10–15 questions. An AI trained on your FAQ, service details, and pricing can handle first-response for all of them, escalating only the edge cases to your team.",
      },
      {
        type: 'callout',
        text: "Key principle: don't automate the relationship. Automate the logistics. The AI handles 'What are your hours?'. Your team handles 'I'm frustrated and need help.'",
      },
      {
        type: 'h3',
        text: 'Reporting and Data Consolidation',
      },
      {
        type: 'p',
        text: "If someone on your team spends time every week pulling numbers from different platforms and building a report, this is fully automatable. Connect your analytics, CRM, and ad accounts to a tool like n8n or Zapier, and get a weekly summary sent automatically to your inbox or Slack.",
      },
      {
        type: 'h2',
        text: 'The Tools You Actually Need',
      },
      {
        type: 'ul',
        items: [
          "n8n (open source) or Make.com — orchestrate workflows between any two tools",
          "OpenAI API — language processing, classification, content generation",
          "ManyChat — WhatsApp and Instagram automation without code",
          "Notion AI or Notion databases — knowledge base and lightweight CRM",
          "Zapier — simpler than n8n, more expensive, better for non-technical teams",
        ],
      },
      {
        type: 'h2',
        text: 'What Automation Cannot Replace',
      },
      {
        type: 'p',
        text: "Relationships. Judgment calls. Creative strategy. Empathy in difficult customer situations. Negotiation. These are the things you should be doing more of when automation frees up your time — not less.",
      },
      {
        type: 'p',
        text: "The businesses that fail at automation try to automate everything and lose the human element that made them trustworthy. The businesses that succeed use automation to clear the noise so their people can focus on the signal.",
      },
      {
        type: 'blockquote',
        text: "The goal of AI automation for a small business is not to replace people — it's to give people back the hours they were spending on work that shouldn't require people at all.",
      },
      {
        type: 'h2',
        text: 'Your 30-Day Automation Roadmap',
      },
      {
        type: 'ol',
        items: [
          "Week 1: Map your repetitive tasks. Pick one. Scope it fully.",
          "Week 2: Build and test the automation in a sandbox environment.",
          "Week 3: Deploy with a human review step — don't fully remove oversight yet.",
          "Week 4: Measure time saved, quality of output, and edge cases. Iterate.",
        ],
      },
      {
        type: 'p',
        text: "One successful automation gives your team confidence and reveals the next target. Start with the highest-frequency, lowest-risk task. Build momentum before building complexity.",
      },
    ],
  },
  {
    slug: 'ux-optimization-increase-conversions',
    title: 'UX Optimization: How Better Design Increases Conversions Without More Traffic',
    description: 'Most businesses spend money on ads to get more traffic. The smarter move: fix why your existing traffic doesn\'t convert. A data-driven guide to UX optimization.',
    date: '2025-05-02',
    readTime: '9 min read',
    category: 'UX & Conversion',
    keywords: ['UX optimization increase conversions', 'conversion rate optimization', 'website UX audit', 'CRO for small business'],
    sections: [
      {
        type: 'p',
        text: "There's a pattern we see constantly: a business increases its ad budget, gets more traffic, and conversion rate stays flat — or gets worse. More visitors, same number of customers. The problem isn't the top of the funnel. It's the middle.",
      },
      {
        type: 'p',
        text: "UX optimization — the process of improving how users experience your website or product — is one of the highest-ROI activities available to any business. Doubling your conversion rate from 1% to 2% has the same revenue impact as doubling your traffic, at a fraction of the cost.",
      },
      {
        type: 'h2',
        text: 'The 3 Reasons Visitors Don\'t Convert',
      },
      {
        type: 'p',
        text: "Before optimizing anything, you need to understand why people leave. In our experience across dozens of SMB websites, the causes cluster around three problems:",
      },
      {
        type: 'h3',
        text: '1. Clarity failure — visitors don\'t understand what you do in 5 seconds',
      },
      {
        type: 'p',
        text: "Your homepage headline is the most valuable real estate on your website. Most SMB headlines describe what the company is ('Full-service digital agency') rather than what the customer gets ('More leads from your existing website in 30 days').",
      },
      {
        type: 'p',
        text: "Test: show your homepage to someone who doesn't know your business. Ask them what you do and who it's for. If they can't answer correctly in 5 seconds, your clarity needs work before anything else.",
      },
      {
        type: 'h3',
        text: '2. Friction — the path to action has too many obstacles',
      },
      {
        type: 'p',
        text: "Every additional field in a form, every required account creation, every extra click between intent and completion reduces your conversion rate. Amazon's 1-Click patent was worth billions because they understood this better than anyone.",
      },
      {
        type: 'callout',
        text: "Audit your contact form: how many fields does it have? Every field beyond name, email, and one qualifying question is probably costing you leads. Test removing fields one at a time and measure the impact.",
      },
      {
        type: 'h3',
        text: '3. Trust deficit — visitors don\'t believe your claims',
      },
      {
        type: 'p',
        text: "Testimonials, case studies, client logos, certifications, and even specific numbers ('We\'ve helped 200+ businesses') all reduce perceived risk. If your website makes claims without evidence, visitors will default to skepticism.",
      },
      {
        type: 'p',
        text: "The most effective trust signals are specific and verifiable: a named testimonial with a photo and company, a before/after metric from a real client, a recognizable brand you've worked with.",
      },
      {
        type: 'h2',
        text: 'How to Run a UX Audit Without a Research Budget',
      },
      {
        type: 'ol',
        items: [
          "Hotjar or Microsoft Clarity (free) — install heatmaps and session recordings on your key pages. Watch 10 sessions and note where people stop scrolling and where they click unexpectedly.",
          "Google Search Console — check which queries bring traffic to which pages. If pages rank for irrelevant queries, that explains low conversion.",
          "5-second test — use Usabilityhub (free tier) to test whether your headline communicates correctly to strangers.",
          "Funnel visualization in GA4 — set up a simple funnel from homepage → contact page → thank you page and find where the drop-off is highest.",
          "Mobile testing — load your site on an actual phone, not a simulator. Most SMB sites that look fine on desktop have serious mobile issues.",
        ],
      },
      {
        type: 'h2',
        text: 'The Changes That Move the Needle Most',
      },
      {
        type: 'p',
        text: "Based on conversion optimization work across SMB clients, these are the interventions with the highest impact:",
      },
      {
        type: 'ul',
        items: [
          "Rewriting the hero headline to focus on outcome, not description: average conversion lift 20–40%",
          "Adding a sticky CTA (call-to-action visible as users scroll): average lift 15–25%",
          "Reducing form fields from 6+ to 3: average lead volume increase 30–50%",
          "Adding a video testimonial above the fold: average trust metric improvement 35%",
          "Improving mobile load time by 1 second: average bounce rate reduction 10–20%",
        ],
      },
      {
        type: 'h2',
        text: 'The Right Way to Test',
      },
      {
        type: 'p',
        text: "Don't change multiple things at once and wonder what worked. A/B test one element at a time, run each test for at least 2 weeks (or until statistical significance), and document results. This sounds slow — but one confirmed 30% conversion lift compounding over 12 months is transformative.",
      },
      {
        type: 'p',
        text: "Free A/B testing: Google Optimize shut down in 2023, but VWO has a free tier, and many businesses can run simple tests by alternating between two versions manually and comparing 2-week windows.",
      },
      {
        type: 'blockquote',
        text: "The best marketing is a website that converts. Everything else — ads, SEO, social — just brings people to that site. Fix the site first.",
      },
      {
        type: 'h2',
        text: 'Where to Start This Week',
      },
      {
        type: 'ol',
        items: [
          "Install Microsoft Clarity (free, no data cap) on your site today.",
          "Watch 10 session recordings of users who visited your contact page but didn't fill the form.",
          "Check your hero headline with the 5-second test.",
          "Reduce your contact form to 3 fields maximum.",
          "Schedule a monthly UX review to watch recordings and adjust.",
        ],
      },
    ],
  },
  {
    slug: 'data-driven-business-growth-guide',
    title: 'Why Data-Driven Businesses Grow 3x Faster: A Practical Guide for SMBs',
    description: 'Data-driven companies outgrow intuition-based competitors by 3x. Here\'s what that actually means for a small business, and how to make the shift without a data team.',
    date: '2025-05-05',
    readTime: '7 min read',
    category: 'Growth Strategy',
    keywords: ['data-driven business growth', 'data driven marketing SMB', 'business analytics small business', 'decisions based on data'],
    sections: [
      {
        type: 'p',
        text: "McKinsey's research is unambiguous: companies that use data in their decision-making grow 3x faster than those that don't. But most of that research describes companies with data science teams, BI tools, and dedicated analysts. What does 'data-driven' actually mean for a 10-person business?",
      },
      {
        type: 'p',
        text: "It means something simpler than it sounds, and more difficult than it looks.",
      },
      {
        type: 'h2',
        text: 'What Data-Driven Actually Means',
      },
      {
        type: 'p',
        text: "Data-driven doesn't mean drowning in dashboards or hiring a data scientist. It means: before you make a significant business decision, you look at evidence. And after you make it, you measure whether it worked.",
      },
      {
        type: 'p',
        text: "The opposite of data-driven isn't 'using instinct.' Good instinct is valuable and should inform hypotheses. The opposite of data-driven is making decisions with no intention of measuring the outcome — which means you can't learn from them.",
      },
      {
        type: 'callout',
        text: "The minimum viable data-driven decision looks like: 'We think X will increase Y. We'll run it for 30 days and check the number. If Y goes up by 10%+, we continue. If not, we stop or change X.'",
      },
      {
        type: 'h2',
        text: 'The 3 Levels of Data-Driven Operations',
      },
      {
        type: 'h3',
        text: 'Level 1: You can see what\'s happening (Tracking)',
      },
      {
        type: 'p',
        text: "This is the foundation. Most SMBs aren't here yet. GA4 on your website. A CRM with deal stages. Basic financial tracking in your accounting software. Without Level 1, you're flying blind — you might have great instincts, but you have no feedback loop.",
      },
      {
        type: 'h3',
        text: 'Level 2: You understand why it\'s happening (Analysis)',
      },
      {
        type: 'p',
        text: "This is where you move from data collection to data insight. It's not enough to know your conversion rate dropped — you want to know which traffic source, which page, which stage. Level 2 turns raw numbers into actionable diagnosis.",
      },
      {
        type: 'h3',
        text: 'Level 3: You can predict what will happen (Forecasting)',
      },
      {
        type: 'p',
        text: "Level 3 is optional for most SMBs, but it's where the 3x growth differential really comes from. At Level 3, you have enough historical data to model: 'If we increase content output by 30%, based on our last 12 months, we expect X more organic leads in 6 months.' Predictions are testable, which makes them valuable.",
      },
      {
        type: 'h2',
        text: 'The Most Common Data Mistakes SMBs Make',
      },
      {
        type: 'ul',
        items: [
          "Tracking vanity metrics — page views and social followers without tying them to revenue",
          "Measuring too many things — 20 KPIs means 20 things you're not really watching",
          "Looking at data retrospectively without acting on it — monthly reviews that end in 'interesting' and nothing changes",
          "Treating data as judgment — data tells you what happened, not necessarily why or what to do about it",
          "Not having a hypothesis — collecting data without a question to answer is just noise",
        ],
      },
      {
        type: 'h2',
        text: 'Building a Data Culture Without a Data Team',
      },
      {
        type: 'p',
        text: "The tool that matters most isn't software — it's a weekly habit. Every Monday, 30 minutes reviewing 3–5 core metrics. Every decision that's discussed in your team meeting includes a 'how will we measure this' answer. Every initiative has a defined success metric before it starts.",
      },
      {
        type: 'p',
        text: "This discipline is harder than any software implementation. It requires resisting the pressure to move fast and skip the measurement step. But it compounds: teams that review metrics weekly make better decisions faster than those that review quarterly, even with identical data.",
      },
      {
        type: 'h2',
        text: 'Your Data Stack for Under $100/Month',
      },
      {
        type: 'ul',
        items: [
          "Google Analytics 4 — free. Core web analytics.",
          "Google Search Console — free. Organic search visibility.",
          "HubSpot CRM — free tier. Lead and deal tracking.",
          "Looker Studio (Google Data Studio) — free. Combines all your data in one dashboard.",
          "Hotjar — $39/month. Behavioral analytics, heatmaps, recordings.",
        ],
      },
      {
        type: 'p',
        text: "Total: $39/month for a complete data stack that most companies with dedicated analysts would recognize as legitimate. The tools aren't the bottleneck. The habit is.",
      },
      {
        type: 'blockquote',
        text: '"In God we trust. All others must bring data." — W. Edwards Deming. Build the habit of bringing data to every significant decision, and your business starts making fewer expensive mistakes.',
      },
    ],
  },
  {
    slug: 'google-analytics-4-small-business-guide',
    title: 'Google Analytics 4 for Small Business: Setup & the KPIs That Actually Matter',
    description: 'GA4 replaced Universal Analytics in 2023. Most small businesses still haven\'t set it up correctly. Here\'s the complete guide: setup, events, and the 6 reports you actually need.',
    date: '2025-05-07',
    readTime: '10 min read',
    category: 'Analytics',
    keywords: ['google analytics 4 small business', 'GA4 setup guide', 'GA4 for SMB', 'google analytics tutorial 2025'],
    sections: [
      {
        type: 'p',
        text: "Google Analytics 4 (GA4) became the default analytics platform in July 2023 when Universal Analytics was retired. Two years later, a significant portion of small businesses either haven't migrated, have it installed incorrectly, or have it running but don't know what to look at.",
      },
      {
        type: 'p',
        text: "This guide covers the full setup and — more importantly — the 6 reports that actually matter for a small business making data-driven decisions.",
      },
      {
        type: 'h2',
        text: 'Setting Up GA4 Correctly',
      },
      {
        type: 'h3',
        text: 'Step 1: Create the Property',
      },
      {
        type: 'ol',
        items: [
          "Go to analytics.google.com and sign in with your business Google account.",
          "Click Admin (gear icon) → Create Property.",
          "Name it '[Your Business] - Production'. Select your timezone and currency.",
          "Choose 'Web' as the platform and enter your domain.",
          "Copy the Measurement ID (format: G-XXXXXXXXXX).",
        ],
      },
      {
        type: 'h3',
        text: 'Step 2: Install the Tag',
      },
      {
        type: 'p',
        text: "Recommended method: Google Tag Manager (GTM). Install GTM on your site first, then add a GA4 Configuration tag using your Measurement ID. This gives you flexibility to add more tracking later without touching your site's code.",
      },
      {
        type: 'p',
        text: "If you're on WordPress, plugins like 'Site Kit by Google' or 'MonsterInsights' handle the connection without GTM.",
      },
      {
        type: 'callout',
        text: "Critical: verify the installation using GA4's Realtime report. Open your site in a browser, go to GA4, and check Realtime → Users. If you see yourself as an active user, it's working. If not, your tag isn't firing.",
      },
      {
        type: 'h3',
        text: 'Step 3: Configure the Most Important Events',
      },
      {
        type: 'p',
        text: "GA4 tracks 'events' instead of pageviews + goals like Universal Analytics did. Some events are automatic (page_view, scroll, click). Others you need to configure.",
      },
      {
        type: 'p',
        text: "The events every SMB must track:",
      },
      {
        type: 'ul',
        items: [
          "form_submit — when someone fills out your contact form. This is your most important conversion event.",
          "phone_call — if you have a click-to-call button, track clicks as a conversion.",
          "purchase — if you sell online, this should already be configured if you're using Shopify, WooCommerce, etc.",
          "file_download — if you have a lead magnet or brochure PDF.",
          "scroll depth — GA4 tracks 90% scroll automatically, which helps identify content engagement.",
        ],
      },
      {
        type: 'h3',
        text: 'Step 4: Mark Conversions',
      },
      {
        type: 'p',
        text: "In GA4, go to Admin → Events and toggle on 'Mark as conversion' for form_submit, phone_call, and purchase. This surfaces these in the conversion reports and enables conversion-based analysis.",
      },
      {
        type: 'h2',
        text: 'The 6 GA4 Reports That Matter for SMBs',
      },
      {
        type: 'h3',
        text: '1. Acquisition Overview',
      },
      {
        type: 'p',
        text: "Reports → Acquisition → Traffic Acquisition. This shows where your visitors come from: Organic Search, Direct, Referral, Paid Search, Email, etc. The metric you care about: conversions by channel. High traffic, low conversions from a channel means either misaligned audience or weak landing page for that traffic.",
      },
      {
        type: 'h3',
        text: '2. Landing Page Performance',
      },
      {
        type: 'p',
        text: "Reports → Engagement → Landing Page. This shows which pages visitors arrive on first. Sort by Conversions. Your homepage should not necessarily be your top converting landing page — specific landing pages designed for one purpose usually outperform.",
      },
      {
        type: 'h3',
        text: '3. User Journey (Funnel Exploration)',
      },
      {
        type: 'p',
        text: "Explore → Funnel Exploration. Set up: Homepage → Services/Product Page → Contact Page → Thank You Page. This shows where you lose people. A 70% drop at the contact page means your form or value proposition at that stage is the problem.",
      },
      {
        type: 'h3',
        text: '4. Audience Demographics and Interests',
      },
      {
        type: 'p',
        text: "Reports → User → User Attributes. This tells you who is visiting: age, gender, location, device. Compare your actual audience to your intended audience. If you're targeting 35–55-year-old business owners and your traffic is 18–24, something about your messaging or distribution is off.",
      },
      {
        type: 'h3',
        text: '5. Search Console Integration',
      },
      {
        type: 'p',
        text: "Admin → Property Settings → Search Console. Once connected, you get a 'Search Console' section in GA4 that shows which search queries bring visitors and their average position. Find queries where you're in positions 4–20 — these are pages close to page 1 that need content or link building attention.",
      },
      {
        type: 'h3',
        text: '6. Real-Time',
      },
      {
        type: 'p',
        text: "Reports → Realtime. Not just for testing — use this when you launch a campaign, send an email, or post on social. It shows immediate traffic response and lets you catch problems (a broken form, a 404 page) before they cost significant conversions.",
      },
      {
        type: 'h2',
        text: 'Common GA4 Mistakes to Avoid',
      },
      {
        type: 'ul',
        items: [
          "Not filtering your own traffic — add an IP filter so your own visits don't inflate the data. Admin → Data Streams → your stream → Configure Tag Settings → Define Internal Traffic.",
          "Ignoring data retention settings — GA4 defaults to 2 months. Change it to 14 months. Admin → Data Settings → Data Retention.",
          "Comparing GA4 to Universal Analytics numbers — they measure differently. Don't try to match historical UA data to GA4.",
          "Using GA4 without a hypothesis — pull reports with a specific question in mind, not just to see numbers.",
        ],
      },
      {
        type: 'p',
        text: "GA4 is more powerful than Universal Analytics for conversion-focused analysis, but it has a steeper learning curve. The setup investment is worth it: once it's running correctly, you have a real-time window into how your business actually grows.",
      },
      {
        type: 'blockquote',
        text: "Analytics isn't about having more data. It's about having the right data in front of the right people at the right time — so decisions can be made instead of guessed.",
      },
    ],
  },
];

export function getAllPosts(): Post[] {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
