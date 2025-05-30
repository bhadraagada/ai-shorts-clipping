"use client";

import {
  Camera,
  Coins,
  CreditCard,
  Edit2,
  Mail,
  Save,
  Shield,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Separator } from "~/components/ui/separator";

type UserData = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  credits: number;
  emailVerified: Date | null;
  stripeCustomerId: string | null;
};

export const ProfilePageComponent = ({ user }: { user: UserData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name ?? "",
    email: user.email,
  });

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Use fetch to call API route instead of direct database access
      const response = await fetch("/api/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      toast.success("Profile updated successfully");
      setIsEditing(false);
      window.location.reload();
    } catch (error) {
      toast.error("Some error occurred!", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user.name ?? "",
      email: user.email,
    });
    setIsEditing(false);
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Handle image upload logic here
    toast.success("Image upload functionality to be implemented");
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="from-primary to-accent bg-gradient-to-r bg-clip-text text-3xl font-bold tracking-tight text-transparent">
            Profile Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details and profile picture
                </CardDescription>
              </div>
              {!isEditing ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2"
                >
                  <Edit2 className="h-4 w-4" />
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCancel}
                    className="flex items-center gap-2"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSave}
                    disabled={isLoading}
                    className="flex items-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    Save
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Profile Picture */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar className="border-border h-20 w-20 border-2">
                  <AvatarImage
                    src={user.image ?? undefined}
                    alt="Profile picture"
                  />
                  <AvatarFallback className="from-primary/20 via-accent/20 to-secondary/20 bg-gradient-to-br text-lg">
                    {user.name?.charAt(0)?.toUpperCase() ??
                      user.email.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <label className="absolute -right-2 -bottom-2 cursor-pointer">
                    <div className="bg-primary text-primary-foreground hover:bg-primary/90 flex h-8 w-8 items-center justify-center rounded-full shadow-lg">
                      <Camera className="h-4 w-4" />
                    </div>
                    <Input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  {user.name ?? "No name set"}
                </h3>
                <p className="text-muted-foreground text-sm">{user.email}</p>
              </div>
            </div>

            <Separator />

            {/* Form Fields */}
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Enter your full name"
                  />
                ) : (
                  <div className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm">
                    <User className="text-muted-foreground h-4 w-4" />
                    {user.name ?? "No name set"}
                  </div>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="Enter your email"
                  />
                ) : (
                  <div className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm">
                    <Mail className="text-muted-foreground h-4 w-4" />
                    {user.email}
                    {user.emailVerified && (
                      <Badge variant="secondary" className="ml-auto">
                        <Shield className="mr-1 h-3 w-3" />
                        Verified
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Stats */}
        <div className="space-y-6">
          {/* Credits Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coins className="text-primary h-5 w-5" />
                Credits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-primary text-3xl font-bold">
                  {user.credits}
                </div>
                <p className="text-muted-foreground text-sm">
                  Available credits
                </p>
                <Button className="mt-4 w-full" size="sm" asChild>
                  <a
                    href="/dashboard/billing"
                    className="flex items-center gap-2"
                  >
                    <CreditCard className="h-4 w-4" />
                    Buy More
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Account Details */}
          <Card>
            <CardHeader>
              <CardTitle>Account Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">
                  Account Status
                </span>
                <Badge variant="secondary" className="text-pretty shadow-md">
                  Active
                </Badge>
              </div>

              {user.stripeCustomerId && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">Billing</span>
                  <Badge variant="outline">Connected</Badge>
                </div>
              )}
              {!user.stripeCustomerId && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">Billing</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="destructive" className="text-xs shadow-md">
                      Not Connected
                    </Badge>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
