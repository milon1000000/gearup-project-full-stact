import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Headphones,
  ShieldCheck,
  ChevronDown,
  Package,
  Layers,
  Users,
  CheckCircle2,
  ArrowRight,
  Building2,
  Store,
  Send,
  BadgeCheck,
} from "lucide-react";
import { getAllGear } from "../_actions/getAllGear";
import { getAllCategories } from "../_actions/getAllCategories";

const contactInfo = [
  {
    icon: MapPin,
    title: "Head Office",
    lines: ["House 12, Road 5, Dhanmondi", "Dhaka 1205, Bangladesh"],
    color: "bg-rose-50 text-rose-600",
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: ["+880 1711-000000", "+880 9611-000000"],
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["support@gearup.com", "hello@gearup.com"],
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Clock,
    title: "Working Hours",
    lines: ["Sat – Thu: 9:00 AM – 9:00 PM", "Friday: 2:00 PM – 9:00 PM"],
    color: "bg-amber-50 text-amber-600",
  },
];

const adminContact = [
  {
    icon: Mail,
    label: "Admin Email",
    value: "admin@gearup.com",
    href: "mailto:admin@gearup.com",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Phone,
    label: "Admin Phone",
    value: "+880 1711-000000",
    href: "tel:+8801711000000",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: MapPin,
    label: "Head Office",
    value: "House 12, Road 5, Dhanmondi, Dhaka 1205",
    href: undefined,
    color: "bg-rose-50 text-rose-600",
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 24 hours on working days",
    href: undefined,
    color: "bg-amber-50 text-amber-600",
  },
];

const faqs = [
  {
    question: "How do I rent a gear item on GearUp?",
    answer:
      "Browse the gear marketplace, pick an item, choose your rental dates and quantity, then confirm your booking. Once the provider approves, complete the secure payment and collect your gear.",
  },
  {
    question: "What happens if the gear is damaged during rental?",
    answer:
      "All gear is inspected before and after every rental. Any damage beyond normal wear is handled through our clear damage policy — contact support immediately with photos and we'll guide you through the process.",
  },
  {
    question: "Can I cancel a rental after payment?",
    answer:
      "Yes. Pending bookings can be cancelled directly from your dashboard. Paid bookings are refunded according to our cancellation policy, typically within 3–5 working days.",
  },
  {
    question: "How do I become a gear provider?",
    answer:
      "Register as a provider, list your equipment with photos and details, and start receiving rental requests. Providers earn directly from every confirmed rental on the platform.",
  },
];

