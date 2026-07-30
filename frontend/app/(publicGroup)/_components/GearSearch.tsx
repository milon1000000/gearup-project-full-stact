"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

export function GearSearchBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const debouncedReference = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (value: string) => {
    if (debouncedReference.current) {
      clearTimeout(debouncedReference.current);
    }

    debouncedReference.current = setTimeout(() => {
      // Preserve existing parameters (like filters or pagination)
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set("searchTerm", value);
      } else {
        params.delete("searchTerm");
      }
      
      router.replace(`${pathname}?${params.toString()}`);
    }, 400);
  };

  return (
    <div className="relative w-full md:w-80">
      <SearchIcon className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-400" />
      <Input
        defaultValue={searchParams.get("searchTerm")?.toString() || ""}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Search tents, bags, gear..."
        className="pl-10 h-11 rounded-xl bg-white border-slate-200 shadow-sm focus-visible:ring-blue-600"
      />
    </div>
  );
}