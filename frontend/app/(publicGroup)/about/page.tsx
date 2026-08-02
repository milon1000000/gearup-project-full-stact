import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Award,
  Package,
  Store,
  Layers,
  CheckCircle2,
  ArrowRight,
  Search,
  BadgeCheck,
  CreditCard,
  ShieldCheck,
  Sparkles,
  Star,
  HeartHandshake,
  ChevronRight,
  Clock,
  Target,
  Zap,
  Quote,
} from "lucide-react";
import { getAllGear } from "../_actions/getAllGear";
import { getAllCategories } from "../_actions/getAllCategories";
import { isValidImageUrl } from "@/lib/utils";

const categoryColors = [
  "bg-blue-50 text-blue-600",
  "bg-purple-50 text-purple-600",
  "bg-amber-50 text-amber-600",
  "bg-emerald-50 text-emerald-600",
  "bg-rose-50 text-rose-600",
  "bg-indigo-50 text-indigo-600",
  "bg-teal-50 text-teal-600",
  "bg-orange-50 text-orange-600",
];

const AboutPage = async () => {
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

  const providerIds = new Set(
    gears.map((g) => g.provider?.id).filter((id): id is string => Boolean(id)),
  );
  const providerCount = providerIds.size;
  const availableNow = gears.filter((g) => g.available && (g.stock ?? 0) > 0).length;

  const featuredGears = gears.filter((g) => isValidImageUrl(g.image)).slice(0, 4);

  const categoriesWithCounts = categories
    .map((cat) => ({
      ...cat,
      count: gears.filter((g) => g.categoryId === cat.id).length,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  const stats = [
    {
      icon: Package,
      label: "Gears",
      value: totalGears.toLocaleString(),
      suffix: "+",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: Store,
      label: "Providers",
      value: providerCount.toLocaleString(),
      suffix: "+",
      color: "bg-purple-50 text-purple-600",
    },
    {
      icon: Layers,
      label: "Categories",
      value: categories.length.toLocaleString(),
      suffix: "+",
      color: "bg-amber-50 text-amber-600",
    },
    {
      icon: CheckCircle2,
      label: "Available",
      value: availableNow.toLocaleString(),
      suffix: "",
      color: "bg-emerald-50 text-emerald-600",
    },
  ];

  const steps = [
    {
      icon: Search,
      step: "01",
      title: "Browse & Book",
      description: "Explore our marketplace of verified cameras, lenses, lights, and audio gear.",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: BadgeCheck,
      step: "02",
      title: "Provider Confirms",
      description: "Your booking request goes straight to the gear owner for quick confirmation.",
      color: "bg-purple-50 text-purple-600",
    },
    {
      icon: CreditCard,
      step: "03",
      title: "Pay & Collect",
      description: "Complete a secure payment, collect your gear, and start creating.",
      color: "bg-emerald-50 text-emerald-600",
    },
  ];

  const values = [
    {
      icon: ShieldCheck,
      title: "Verified Equipment",
      description: "Every gear item is checked by its owner and reviewed by the community.",
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      icon: Sparkles,
      title: "Flexible Plans",
      description: "Rent by the day, week, or project based on your timeline.",
      color: "bg-amber-50 text-amber-600",
    },
    {
      icon: HeartHandshake,
      title: "Fair For Everyone",
      description: "Creators get pro gear without the heavy price tag.",
      color: "bg-rose-50 text-rose-600",
    },
    {
      icon: Clock,
      title: "Always Available",
      description: "24/7 support for urgent rentals and payment assistance.",
      color: "bg-indigo-50 text-indigo-600",
    },
  ];

  const missionPoints = [
    "Connecting creators with pro-grade equipment at a fraction of the cost",
    "Building trust through verified providers and community reviews",
    "Keeping gear in use instead of sitting idle on shelves",
  ];

  const categoryGradients = [
    "from-blue-400 to-indigo-500",
    "from-purple-400 to-fuchsia-500",
    "from-amber-400 to-orange-500",
    "from-emerald-400 to-teal-500",
    "from-rose-400 to-pink-500",
    "from-indigo-400 to-blue-500",
    "from-teal-400 to-emerald-500",
    "from-orange-400 to-red-500",
  ];

  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950" />
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.5) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute -top-24 -right-24 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-emerald-500/25 blur-3xl" />
        <div className="absolute -bottom-32 -left-24 h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-blue-500/25 blur-3xl" />

        <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Left: copy */}
            <div className="text-center lg:text-left space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/15 text-emerald-300 px-4 py-1.5 rounded-full text-xs font-semibold">
                <Award className="h-3.5 w-3.5" /> Welcome to GearUp
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
                Empowering Creators with{" "}
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">
                  Premium Gear Rentals
                </span>
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
                GearUp connects photographers, filmmakers, and content creators with top-tier equipment — no huge investment required.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1">
                <Link href="/gear" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto h-12 rounded-xl px-7 text-sm font-bold gap-2 bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/30">
                    Browse Gears <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/register" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto h-12 rounded-xl px-7 text-sm font-bold gap-2 bg-white/10 border-white/20 text-white hover:bg-white/25"
                  >
                    Become a Provider
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right: live stats panel (Fixed overflow & padding for mobile) */}
            <div className="relative w-full">
              <div className="rounded-3xl bg-white/5 backdrop-blur border border-white/10 p-3 sm:p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl bg-white/5 border border-white/10 p-3 sm:p-5 text-center hover:bg-white/10 transition-colors"
                    >
                      <div
                        className={`mx-auto h-8 w-8 sm:h-10 sm:w-10 rounded-xl flex items-center justify-center ${stat.color}`}
                      >
                        <stat.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                      <p className="mt-2 text-base sm:text-2xl font-black text-white">
                        {stat.value}
                        <span className="text-emerald-400">{stat.suffix}</span>
                      </p>
                      <p className="mt-0.5 text-[10px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400 truncate">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 sm:mt-4 rounded-2xl bg-gradient-to-r from-emerald-500/15 to-blue-500/15 border border-emerald-400/20 p-3 sm:p-4 flex items-center gap-3">
                  <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-300 shrink-0" />
                  <p className="text-[11px] sm:text-xs text-slate-200 font-medium">
                    Live numbers — updated straight from the marketplace.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── OUR STORY ───────────────────────────────────── */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-blue-50 border border-slate-100 p-6 sm:p-10 shadow-sm overflow-hidden">
              <Quote className="h-8 w-8 sm:h-10 sm:w-10 text-emerald-500/80" />
              <p className="mt-4 text-base sm:text-xl font-bold text-slate-900 leading-relaxed">
                “Great gear shouldn&apos;t be a barrier between you and your next great idea.”
              </p>
              <p className="mt-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                — The GearUp Team
              </p>
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-4">
            <span className="inline-flex items-center gap-2 bg-rose-50 text-rose-600 px-3 py-1 rounded-full text-xs font-semibold">
              <HeartHandshake className="h-3.5 w-3.5" /> Our Story
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              We Built GearUp for the Creator in All of Us
            </h2>
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
              GearUp started with a simple frustration: professional equipment is expensive, and most of it sits idle between projects.
            </p>
            <ul className="space-y-2.5 pt-1">
              {missionPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-slate-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─────────────────────────────────── */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5" /> Simple by design
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            Renting Gear in 3 Easy Steps
          </h2>
        </div>

        <div className="relative mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((step) => (
            <Card key={step.title} className="border-slate-100 shadow-sm rounded-3xl overflow-hidden">
              <CardContent className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${step.color}`}>
                    <step.icon className="h-6 w-6" />
                  </div>
                  <span className="text-2xl font-black text-slate-200">{step.step}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{step.title}</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ─── CATEGORIES (Grid 2 on mobile) ─── */}
      {categoriesWithCounts.length > 0 && (
        <section className="bg-slate-50/70 border-y border-slate-100">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-2 bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-xs font-semibold">
                  <Layers className="h-3.5 w-3.5" /> Explore by category
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
                  What Can You Rent Today?
                </h2>
              </div>
              <Link href="/gear" className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600">
                View all gears <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
              {categoriesWithCounts.map((cat, i) => (
                <Link
                  key={cat.id}
                  href={`/gear?categoryId=${cat.id}`}
                  className="group relative bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-lg transition-all p-3.5 sm:p-6"
                >
                  <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${categoryGradients[i % categoryGradients.length]}`} />
                  <div className="flex items-center justify-between">
                    <div className={`h-9 w-9 sm:h-12 sm:w-12 rounded-xl flex items-center justify-center ${categoryColors[i % categoryColors.length]}`}>
                      <Package className="h-4 w-4 sm:h-6 sm:w-6" />
                    </div>
                    <span className="text-[10px] sm:text-xs font-extrabold text-slate-900 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-full">
                      {cat.count}
                    </span>
                  </div>
                  <h3 className="mt-3 sm:mt-4 text-xs sm:text-sm font-bold text-slate-900 group-hover:text-purple-700 truncate">
                    {cat.name}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── FEATURED GEARS (Grid 2 on mobile) ─── */}
      {featuredGears.length > 0 && (
        <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-semibold">
                <Star className="h-3.5 w-3.5" /> Fresh from the marketplace
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
                Popular Gears Right Now
              </h2>
            </div>
            <Link href="/gear" className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600">
              See all gears <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {featuredGears.map((gear) => (
              <Link
                key={gear.id}
                href={`/gear/${gear.id}`}
                className="group bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="relative h-32 sm:h-44 bg-slate-50 overflow-hidden">
                  {isValidImageUrl(gear.image) ? (
                    <Image
                      src={gear.image}
                      alt={gear.name || "Gear image"}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-slate-300">
                      <Package className="h-8 w-8" />
                    </div>
                  )}
                  <span className="absolute bottom-2 right-2 text-[10px] sm:text-xs font-black text-white bg-slate-900/80 backdrop-blur px-2 py-0.5 rounded-lg">
                    ৳{gear.pricePerDay}<span className="text-[8px] font-semibold">/d</span>
                  </span>
                </div>
                <div className="p-3 sm:p-5">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-emerald-700">
                    {gear.name}
                  </h3>
                  <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                    <span className="truncate">{gear.provider?.name || "GearUp"}</span>
                    {(gear.stock ?? 0) > 0 ? (
                      <span className="text-emerald-600 font-bold">In stock</span>
                    ) : (
                      <span className="text-rose-600 font-bold">Out</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ─── WHY GEARUP ───────────────────────────────────── */}
      <section className="bg-slate-50/70 border-y border-slate-100">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-2 bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-xs font-semibold">
              <HeartHandshake className="h-3.5 w-3.5" /> Why GearUp
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
              Built for Creators, Powered by Community
            </h2>
          </div>

          <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((value) => (
              <Card key={value.title} className="border-slate-100 shadow-sm rounded-3xl">
                <CardContent className="p-5 sm:p-6 space-y-3">
                  <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-xl flex items-center justify-center ${value.color}`}>
                    <value.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{value.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────── */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 sm:p-12 text-center">
          <div className="relative space-y-4 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/15 text-emerald-300 px-4 py-1.5 rounded-full text-xs font-semibold">
              <Target className="h-3.5 w-3.5" /> Ready when you are
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Ready to Start Your Next Project?
            </h2>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/gear" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto h-12 rounded-xl px-7 text-sm font-bold gap-2 bg-emerald-500 hover:bg-emerald-400 text-white">
                  Browse Gears <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;