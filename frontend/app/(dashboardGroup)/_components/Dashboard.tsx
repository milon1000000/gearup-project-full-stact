"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { ISidebarItem, NavbarProps } from "@/lib/type";
import { sidebarMenuItems } from "../_config/sidebarmenuItems";

export function DashboardSidebar({ user }: NavbarProps) {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  let navItems: ISidebarItem[] = [];

  if (user.data.role === "CUSTOMER") {
    navItems = sidebarMenuItems.CUSTOMER;
  } else if (user.data.role === "PROVIDER") {
    navItems = sidebarMenuItems.PROVIDER;
  } else if (user.data.role === "ADMIN") {
    navItems = sidebarMenuItems.ADMIN;
  }

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader className="border-b p-5">
        <h2 className="text-xl font-bold text-emerald-600">
          GearUp
        </h2>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="mt-3 space-y-2">
              {navItems.map((item, index) => (
                <SidebarMenuItem key={`${item.href}-${item.label}-${index}`}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center gap-3"
                      onClick={() => setOpenMobile(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <p className="text-center text-xs text-muted-foreground">
          © 2026 GearUp
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}