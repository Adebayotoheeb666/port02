import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Solution = {
  icon: string;
  title: string;
  problem: string;
  solution: string;
  features: string[];
  tech: string[];
};

const solutions: Solution[] = [
  {
    icon: "⚡",
    title: "Slow Website Performance",
    problem:
      "Your website takes forever to load, causing visitors to leave before seeing your content. High bounce rates, poor user experience, and lost conversions are costing you money.",
    solution:
      "Complete Website Speed Optimization Service – advanced caching, CDN integration, image optimization, code minification, and database optimization to achieve loading times under 2 seconds.",
    features: [
      "Performance audit and analysis",
      "Image compression and lazy loading",
      "CDN setup (Cloudflare/AWS CloudFront)",
      "Code minification and bundling",
      "Database query optimization",
      "Browser caching configuration",
      "90+ Google PageSpeed score guarantee",
    ],
    tech: ["Redis", "CDN", "WebP", "Gzip"],
  },
  {
    icon: "🔒",
    title: "Website Security Vulnerabilities",
    problem:
      "Your website is vulnerable to hacks, data breaches, malware, DDoS attacks, and other security threats. Customer data is at risk and your reputation is on the line.",
    solution:
      "Enterprise-Grade Security Hardening – multi-layered security: SSL, firewall protection, malware scanning, and continuous monitoring.",
    features: [
      "SSL certificate installation (HTTPS)",
      "Web Application Firewall (WAF)",
      "DDoS protection",
      "Malware scanning and removal",
      "Two-factor authentication",
      "Regular security audits",
      "24/7 security monitoring",
      "Backup and disaster recovery",
    ],
    tech: ["SSL/TLS", "WAF", "Cloudflare", "2FA"],
  },
  {
    icon: "📱",
    title: "Non-Responsive Design",
    problem:
      "Your website looks broken on mobile devices. You're losing customers who can't navigate your site on their phones or tablets.",
    solution:
      "Mobile-First Responsive Redesign – perfect display and functionality across all devices and screen sizes.",
    features: [
      "Mobile-first design approach",
      "Responsive layouts for all devices",
      "Touch-optimized interfaces",
      "Progressive Web App (PWA) capabilities",
      "Cross-browser compatibility",
      "Mobile performance optimization",
      "Google Mobile-Friendly certification",
    ],
    tech: ["HTML5", "CSS3", "Bootstrap", "PWA"],
  },
  {
    icon: "🔍",
    title: "Poor Search Engine Rankings",
    problem:
      "Your website is invisible on Google. You're buried on page 5+, getting no organic traffic, and watching competitors dominate.",
    solution:
      "Comprehensive SEO Optimization – technical SEO, on-page optimization, content strategy, and link building.",
    features: [
      "Complete SEO audit",
      "Keyword research and strategy",
      "On-page SEO optimization",
      "Technical SEO fixes",
      "Content optimization",
      "Schema markup implementation",
      "Local SEO setup (Google My Business)",
      "Monthly ranking reports",
    ],
    tech: ["Schema.org", "Analytics", "SEMrush", "Sitemap"],
  },
  {
    icon: "🛒",
    title: "Complex E-commerce Setup",
    problem:
      "You need to sell products online but don't know where to start: payments, inventory, shipping logistics are overwhelming.",
    solution:
      "Turnkey E-commerce Platform – complete stores with secure payments, inventory tracking, and shipping integration.",
    features: [
      "Custom e-commerce website",
      "Product catalog management",
      "Shopping cart and checkout",
      "Multiple payment gateways (Stripe, PayPal)",
      "Inventory management system",
      "Shipping calculator integration",
      "Order tracking system",
      "Customer accounts and wishlists",
      "Sales analytics dashboard",
    ],
    tech: ["WooCommerce", "Stripe", "PayPal", "Shopify"],
  },
  {
    icon: "📊",
    title: "No Business Analytics",
    problem:
      "You have no idea who visits your website, what they do, or why they leave. You're making decisions without data.",
    solution:
      "Advanced Analytics and Tracking – deep insights into user behavior, conversion funnels, and ROI.",
    features: [
      "Google Analytics 4 setup",
      "Conversion tracking implementation",
      "Custom event tracking",
      "Heatmap and session recording",
      "A/B testing framework",
      "Custom dashboard creation",
      "Monthly analytics reports",
      "Actionable insights and recommendations",
    ],
    tech: ["Google Analytics", "Hotjar", "GTM", "Mixpanel"],
  },
  {
    icon: "💬",
    title: "Poor Customer Communication",
    problem:
      "Customers can't reach you easily. Lost inquiries and missed opportunities frustrate visitors.",
    solution:
      "Integrated Communication Hub – live chat, chatbots, contact forms, and CRM integration.",
    features: [
      "Live chat widget installation",
      "AI chatbot for 24/7 support",
      "Smart contact forms",
      "Email marketing integration",
      "CRM system setup",
      "Automated email responses",
      "SMS notification system",
      "Social media integration",
    ],
    tech: ["Intercom", "Zendesk", "Twilio", "HubSpot"],
  },
  {
    icon: "🎨",
    title: "Outdated Website Design",
    problem:
      "Your website looks outdated. Poor branding and unprofessional appearance hurt credibility.",
    solution:
      "Modern Website Redesign – contemporary designs that reflect your brand and convert.",
    features: [
      "Custom UI/UX design",
      "Brand identity refresh",
      "Modern color schemes and typography",
      "Professional graphics and imagery",
      "Interactive animations",
      "User-friendly navigation",
      "Conversion-optimized layouts",
      "3 design revisions included",
    ],
    tech: ["Figma", "Adobe XD", "Tailwind", "GSAP"],
  },
  {
    icon: "⚙️",
    title: "Manual Business Processes",
    problem:
      "You're wasting hours on repetitive tasks. Manual processing hurts productivity.",
    solution:
      "Business Process Automation – custom web apps that automate workflows and integrate systems.",
    features: [
      "Workflow automation analysis",
      "Custom automation scripts",
      "Third-party API integrations",
      "Automated invoicing and billing",
      "Inventory synchronization",
      "Email automation",
      "Report generation",
      "Staff training and documentation",
    ],
    tech: ["Zapier", "Python", "APIs", "Webhooks"],
  },
  {
    icon: "🌍",
    title: "Limited Global Reach",
    problem:
      "Your website only serves one country or language. You're missing international customers.",
    solution:
      "Multi-Language & Multi-Currency – localization with payments and geo features.",
    features: [
      "Multi-language support",
      "Auto-translation integration",
      "Multi-currency pricing",
      "International payment gateways",
      "Geo-location detection",
      "Localized content management",
      "International shipping rules",
      "Regional tax compliance",
    ],
    tech: ["i18n", "Google Translate", "Geo IP", "Stripe"],
  },
  {
    icon: "📧",
    title: "Low Email Conversions",
    problem:
      "Email campaigns have low engagement and poor sales; deliverability issues persist.",
    solution:
      "Email Marketing Optimization – automation, segmentation, and A/B testing.",
    features: [
      "Email platform setup (Mailchimp, SendGrid)",
      "Custom email templates",
      "Automated drip campaigns",
      "Customer segmentation",
      "A/B testing setup",
      "Abandoned cart recovery",
      "Newsletter design and strategy",
      "Deliverability optimization",
    ],
    tech: ["Mailchimp", "SendGrid", "MJML", "ActiveCampaign"],
  },
  {
    icon: "🔗",
    title: "Broken Integration Systems",
    problem:
      "Your website doesn't connect with your other tools. Data is siloed and nothing syncs.",
    solution:
      "Complete System Integration – connect business tools via APIs and webhooks.",
    features: [
      "CRM integration (Salesforce, HubSpot)",
      "Payment gateway connections",
      "Accounting software sync (QuickBooks, Xero)",
      "Shipping API integration",
      "Social media automation",
      "Inventory management sync",
      "Custom API development",
      "Real-time data synchronization",
    ],
    tech: ["REST API", "GraphQL", "OAuth", "Webhooks"],
  },
  {
    icon: "🎓",
    title: "Content Management Difficulties",
    problem:
      "You need a developer for every content change; you can't maintain your site.",
    solution:
      "User-Friendly CMS Implementation – visual builders and structured CMS setup.",
    features: [
      "WordPress/custom CMS setup",
      "Visual page builder integration",
      "Media library management",
      "Blog and news system",
      "User role management",
      "Content scheduling",
      "SEO-friendly structure",
      "Training and documentation",
    ],
    tech: ["WordPress", "Strapi", "Contentful", "Elementor"],
  },
  {
    icon: "📅",
    title: "Appointment Booking Chaos",
    problem:
      "Scheduling via calls/emails causes double bookings, no-shows, and wasted time.",
    solution:
      "Online Booking System – automated scheduling with reminders and payments.",
    features: [
      "Online booking calendar",
      "Automated email/SMS reminders",
      "Google Calendar sync",
      "Payment collection at booking",
      "Staff availability management",
      "Customer management system",
      "Cancellation and rescheduling",
      "Booking analytics and reports",
    ],
    tech: ["Calendly", "Acuity", "Laravel", "Twilio"],
  },
  {
    icon: "💾",
    title: "Data Loss & Backup Issues",
    problem:
      "No backup system; a crash or hack could wipe years of data and presence.",
    solution:
      "Automated Backup & Recovery – redundant backups with quick restore.",
    features: [
      "Automated daily backups",
      "Off-site backup storage",
      "Database backup automation",
      "One-click restore functionality",
      "Version control for files",
      "Disaster recovery plan",
      "Backup monitoring alerts",
      "30-day backup retention",
    ],
    tech: ["AWS S3", "UpdraftPlus", "Git", "MySQL"],
  },
  {
    icon: "🎯",
    title: "Low Conversion Rates",
    problem:
      "Traffic without sales; visitors leave without taking action.",
    solution:
      "Conversion Rate Optimization – analyze behavior, remove friction, and test.",
    features: [
      "Conversion funnel analysis",
      "User behavior tracking",
      "A/B testing implementation",
      "Landing page optimization",
      "Call-to-action improvements",
      "Form optimization",
      "Trust signal integration",
      "Monthly optimization reports",
    ],
    tech: ["Optimizely", "VWO", "Hotjar", "Google Optimize"],
  },
  {
    icon: "🎬",
    title: "Poor Content Presentation",
    problem:
      "Boring text walls; no engaging media to capture attention.",
    solution:
      "Interactive Content Platform – videos, animations, and interactive elements.",
    features: [
      "Video content integration",
      "Interactive infographics",
      "Image galleries and sliders",
      "Animated statistics",
      "Scroll-triggered animations",
      "3D product viewers",
      "Interactive calculators/tools",
      "Content strategy consultation",
    ],
    tech: ["Three.js", "GSAP", "YouTube API", "Vimeo"],
  },
  {
    icon: "👥",
    title: "No User Account System",
    problem:
      "Users can't create accounts, save preferences, or track orders.",
    solution:
      "Complete User Management – secure auth, profiles, dashboards, and personalization.",
    features: [
      "User registration and login",
      "Social media login (Google, Facebook)",
      "Password recovery system",
      "User profile management",
      "Order history and tracking",
      "Saved preferences",
      "Email verification",
      "Role-based access control",
    ],
    tech: ["JWT", "OAuth 2.0", "Laravel Auth", "Firebase"],
  },
  {
    icon: "📱",
    title: "No Mobile App Presence",
    problem:
      "Competitors have apps with push and offline. You're missing engagement and loyalty.",
    solution:
      "PWA Development – app-like experience on all devices without app stores.",
    features: [
      "Progressive Web App development",
      "Offline functionality",
      "Push notifications",
      "Add to home screen feature",
      "App-like navigation",
      "Fast loading and caching",
      "Background sync",
      "Cross-platform compatibility",
    ],
    tech: ["PWA", "Service Workers", "React Native", "Firebase"],
  },
  {
    icon: "🎪",
    title: "No Social Media Integration",
    problem:
      "Website and social media are siloed; can't leverage social proof or sharing.",
    solution:
      "Social Media Integration Suite – seamless sharing, social proof, and engagement.",
    features: [
      "Social media feed integration",
      "Social sharing buttons",
      "Instagram shopping integration",
      "Facebook Pixel setup",
      "Social login options",
      "Review aggregation display",
      "Auto-posting to social media",
      "Social proof widgets",
    ],
    tech: ["Facebook API", "Instagram API", "Twitter API", "Buffer"],
  },
  {
    icon: "💳",
    title: "Complex Payment Processing",
    problem:
      "Payment setup is confusing; customers can't pay as they prefer or checkout is complex.",
    solution:
      "Multi-Gateway Payments – secure, PCI-compliant processing with cards, wallets, and subscriptions.",
    features: [
      "Multiple payment gateway integration",
      "Credit/debit card processing",
      "Digital wallets (Apple Pay, Google Pay)",
      "Subscription and recurring billing",
      "One-click checkout",
      "Secure payment storage",
      "Refund management",
      "PCI compliance setup",
    ],
    tech: ["Stripe", "PayPal", "Square", "Authorize.net"],
  },
  {
    icon: "📍",
    title: "Poor Local Visibility",
    problem:
      "Local customers can't find you in \"near me\" searches; competitors dominate.",
    solution:
      "Local SEO & Maps Optimization – optimize presence, set up Google My Business, and get on the map.",
    features: [
      "Google My Business optimization",
      "Local keyword targeting",
      "NAP (Name, Address, Phone) consistency",
      "Google Maps integration",
      "Local directory listings",
      "Review management system",
      "Location-based content",
      "Local schema markup",
    ],
    tech: ["Google My Business", "Schema.org", "Yelp API", "Maps API"],
  },
  {
    icon: "🎓",
    title: "No Online Training/Courses",
    problem:
      "You have expertise to share but no platform to sell courses or training.",
    solution:
      "Learning Management System – full e-learning: video hosting, quizzes, certificates, and progress tracking.",
    features: [
      "Course creation and management",
      "Video hosting and streaming",
      "Quiz and assignment system",
      "Student dashboard",
      "Progress tracking",
      "Certificate generation",
      "Drip content scheduling",
      "Discussion forums",
    ],
    tech: ["Moodle", "LearnDash", "Vimeo", "Teachable"],
  },
  {
    icon: "🔔",
    title: "No Customer Retention Strategy",
    problem:
      "Customers buy once and disappear; no programs or personalization to retain them.",
    solution:
      "Customer Retention Platform – loyalty programs, follow-ups, and personalization to drive repeat business.",
    features: [
      "Loyalty points system",
      "Rewards and referral program",
      "Automated win-back campaigns",
      "Personalized recommendations",
      "Birthday/anniversary emails",
      "VIP customer tiers",
      "Re-engagement automation",
      "Customer lifetime value tracking",
    ],
    tech: ["Smile.io", "LoyaltyLion", "Klaviyo", "Segment"],
  },
];

