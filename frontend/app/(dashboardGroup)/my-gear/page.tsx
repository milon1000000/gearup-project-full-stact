import { Package2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import GearTable from "../_components/GearTable";


const MyGear = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Package2 className="h-6 w-6 text-primary" />
            </div>

            <div>
              <CardTitle className="text-3xl">
                My Gear
              </CardTitle>

              <CardDescription>
                Manage your gear inventory, update listings, and monitor
                availability from one place.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* List */}
      <Card>
        <CardHeader>
          <CardTitle>Gear Inventory</CardTitle>

          <CardDescription>
            All of your listed rental equipment.
          </CardDescription>
        </CardHeader>

        <Separator />

        <CardContent className="pt-6">
          <GearTable />
        </CardContent>
      </Card>
    </div>
  );
};

export default MyGear;