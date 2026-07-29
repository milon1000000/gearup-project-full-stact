import { ISidebarItem } from "@/lib/type";
import { FileText, LayoutDashboard } from "lucide-react";

export const ADMIN_SIDEBAR_ITEMS:ISidebarItem[]=[
    {
        label:"Admin Dashboard",
        href:"/admin-dashboard",
        icon:LayoutDashboard
    },
    {
        label:"My category",
        href:"/category",
        icon:FileText
    }
]