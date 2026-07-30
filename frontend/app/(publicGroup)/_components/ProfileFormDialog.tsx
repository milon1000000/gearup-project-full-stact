"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { PencilIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateProfile } from "../_actions/updateProfile";


type Profile = {
  name: string;
  phone: string | null;
  address: string | null;
  profileImage: string | null;
};

type ProfileFormDialogProps = {
  profile: Profile;
};

const ProfileFormDialog = ({
  profile,
}: ProfileFormDialogProps) => {
  const [open, setOpen] = useState(false);

  const [state, action, pending] = useActionState(
    updateProfile,
    null
  );

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(
        state.message || "Profile updated successfully"
      );
      setOpen(false);
    } else {
      toast.error(
        state.message || "Failed to update profile"
      );
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PencilIcon className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        <form action={action} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>

            <Input
              id="name"
              name="name"
              defaultValue={profile.name}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>

            <Input
              id="phone"
              name="phone"
              defaultValue={profile.phone ?? ""}
              placeholder="Enter your phone"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>

            <Input
              id="address"
              name="address"
              defaultValue={profile.address ?? ""}
              placeholder="Enter your address"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="profileImage">
              Profile Image URL
            </Label>

            <Input
              id="profileImage"
              name="profileImage"
              defaultValue={profile.profileImage ?? ""}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={pending}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={pending}>
              {pending
                ? "Updating..."
                : "Update Profile"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileFormDialog;