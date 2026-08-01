import { ISidebarItem } from "@/lib/type";
import { FileText, LayoutDashboard, ListOrdered, Users } from "lucide-react";

export const ADMIN_SIDEBAR_ITEMS:ISidebarItem[]=[
    {
        label:"Admin Dashboard",
        href:"/admin-dashboard",
        icon:LayoutDashboard
    },
    {
        label:"My category",
        href:"/admin-dashboard/category",
        icon:FileText
    },
     {
        label:"All Rentals",
        href:"/admin-dashboard/all-rentals",
        icon:ListOrdered
    },
     {
        label:"All Users",
        href:"/admin-dashboard/all-users",
        icon:Users
    }
]