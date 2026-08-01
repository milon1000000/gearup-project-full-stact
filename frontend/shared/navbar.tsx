"use client";

import Link from "next/link";
import { User, Crown, LayoutDashboard, LogOut, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavbarProps } from "@/lib/type";
import { logout } from "@/service/logout";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Category", href: "/category" },
  { label: "GearItem", href: "/gear" },
  { label: "Contact", href: "/contact" },
];

export function Navbar({ user }: NavbarProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    toast.success("User logout successfully");
    router.push("/login");
  };

  const isLoggedIn = user?.success;
  const role = user?.data?.role;
  const displayName = user?.data?.name ?? "User";
  const displayEmail = user?.data?.email ?? "";
  const profileImage = user?.data?.profileImage;

  let dashboardHref = "/";

  switch (role) {
    case "CUSTOMER":
      dashboardHref = "/dashboard";
      break;

    case "PROVIDER":
      dashboardHref = "/provider-dashboard";
      break;

    case "ADMIN":
      dashboardHref = "/admin-dashboard";
      break;
  }

  const userMenuItems = [
    {
      label: "Dashboard",
      href: dashboardHref,
      icon: LayoutDashboard,
    },
    {
      label: "Profile",
      href: "/profile",
      icon: User,
    },
    ...(role === "CUSTOMER"
      ? [
          {
            label: "My Payment",
            href: "/my-payment",
            icon: Crown,
          },
        ]
      : []),
  ];
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md shadow-sm">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-tight text-emerald-600 flex items-center gap-2"
        >
          GearUp
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-semibold text-slate-600 transition-colors hover:text-emerald-600"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Actions: Desktop Profile & Mobile Menu Trigger */}
        <div className="flex items-center gap-3">
          {/* Desktop User Section */}
          <div className="hidden lg:block">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-10 w-10 cursor-pointer border-2 border-emerald-500/20 transition hover:border-emerald-500">
                    <AvatarImage
                      src={profileImage || "https://github.com/shadcn.png"}
                      alt={displayName}
                    />
                    <AvatarFallback className="bg-emerald-50 text-emerald-700 font-bold">
                      {displayName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-60 rounded-2xl p-2 shadow-xl border-slate-100"
                >
                  <DropdownMenuLabel className="font-normal px-3 py-2">
                    <p className="font-bold text-slate-900">{displayName}</p>
                    <p className="text-xs text-slate-500 truncate">
                      {displayEmail}
                    </p>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator className="bg-slate-100" />

                  {userMenuItems.map((item) => (
                    <DropdownMenuItem
                      key={item.href}
                      asChild
                      className="rounded-xl px-3 py-2.5 cursor-pointer focus:bg-emerald-50 focus:text-emerald-700"
                    >
                      <Link
                        href={item.href}
                        className="flex items-center font-medium text-slate-700"
                      >
                        <item.icon className="mr-2.5 h-4 w-4 text-slate-500" />
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}

                  <DropdownMenuSeparator className="bg-slate-100" />

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="rounded-xl px-3 py-2.5 cursor-pointer text-rose-600 focus:bg-rose-50 focus:text-rose-700 font-medium"
                  >
                    <LogOut className="mr-2.5 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  href="/login"
                  className="text-sm font-semibold text-slate-700 hover:text-emerald-600 transition-colors"
                >
                  Login
                </Link>
                <Link href="/register">
                  <Button className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 shadow-md shadow-emerald-600/20">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu (Sheet from Right) */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden rounded-xl text-slate-700 hover:bg-slate-100"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[300px] sm:w-[350px] p-0 flex flex-col h-full rounded-l-3xl border-l-slate-100"
            >
              {/* Header section (Fixed) */}
              <div className="p-6 pb-4 border-b border-slate-100">
                <SheetHeader className="text-left">
                  <SheetTitle className="text-2xl font-extrabold text-emerald-600">
                    GearUp
                  </SheetTitle>
                </SheetHeader>
              </div>

              {/* Scrollable Nav Links Section */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-base font-semibold text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 px-4 py-2.5 rounded-xl transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Mobile User Section at bottom (Fixed) */}
              <div className="border-t border-slate-100 p-6 bg-white shadow-lg">
                {isLoggedIn ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 px-2">
                      <Avatar className="h-10 w-10 border border-emerald-200">
                        <AvatarImage
                          src={profileImage || "https://github.com/shadcn.png"}
                          alt={displayName}
                        />
                        <AvatarFallback className="bg-emerald-50 text-emerald-700 font-bold">
                          {displayName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="overflow-hidden">
                        <p className="font-bold text-sm text-slate-900 truncate">
                          {displayName}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                          {displayEmail}
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-1">
                      {userMenuItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                        >
                          <item.icon className="h-4 w-4 text-slate-500" />
                          {item.label}
                        </Link>
                      ))}

                      <button
                        onClick={() => {
                          setIsOpen(false);
                          handleLogout();
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors text-left"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="block"
                    >
                      <Button
                        variant="outline"
                        className="w-full rounded-xl border-slate-200 text-slate-700 font-semibold py-5"
                      >
                        Login
                      </Button>
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setIsOpen(false)}
                      className="block"
                    >
                      <Button className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-5 shadow-md shadow-emerald-600/20">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
