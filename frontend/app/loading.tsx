import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

const GlobalLoading = () => {
  return (
    <div className="flex flex-col space-y-3 p-6 max-w-md mx-auto mt-10">
      <Skeleton className="h-[125px] w-full rounded-xl" />
      
      {/* টেক্সট স্কিলটন */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}

export default GlobalLoading