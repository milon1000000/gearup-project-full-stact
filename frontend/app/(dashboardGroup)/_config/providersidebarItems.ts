import { ISidebarItem } from "@/lib/type";
import { ClipboardList, FileText, LayoutDashboard } from "lucide-react";

export const PROVIDER_SIDEBAR_ITEMS:ISidebarItem[]=[
    {
        label:"Dashboard",
        href:"/provider-dashboard",
        icon:LayoutDashboard
    },
    {
        label:"My-Gear",
        href:"/my-gear",
        icon:FileText
    },
     {
        label:"Rental Orders",
        href:"/provider-dashboard/rental-orders",
        icon:ClipboardList
    }
]