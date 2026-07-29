import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import {
  Bike,
  Tent,
  Mountain,
  ShieldCheck,
  Clock3,
  Truck,
  Search,
} from "lucide-react";

const categories = [
  {
    title: "Camping",
    icon: Tent,
    items: "120+ Items",
  },
  {
    title: "Cycling",
    icon: Bike,
    items: "90+ Items",
  },
  {
    title: "Hiking",
    icon: Mountain,
    items: "150+ Items",
  },
];

const features = [
  {
    title: "Verified Gear",
    description: "Every equipment is inspected before rental.",
    icon: ShieldCheck,
  },
  {
    title: "Fast Booking",
    description: "Reserve gear within minutes.",
    icon: Clock3,
  },
  {
    title: "Easy Pickup",
    description: "Quick pickup & return process.",
    icon: Truck,
  },
];

const featuredGear = [
  {
    name: "Mountain Bike",
    price: "৳১,৫০০/day",
    image: "https://images.unsplash.com/photo-1511994298241-608e28f14fde?w=800",
  },
  {
    name: "Camping Tent",
    price: "৳১,০০০/day",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800",
  },
  {
    name: "Hiking Backpack",
    price: "৳৭০০/day",
    image: "https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=800",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased selection:bg-primary selection:text-primary-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-6 py-24 lg:py-32">
          <div className="max-w-3xl space-y-6">
            <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">
              Trusted by 10,000+ Adventurers
            </Badge>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
              Rent Outdoor Gear
              <span className="text-green-400"> Without Buying.</span>
            </h1>

            <p className="text-slate-300 text-lg sm:text-xl max-w-2xl font-normal leading-relaxed">
              Discover premium camping, hiking, and cycling equipment at
              affordable rental prices, ready for your next journey.
            </p>

            <div className="flex gap-4 flex-wrap pt-2">
              <Button size="lg" className="font-semibold shadow-lg hover:shadow-primary/25 transition-all">
                Explore Gear
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="text-slate-900 bg-white hover:bg-slate-100 font-semibold"
              >
                Become Provider
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Search Filter Bar */}
      <section className="container mx-auto px-6 -mt-8 relative z-20">
        <Card className="shadow-2xl border-border/50 backdrop-blur-sm bg-card/95">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <div className="relative">
                <Input placeholder="Search Gear (e.g., Tent, Bike)..." className="w-full" readOnly />
              </div>

              <div className="relative">
                <Input placeholder="Location (City or Region)" className="w-full" readOnly />
              </div>

              <div className="relative">
                <Input type="date" className="w-full text-muted-foreground" readOnly />
              </div>

              <Button className="w-full font-semibold shadow-md pointer-events-none">
                <Search className="w-4 h-4 mr-2" />
                Search Gear
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Browse Categories
          </h2>
          <p className="text-muted-foreground text-lg">
            Find exactly what you need based on your preferred outdoor activity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Card
                key={category.title}
                className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-border/60 overflow-hidden"
              >
                <CardContent className="py-12 text-center space-y-4">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Icon className="w-10 h-10 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>

                  <h3 className="text-2xl font-bold tracking-tight">
                    {category.title}
                  </h3>

                  <p className="text-muted-foreground font-medium">
                    {category.items}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Featured Gear Section */}
      <section className="bg-muted/40 py-24 border-y border-border/40">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Featured Gear
            </h2>
            <p className="text-muted-foreground text-lg">
              Explore our most popular, high-demand equipment ready for immediate dispatch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredGear.map((gear) => (
              <Card
                key={gear.name}
                className="overflow-hidden border-border/60 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative overflow-hidden h-64">
                  <img
                    src={gear.image}
                    alt={gear.name}
                    className="h-full w-full object-cover object-center"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-emerald-600/90 text-white shadow-md backdrop-blur-md">
                      Available
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-col flex-grow p-6">
                  <CardHeader className="p-0 pb-3">
                    <CardTitle className="text-2xl font-bold">{gear.name}</CardTitle>
                  </CardHeader>

                  <CardContent className="p-0 flex-grow flex flex-col justify-end">
                    <Separator className="my-4" />

                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider block">Rate</span>
                        <span className="font-extrabold text-xl text-primary">
                          {gear.price}
                        </span>
                      </div>

                      <Button className="font-semibold shadow-sm hover:shadow pointer-events-none">
                        Rent Now
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Why Choose GearUp?
          </h2>
          <p className="text-muted-foreground text-lg">
            We make outdoor renting safe, quick, and completely hassle-free.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card key={feature.title} className="border-border/60 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="text-center py-12 px-6 space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>

                  <h3 className="font-bold text-2xl tracking-tight">
                    {feature.title}
                  </h3>

                  <p className="text-muted-foreground text-base leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 pb-24">
        <Card className="bg-primary text-primary-foreground border-none shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-foreground/5 to-transparent pointer-events-none" />
          <CardContent className="py-20 px-8 text-center relative z-10 space-y-6 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Ready For Your Next Adventure?
            </h2>

            <p className="text-lg opacity-90 max-w-xl mx-auto font-normal">
              Rent top-quality outdoor gear today, skip the hefty purchase costs, and start exploring the wild.
            </p>

            <div className="pt-4">
              <Button
                variant="secondary"
                size="lg"
                className="font-bold text-primary shadow-lg px-8 py-6 text-base hover:bg-slate-100 transition-colors pointer-events-none"
              >
                Start Renting Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}