const ContactPage = async () => {
  const [gearRes, categoriesRes] = await Promise.all([
    getAllGear({ query: { limit: "100" } }).catch(() => ({
      success: false,
      data: [],
      meta: { total: 0 },
    })),
    getAllCategories().catch(() => ({ success: false, data: [] })),
  ]);

  const gears = Array.isArray(gearRes?.data) ? gearRes.data : [];
  const totalGears = gearRes?.meta?.total ?? gears.length;
  const categories = Array.isArray(categoriesRes?.data) ? categoriesRes.data : [];

  // Derive real providers from the live gear list (each gear has provider info)
  const providerMap = new Map<
    string,
    { id: string; name: string; email: string; gearCount: number }
  >();
  gears.forEach((g) => {
    const provider = g.provider;
    if (!provider?.id) return;
    const existing = providerMap.get(provider.id);
    if (existing) {
      existing.gearCount += 1;
    } else {
      providerMap.set(provider.id, {
        id: provider.id,
        name: provider.name || "Provider",
        email: provider.email || "",
        gearCount: 1,
      });
    }
  });
  const providers = Array.from(providerMap.values())
    .sort((a, b) => b.gearCount - a.gearCount)
    .slice(0, 8);

  const liveStats = [
    {
      icon: Package,
      value: `${totalGears}+`,
      label: "Gears Listed",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: Layers,
      value: `${categories.length}+`,
      label: "Categories",
      color: "bg-purple-50 text-purple-600",
    },
    {
      icon: Users,
      value: `${providers.length}+`,
      label: "Providers",
      color: "bg-amber-50 text-amber-600",
    },
    {
      icon: CheckCircle2,
      value: "24/7",
      label: "Live Support",
      color: "bg-emerald-50 text-emerald-600",
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* ─── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950" />
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="relative container mx-auto max-w-7xl px-4 py-16 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/15 text-emerald-300 px-4 py-1.5 rounded-full text-xs font-semibold mb-6">
            <MessageCircle className="h-3.5 w-3.5" /> We&apos;d love to hear from you
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight max-w-3xl mx-auto">
            Get in Touch with{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              GearUp
            </span>
          </h1>
          <p className="mt-5 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Reach our admin team for platform issues, or contact gear providers
            directly about their equipment.
          </p>

          {/* Live platform stats */}
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {liveStats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition-colors"
              >
                <div
                  className={`mx-auto h-10 w-10 rounded-xl flex items-center justify-center ${stat.color}`}
                >
                  <stat.icon className="h-5 w-5" />
                </div>
                <p className="mt-3 text-2xl font-black text-white">{stat.value}</p>
                <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl px-4 py-12 sm:py-16 space-y-14">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {contactInfo.map((item) => (
            <Card
              key={item.title}
              className="border-slate-100 shadow-sm bg-white rounded-2xl hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <CardContent className="p-6 space-y-3">
                <div
                  className={`h-12 w-12 rounded-xl flex items-center justify-center ${item.color}`}
                >
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                <div className="space-y-0.5">
                  {item.lines.map((line) => (
                    <p key={line} className="text-xs text-slate-500">
                      {line}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ─── Contact the Admin Team ─────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          <div className="lg:col-span-1 relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 p-8 flex flex-col justify-between text-white shadow-xl">
            <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="relative space-y-4">
              <div className="h-14 w-14 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center">
                <Building2 className="h-7 w-7 text-blue-300" />
              </div>
              <h2 className="text-2xl font-extrabold leading-tight">
                Contact the GearUp Admin Team
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                For account issues, payment disputes, provider verification, or
                any platform-level question — the admin team is here to help.
              </p>
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-300">
                <ShieldCheck className="h-4 w-4" />
                Official support channel
              </div>
            </div>
            <Link
              href="mailto:admin@gearup.com"
              className="relative mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-white text-slate-900 hover:bg-blue-50 text-xs font-bold px-5 py-3 transition-colors shadow-lg"
            >
              <Send className="h-4 w-4" /> Email the Admin
            </Link>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {adminContact.map((item) => (
              <Card
                key={item.label}
                className="border-slate-100 shadow-sm bg-white rounded-2xl hover:shadow-md transition-all"
              >
                <CardContent className="p-6 space-y-3">
                  <div
                    className={`h-12 w-12 rounded-xl flex items-center justify-center ${item.color}`}
                  >
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {item.label}
                  </h3>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors break-words"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm font-bold text-slate-900 break-words">
                      {item.value}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ─── Contact the Providers ──────────────────────── */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-semibold">
                <Store className="h-3.5 w-3.5" /> Live from the marketplace
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Contact Gear Providers Directly
              </h2>
              <p className="text-sm text-slate-500 max-w-xl">
                Have a question about a specific gear item, availability, or a
                custom rental? Reach the providers who own the equipment.
              </p>
            </div>
            <Link
              href="/gear"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700"
            >
              Browse all gears <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {providers.length === 0 ? (
            <Card className="border-slate-100 shadow-sm bg-white rounded-3xl">
              <CardContent className="p-10 text-center space-y-3">
                <div className="mx-auto h-14 w-14 rounded-full bg-slate-50 text-slate-300 flex items-center justify-center">
                  <Store className="h-7 w-7" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  No providers listed yet
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Once providers list their equipment on GearUp, you&apos;ll be
                  able to contact them directly from here.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {providers.map((provider) => (
                <Card
                  key={provider.id}
                  className="border-slate-100 shadow-sm bg-white rounded-2xl hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center text-lg font-black shrink-0">
                        {provider.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-bold text-slate-900 truncate">
                          {provider.name}
                        </h3>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full mt-0.5">
                          <BadgeCheck className="h-3 w-3" /> Gear Provider
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-500">
                      <p className="flex items-center gap-2 truncate">
                        <Package className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        {provider.gearCount}{" "}
                        {provider.gearCount === 1 ? "gear item" : "gear items"} listed
                      </p>
                      {provider.email && (
                        <p className="flex items-center gap-2 truncate">
                          <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">{provider.email}</span>
                        </p>
                      )}
                    </div>

                    {provider.email && (
                      <a
                        href={`mailto:${provider.email}?subject=${encodeURIComponent(
                          "Gear rental inquiry",
                        )}`}
                        className="flex items-center justify-center gap-2 w-full rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-bold px-4 py-2.5 transition-colors"
                      >
                        <Send className="h-3.5 w-3.5" /> Email Provider
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* ─── 24/7 Support + Quick Links ─────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-1">
            <Card className="border-slate-100 shadow-sm bg-white rounded-3xl overflow-hidden">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 space-y-4">
                <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <Headphones className="h-6 w-6 text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold">24/7 Live Support</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Facing an urgent issue with a rental or payment? Our live
                  support channel is always available for emergencies.
                </p>
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
                  <ShieldCheck className="h-4 w-4" />
                  Average response time: under 30 minutes
                </div>
              </div>
              <CardContent className="p-6 space-y-4">
                <h4 className="text-sm font-bold text-slate-900">
                  Quick Links
                </h4>
                <ul className="space-y-2.5 text-xs font-medium text-slate-600">
                  <li>
                    <Link
                      href="/about"
                      className="group flex items-center justify-between hover:text-emerald-600 transition-colors"
                    >
                      <span>About GearUp</span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/gear"
                      className="group flex items-center justify-between hover:text-emerald-600 transition-colors"
                    >
                      <span>Browse Rental Gear</span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/my-rentals"
                      className="group flex items-center justify-between hover:text-emerald-600 transition-colors"
                    >
                      <span>Track My Rentals</span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/my-payment"
                      className="group flex items-center justify-between hover:text-emerald-600 transition-colors"
                    >
                      <span>My Payments</span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-slate-500">
                Quick answers to the questions we hear the most.
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group bg-white rounded-2xl border border-slate-100 shadow-sm px-5 py-4 open:border-emerald-200 open:ring-1 open:ring-emerald-100 transition-all"
                >
                  <summary className="flex items-center justify-between gap-4 cursor-pointer list-none text-sm font-bold text-slate-900">
                    {faq.question}
                    <ChevronDown className="h-4 w-4 text-slate-400 shrink-0 group-open:rotate-180 transition-transform" />
                  </summary>
                  <p className="mt-3 text-xs sm:text-sm text-slate-500 leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
