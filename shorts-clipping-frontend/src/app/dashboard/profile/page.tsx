"use server";

import { redirect } from "next/navigation";
import { toast } from "sonner";
import { ProfilePageComponent } from "~/components/profile-page-component";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

const ProfilePage = async () => {
  const session = await auth();

  if (!session || !session.user) {
    toast.error("You must be signed in to view this page.");
    redirect("/sign-in");
  }

  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      credits: true,
      emailVerified: true,
      stripeCustomerId: true,
    },
  });

  if (!user) {
    toast.error("User not found.");
    redirect("/sign-in");
  }

  return (
    <div>
      <ProfilePageComponent user={user} />
    </div>
  );
};

export default ProfilePage;
