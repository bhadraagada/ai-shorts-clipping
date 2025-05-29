"use server";

import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import NavBar from "~/components/navbar";
// import NavHeader from "~/components/nav-header";
import { Toaster } from "~/components/ui/sonner";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  const user = await db.user.findUniqueOrThrow({
    where: { id: session.user.id },
    select: { credits: true, email: true },
  });

  return (
    <div className="flex min-h-screen flex-col">
      {/* {user.credits} {user.email} */}
      <NavBar credits={user.credits} email={user.email} />
      <main className="container mx-auto flex-1 py-6">{children}</main>
      <Toaster />
    </div>
  );
}
