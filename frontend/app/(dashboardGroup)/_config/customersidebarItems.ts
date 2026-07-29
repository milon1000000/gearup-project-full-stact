import { ISidebarItem } from "@/lib/type";
import { FileText, LayoutDashboard } from "lucide-react";

export const CUSTOMER_SIDEBAR_ITEMS:ISidebarItem[]=[
    {
        label:"Dashboard",
        href:"/dashboard",
        icon:LayoutDashboard
    },
    {
        label:"Category",
        href:"/dashboard",
        icon:FileText
    }
]