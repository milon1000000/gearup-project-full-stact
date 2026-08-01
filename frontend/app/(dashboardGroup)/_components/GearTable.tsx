import React from 'react'
import { getMyGearItems } from '../_actions/myGearActions'
import { PackageOpen } from 'lucide-react'
import { IGearItem } from '@/lib/type'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import MyGearTableRow from './MyGearTableRow'

const GearTable = async () => {
  const gearItems = await getMyGearItems()
  const itemsArray = gearItems?.data || gearItems
  
  // স্টক ০ হলে available: false করে দেওয়া হলো
  const normalizedGearItems = Array.isArray(itemsArray) 
    ? itemsArray.map((gear: IGearItem) => ({
        ...gear,
        available: gear.stock > 0 ? gear.available : false
      })) 
    : []

  if (normalizedGearItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50">
        <PackageOpen className="h-12 w-12 text-slate-400 mb-3" />
        <h3 className="text-base font-semibold text-slate-800">No gear items found</h3>
        <p className="text-sm text-slate-500 mt-1 max-w-sm">
          You haven&apos;t added any gear items yet. Get started by listing your equipment.
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
      <Table>
        <TableHeader className="bg-slate-50/70">
          <TableRow>
            <TableHead>Gear Item</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Condition</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {normalizedGearItems.map((gear: IGearItem) => (
            <MyGearTableRow key={gear.id} gear={gear} />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default GearTable