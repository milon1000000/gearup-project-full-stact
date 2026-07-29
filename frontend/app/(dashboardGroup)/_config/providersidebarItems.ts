import { ISidebarItem } from "@/lib/type";
import { FileText, LayoutDashboard } from "lucide-react";

export const PROVIDER_SIDEBAR_ITEMS:ISidebarItem[]=[
    {
        label:"Dashboard",
        href:"/provider-dashboard",
        icon:LayoutDashboard
    },
    {
        label:"Category",
        href:"/provider-dashboard",
        icon:FileText
    }
]