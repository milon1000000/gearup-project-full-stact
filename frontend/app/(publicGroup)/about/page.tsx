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
  Globe,
  Rocket,
  Target,
  Zap,
  Quote,
} from "lucide-react";
import { getAllGear } from "../_actions/getAllGear";
import { getAllCategories } from "../_actions/getAllCategories";

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

  // Real stats derived from live data
  const providerIds = new Set(
    gears.map((g) => g.provider?.id).filter((id): id is string => Boolean(id)),
  );
  const providerCount = providerIds.size;
  const availableNow = gears.filter((g) => g.available && (g.stock ?? 0) > 0).length;

  // Featured gears (with images) for the showcase
  const featuredGears = gears.filter((g) => g.image).slice(0, 4);

  // Categories with live gear counts
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
      label: "Gears in Marketplace",
      value: totalGears.toLocaleString(),
      suffix: "+",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: Store,
      label: "Active Providers",
      value: providerCount.toLocaleString(),
      suffix: "+",
      color: "bg-purple-50 text-purple-600",
    },
    {
      icon: Layers,
      label: "Equipment Categories",
      value: categories.length.toLocaleString(),
      suffix: "+",
      color: "bg-amber-50 text-amber-600",
    },
    {
      icon: CheckCircle2,
      label: "Available Right Now",
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
      description:
        "Explore our marketplace of verified cameras, lenses, lights, and audio gear. Pick the equipment and dates that fit your project.",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: BadgeCheck,
      step: "02",
      title: "Provider Confirms",
      description:
        "Your booking request goes straight to the gear owner. Once they confirm availability, you're one step away from shooting.",
      color: "bg-purple-50 text-purple-600",
    },
    {
      icon: CreditCard,
      step: "03",
      title: "Pay & Collect",
      description:
        "Complete a secure payment, collect your gear, and create. Return it after your rental and rate the experience.",
      color: "bg-emerald-50 text-emerald-600",
    },
  ];

  const values = [
    {
      icon: ShieldCheck,
      title: "Verified Equipment",
      description:
        "Every gear item is checked by its owner and reviewed by the community before and after each rental.",
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      icon: Sparkles,
      title: "Flexible Plans",
      description:
        "Rent by the day, week, or project. Choose pickup or delivery based on what works best for your timeline.",
      color: "bg-amber-50 text-amber-600",
    },
    {
      icon: HeartHandshake,
      title: "Fair For Everyone",
      description:
        "Creators get pro gear without the price tag. Providers earn from equipment that would otherwise sit idle.",
      color: "bg-rose-50 text-rose-600",
    },
    {
      icon: Clock,
      title: "Always Available",
      description:
        "24/7 support for urgent rentals, damage disputes, and payments. We're with you from booking to return.",
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
    <div className="bg-white min-h-screen">
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
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-emerald-500/25 blur-3xl" />
        <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-blue-500/25 blur-3xl" />

        <div className="relative container mx-auto max-w-7xl px-4 py-20 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* Left: copy */}
            <div className="text-center lg:text-left space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/15 text-emerald-300 px-4 py-1.5 rounded-full text-xs font-semibold">
                <Award className="h-3.5 w-3.5" /> Welcome to GearUp
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08]">
                Empowering Creators with{" "}
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">
                  Premium Gear Rentals
                </span>
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
                GearUp connects photographers, filmmakers, and content creators
                with top-tier equipment — no huge investment required. Rent what
                you need, when you need it, from trusted local providers.
              </p>
              <div className="flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-3 pt-1">
                <Link href="/gear">
                  <Button className="h-12 rounded-xl px-7 text-sm font-bold gap-2 bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/30">
                    Browse Gears <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    variant="outline"
                    className="h-12 rounded-xl px-7 text-sm font-bold gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
                  >
                    Become a Provider
                  </Button>
                </Link>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-6 pt-2">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <div className="h-7 w-7 rounded-full border-2 border-slate-900 bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-[10px] font-black text-white">
                      A
                    </div>
                    <div className="h-7 w-7 rounded-full border-2 border-slate-900 bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-[10px] font-black text-white">
                      M
                    </div>
                    <div className="h-7 w-7 rounded-full border-2 border-slate-900 bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-[10px] font-black text-white">
                      K
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 font-medium">
                    Trusted by <span className="text-white font-bold">200+</span>{" "}
                    creators
                  </p>
                </div>
                <div className="hidden sm:block h-8 w-px bg-white/15" />
                <p className="text-xs text-slate-400 font-medium">
                  Rated <span className="text-white font-bold">4.9/5</span> by
                  renters
                </p>
              </div>
            </div>

            {/* Right: live stats panel */}
            <div className="relative">
              <div className="rounded-3xl bg-white/5 backdrop-blur border border-white/10 p-6 sm:p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl bg-white/5 border border-white/10 p-5 text-center hover:bg-white/10 transition-colors"
                    >
                      <div
                        className={`mx-auto h-10 w-10 rounded-xl flex items-center justify-center ${stat.color}`}
                      >
                        <stat.icon className="h-5 w-5" />
                      </div>
                      <p className="mt-3 text-2xl font-black text-white">
                        {stat.value}
                        <span className="text-emerald-400">{stat.suffix}</span>
                      </p>
                      <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-2xl bg-gradient-to-r from-emerald-500/15 to-blue-500/15 border border-emerald-400/20 p-4 flex items-center gap-3">
                  <Zap className="h-5 w-5 text-emerald-300 shrink-0" />
                  <p className="text-xs text-slate-200 font-medium">
                    Live numbers — updated straight from the marketplace.
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 lg:left-6 lg:translate-x-0 rounded-2xl bg-white text-slate-900 shadow-xl px-4 py-3 flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-black">Verified Providers</p>
                  <p className="text-[10px] text-slate-500">
                    100% checked before listing
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── OUR STORY ───────────────────────────────────── */}
      <section className="container mx-auto max-w-7xl px-4 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Visual side */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-blue-50 border border-slate-100 p-8 sm:p-10 shadow-sm overflow-hidden">
              <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-emerald-100/70 blur-2xl" />
              <Quote className="h-10 w-10 text-emerald-500/80" />
              <p className="mt-5 text-lg sm:text-xl font-bold text-slate-900 leading-relaxed">
                “Great gear shouldn&apos;t be a barrier between you and your
                next great idea.”
              </p>
              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                — The GearUp Team
              </p>
              <div className="mt-8 grid grid-cols-3 gap-4">
                {[
                  { value: "2024", label: "Founded" },
                  { value: `${totalGears}+`, label: "Gears Listed" },
                  { value: `${providerCount}+`, label: "Providers" },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="rounded-2xl bg-white border border-slate-100 shadow-sm p-4 text-center"
                  >
                    <p className="text-xl font-black text-slate-900">{m.value}</p>
                    <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Copy side */}
          <div className="order-1 lg:order-2 space-y-5">
            <span className="inline-flex items-center gap-2 bg-rose-50 text-rose-600 px-3 py-1 rounded-full text-xs font-semibold">
              <HeartHandshake className="h-3.5 w-3.5" /> Our Story
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              We Built GearUp for the Creator in All of Us
            </h2>
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
              GearUp started with a simple frustration: professional equipment
              is expensive, and most of it sits idle between projects. We
              imagined a marketplace where creators share gear with each other
              — renting what they need, when they need it, and earning from the
              equipment they own.
            </p>
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
              Today, GearUp connects customers with verified providers across
              the country — from cameras and lenses to lights and audio gear.
            </p>
            <ul className="space-y-3 pt-1">
              {missionPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─────────────────────────────────── */}
      <section className="container mx-auto max-w-7xl px-4 py-16 sm:py-20">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5" /> Simple by design
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Renting Gear in 3 Easy Steps
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            No paperwork, no deposits for every item, no guesswork. Just pick,
            book, and create.
          </p>
        </div>

        <div className="relative mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            className="hidden md:block absolute top-10 left-[16%] right-[16%] border-t-2 border-dashed border-slate-200"
            aria-hidden
          />
          {steps.map((step) => (
            <Card
              key={step.title}
              className="relative border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all rounded-3xl overflow-hidden"
            >
              <CardContent className="p-7 space-y-4">
                <div className="flex items-center justify-between">
                  <div
                    className={`relative h-14 w-14 rounded-2xl flex items-center justify-center ${step.color}`}
                  >
                    <step.icon className="h-7 w-7" />
                  </div>
                  <span className="text-3xl font-black text-slate-100 select-none">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ─── CATEGORIES (dynamic) ─────────────────────────── */}
      {categoriesWithCounts.length > 0 && (
        <section className="bg-slate-50/70 border-y border-slate-100">
          <div className="container mx-auto max-w-7xl px-4 py-16 sm:py-20">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-2 bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-xs font-semibold">
                  <Layers className="h-3.5 w-3.5" /> Explore by category
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                  What Can You Rent Today?
                </h2>
                <p className="text-sm text-slate-500 max-w-xl">
                  Live from our marketplace — every category below is populated
                  with real, bookable gear.
                </p>
              </div>
              <Link
                href="/gear"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 hover:text-purple-700"
              >
                View all gears <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {categoriesWithCounts.map((cat, i) => (
                <Link
                  key={cat.id}
                  href={`/gear?categoryId=${cat.id}`}
                  className="group relative bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 hover:border-purple-200 transition-all"
                >
                  <div
                    className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${categoryGradients[i % categoryGradients.length]}`}
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div
                        className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                          categoryColors[i % categoryColors.length]
                        }`}
                      >
                        <Package className="h-6 w-6" />
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-extrabold text-slate-900 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-full">
                        {cat.count}{" "}
                        <span className="text-slate-400 font-semibold">items</span>
                      </span>
                    </div>
                    <h3 className="mt-4 text-sm font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                      {cat.name}
                    </h3>
                    {cat.description && (
                      <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                        {cat.description}
                      </p>
                    )}
                    <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      Browse category <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── FEATURED GEARS (dynamic) ─────────────────────── */}
      {featuredGears.length > 0 && (
        <section className="container mx-auto max-w-7xl px-4 py-16 sm:py-20">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-semibold">
                <Star className="h-3.5 w-3.5" /> Fresh from the marketplace
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                Popular Gears Right Now
              </h2>
              <p className="text-sm text-slate-500 max-w-xl">
                A live preview of what creators are renting this week.
              </p>
            </div>
            <Link
              href="/gear"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700"
            >
              See all {totalGears} gears <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredGears.map((gear) => (
              <Link
                key={gear.id}
                href={`/gear/${gear.id}`}
                className="group bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="relative h-44 bg-slate-50 overflow-hidden">
                  {gear.image ? (
                    <Image
                      src={gear.image}
                      alt={gear.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-slate-300">
                      <Package className="h-10 w-10" />
                    </div>
                  )}
                  <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-white/90 backdrop-blur px-2 py-1 rounded-md">
                    {gear.brand}
                  </span>
                  <span className="absolute bottom-3 right-3 text-xs font-black text-white bg-slate-900/80 backdrop-blur px-2.5 py-1 rounded-lg">
                    ৳{gear.pricePerDay}
                    <span className="text-[9px] font-semibold text-slate-300">
                      /day
                    </span>
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                    {gear.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 line-clamp-1">
                    {gear.category?.name || "General"}
                  </p>
                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 truncate">
                      <Store className="h-3 w-3 text-slate-400 shrink-0" />
                      <span className="truncate">
                        {gear.provider?.name || "GearUp"}
                      </span>
                    </span>
                    {(gear.stock ?? 0) > 0 ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full shrink-0">
                        <CheckCircle2 className="h-3 w-3" /> In stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-600 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full shrink-0">
                        Out of stock
                      </span>
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
        <div className="container mx-auto max-w-7xl px-4 py-16 sm:py-20">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-2 bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-xs font-semibold">
              <HeartHandshake className="h-3.5 w-3.5" /> Why GearUp
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Built for Creators, Powered by Community
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              We started GearUp because great equipment shouldn&apos;t be locked
              behind a price tag.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card
                key={value.title}
                className="border-slate-100 shadow-sm hover:shadow-md transition-all rounded-3xl"
              >
                <CardContent className="p-6 space-y-3">
                  <div
                    className={`h-12 w-12 rounded-xl flex items-center justify-center ${value.color}`}
                  >
                    <value.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{value.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────── */}
      <section className="container mx-auto max-w-7xl px-4 py-16 sm:py-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 sm:p-12 text-center">
          <div className="absolute -top-16 -left-16 h-56 w-56 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="relative space-y-4 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/15 text-emerald-300 px-4 py-1.5 rounded-full text-xs font-semibold">
              <Target className="h-3.5 w-3.5" /> Ready when you are
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Ready to Start Your Next Project?
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Join hundreds of creators already renting premium gear through
              GearUp — or list your own equipment and start earning today.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/gear">
                <Button className="h-12 rounded-xl px-7 text-sm font-bold gap-2 bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/30">
                  Browse Gears <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  variant="outline"
                  className="h-12 rounded-xl px-7 text-sm font-bold gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
                >
                  <Rocket className="h-4 w-4" /> Create Free Account
                </Button>
              </Link>
            </div>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[11px] font-bold text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Free to join
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Secure payments
              </span>
              <span className="flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5 text-emerald-400" /> Nationwide delivery
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;