const Card = ({ s }: { s: Solution }) => (
  <div
    className={cn(
      "relative overflow-hidden rounded-3xl border border-white/10 group hover:shadow-xl transition duration-200 shadow-input dark:shadow-none flex flex-col space-y-4 p-6",
    )}
    style={{
      background: "rgb(4,7,29)",
      backgroundColor:
        "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
    }}
  >
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl">
        {s.icon}
      </div>
      <h3 className="text-white text-lg md:text-xl lg:text-2xl font-bold max-w-[26rem]">
        {s.title}
      </h3>
    </div>

    <div className="text-[#C1C2D3] text-sm md:text-base">
      <p className="mb-2"><span className="text-white font-semibold">Problem:</span> {s.problem}</p>
      <p><span className="text-white font-semibold">Solution:</span> {s.solution}</p>
    </div>

    <div className="mt-2">
      <h4 className="text-white text-sm font-semibold mb-2">What You Get:</h4>
      <ul className="list-disc pl-5 space-y-1 text-[#C1C2D3] text-sm">
        {s.features.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>
    </div>

    <div className="flex flex-wrap gap-2 mt-3">
      {s.tech.map((t, i) => (
        <span
          key={i}
          className="bg-[#10132E] text-white text-xs px-3 py-1 rounded-lg"
        >
          {t}
        </span>
      ))}
    </div>
  </div>
);

const Solutions = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollerRef = useRef<HTMLUListElement | null>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (containerRef.current && scrollerRef.current) {
      const children = Array.from(scrollerRef.current.children);
      children.forEach((child) => {
        const clone = child.cloneNode(true);
        scrollerRef.current?.appendChild(clone);
      });

      // default direction and speed
      containerRef.current.style.setProperty("--animation-direction", "forwards");
      containerRef.current.style.setProperty("--animation-duration", "40s");

      setStart(true);
    }
  }, []);

  return (
    <section id="solutions" className="w-full py-20">
      <div
        ref={containerRef}
        className={cn(
          "scroller relative z-20 w-screen overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]"
        )}
      >
        <ul
          ref={scrollerRef}
          className={cn(
            "flex min-w-full shrink-0 gap-6 py-4 w-max flex-nowrap",
            start && "animate-scroll",
            "hover:[animation-play-state:paused]"
          )}
        >
          {solutions.map((s, idx) => (
            <li
              key={idx}
              className="w-[90vw] max-w-[420px] flex-shrink-0"
              style={{ padding: "0 12px" }}
            >
              <Card s={s} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Solutions;
