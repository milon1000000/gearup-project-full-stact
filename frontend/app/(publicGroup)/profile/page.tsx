import { getMe } from "@/service/getMe";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, ShieldCheck, Calendar } from "lucide-react";

const ProfilePage = async () => {
  const user = await getMe();

  const profile = user.data;

  return (
    <div className="mx-auto max-w-5xl p-6">
      <Card className="overflow-hidden">
        {/* Cover */}
        <div className="h-44 w-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500" />

        <CardContent className="relative px-8 pb-8">
          {/* Avatar */}
          <Avatar className="-mt-16 h-32 w-32 border-4 border-background">
            <AvatarImage src={profile.profileImage ?? ""} />
            <AvatarFallback className="text-3xl">
              {profile.name
                .split(" ")
                .map((n: string) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="mt-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">{profile.name}</h1>

              <p className="text-muted-foreground">
                {profile.email}
              </p>

              <div className="mt-3 flex gap-2">
                <Badge>{profile.role}</Badge>

                <Badge
                  variant={
                    profile.status === "ACTIVE"
                      ? "default"
                      : "destructive"
                  }
                >
                  {profile.status}
                </Badge>
              </div>
            </div>

            <Button>Edit Profile</Button>
          </div>

          <Separator className="my-8" />

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">
                  Personal Information
                </h2>
              </CardHeader>

              <CardContent className="space-y-5">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-emerald-600" />

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Email
                    </p>

                    <p>{profile.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-emerald-600" />

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Phone
                    </p>

                    <p>{profile.phone ?? "Not Provided"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-emerald-600" />

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Address
                    </p>

                    <p>{profile.address ?? "Not Provided"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">
                  Account Information
                </h2>
              </CardHeader>

              <CardContent className="space-y-5">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-emerald-600" />

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Role
                    </p>

                    <p>{profile.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-emerald-600" />

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Status
                    </p>

                    <p>{profile.status}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-emerald-600" />

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Joined
                    </p>

                    <p>
                      {formatDate(profile.createdAt)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;