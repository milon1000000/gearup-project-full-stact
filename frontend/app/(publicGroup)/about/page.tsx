import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Package, Users, Award, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const AboutPage = () => {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 space-y-16">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">
          <Award className="h-3.5 w-3.5" /> Welcome to GearUp
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Empowering Creators with Premium Gear Rentals
        </h1>
        <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
          GearUp is your trusted platform for renting professional photography, videography, and tech equipment seamlessly. We connect creators with top-tier gear, making high-end technology accessible to everyone.
        </p>
      </div>

      {/* Stats / Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-slate-100 shadow-sm bg-white rounded-2xl text-center p-6">
          <CardContent className="space-y-2 p-0">
            <div className="mx-auto h-12 w-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Package className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">500+</h3>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Professional Gears</p>
          </CardContent>
        </Card>

        <Card className="border-slate-100 shadow-sm bg-white rounded-2xl text-center p-6">
          <CardContent className="space-y-2 p-0">
            <div className="mx-auto h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">1,200+</h3>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Renters</p>
          </CardContent>
        </Card>

        <Card className="border-slate-100 shadow-sm bg-white rounded-2xl text-center p-6">
          <CardContent className="space-y-2 p-0">
            <div className="mx-auto h-12 w-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">100%</h3>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Secure & Verified</p>
          </CardContent>
        </Card>

        <Card className="border-slate-100 shadow-sm bg-white rounded-2xl text-center p-6">
          <CardContent className="space-y-2 p-0">
            <div className="mx-auto h-12 w-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">24/7</h3>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Dedicated Support</p>
          </CardContent>
        </Card>
      </div>

      {/* Mission & Vision Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Our Mission is to Simplify Creative Production
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            Buying expensive gear shouldn’t be a barrier to creativity. Whether you are an independent filmmaker, a passionate photographer, or an enterprise content creator, GearUp provides flexible rental plans tailored to your project timeline.
          </p>
          <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-700">
            <li className="flex items-center gap-2">✓ Verified high-quality equipment inventory</li>
            <li className="flex items-center gap-2">✓ Hassle-free booking, return, and review system</li>
            <li className="flex items-center gap-2">✓ Transparent pricing with zero hidden fees</li>
          </ul>
        </div>

        <Card className="border-slate-100 shadow-xl rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 space-y-6">
          <h3 className="text-xl font-bold">Ready to Start Your Next Project?</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Explore our vast collection of cameras, lenses, lights, and audio gear. Rent what you need, when you need it.
          </p>
          <Link href="/gear">
            <Button className="w-full h-11 rounded-xl text-sm font-semibold gap-2 bg-white text-slate-900 hover:bg-slate-100">
              Browse Gears <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
};

export default AboutPage;