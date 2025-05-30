"use client";

import {
  Coins,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Menu,
  Sparkles,
  User,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
const NavBar = ({ credits, email }: { credits: number; email: string }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="from-primary via-accent to-secondary flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br shadow-lg">
              <Sparkles className="text-primary-foreground h-4 w-4" />
            </div>
            <div className="font-sans text-xl font-bold tracking-tight">
              <span className="from-primary via-accent to-secondary bg-gradient-to-r bg-clip-text text-transparent">
                podcast
              </span>
              <span className="text-muted-foreground mx-1">/</span>
              <span className="from-accent to-primary hidden bg-gradient-to-r bg-clip-text font-light text-transparent sm:inline">
                clipper
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-4 sm:flex">
          {/* Credits Section */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Badge
                variant="secondary"
                className="border-border/50 from-card via-muted/30 to-card h-9 border bg-gradient-to-r px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-md"
              >
                <Coins className="text-primary mr-2 h-4 w-4" />
                {credits} credits
              </Badge>
              {credits < 10 && (
                <div className="bg-destructive absolute -top-1 -right-1 h-3 w-3 animate-pulse rounded-full" />
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              asChild
              className="from-primary/10 to-accent/10 hover:from-primary/20 hover:to-accent/20 hover:border-primary/40 border-primary/20 h-9 bg-gradient-to-r px-4 text-sm font-medium shadow-sm transition-all duration-200 hover:bg-gradient-to-r hover:shadow-md"
            >
              <Link
                href="/dashboard/billing"
                className="flex items-center gap-2"
              >
                <CreditCard className="h-4 w-4" />
                <span>Billing</span>
              </Link>
            </Button>
          </div>

          {/* User Menu - Desktop */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="hover:ring-primary/20 relative h-10 w-10 rounded-full p-0 ring-2 ring-transparent transition-all duration-200"
              >
                <Avatar className="border-border/50 h-9 w-9 border-2 shadow-md">
                  <AvatarFallback className="from-primary/20 via-accent/20 to-secondary/20 text-primary bg-gradient-to-br text-sm font-semibold">
                    {email.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="border-background absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 bg-green-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="border-border/50 bg-card/95 w-56 rounded-lg border shadow-xl backdrop-blur-sm"
            >
              <DropdownMenuLabel className="pb-2">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm leading-none font-medium">Account</p>
                  <p className="text-muted-foreground truncate text-xs">
                    {email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border/50" />

              <DropdownMenuItem asChild className="cursor-pointer">
                <Link
                  href="/dashboard/profile"
                  className="flex items-center gap-2 px-2 py-2"
                >
                  <User className="text-muted-foreground h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild className="cursor-pointer">
                <Link
                  href="/dashboard/billing"
                  className="flex items-center gap-2 px-2 py-2"
                >
                  <CreditCard className="text-muted-foreground h-4 w-4" />
                  <span>Billing</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-border/50" />

              <DropdownMenuItem
                onClick={() => signOut({ redirectTo: "/" })}
                className="text-destructive hover:text-destructive/10 focus:text-destructive group-[&:hover]:bg-destructive/10 flex cursor-pointer items-center gap-2 px-2 py-2"
              >
                <LogOut className="text-destructive h-4 w-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-2 sm:hidden">
          {/* Compact Credits Badge for Mobile */}
          <div className="relative mr-1">
            <Badge
              variant="secondary"
              className="border-border/50 from-card via-muted/30 to-card h-8 border bg-gradient-to-r px-2 py-1 text-xs font-semibold text-white shadow-sm"
            >
              <Coins className="text-primary mr-1 h-3 w-3" />
              {credits}
            </Badge>
            {credits < 10 && (
              <div className="bg-destructive absolute -top-1 -right-1 h-2 w-2 animate-pulse rounded-full" />
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="border-border/50 bg-card/95 w-[280px] border-l p-0 backdrop-blur-md"
            >
              <MobileMenu
                credits={credits}
                email={email}
                closeMenu={() => setIsMobileMenuOpen(false)}
              />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

// Mobile Menu Component
const MobileMenu = ({
  credits,
  email,
  closeMenu,
}: {
  credits: number;
  email: string;
  closeMenu: () => void;
}) => {
  return (
    <div className="flex h-full flex-col">
      {/* User Info */}
      <div className="border-border/30 border-b p-4">
        <div className="mb-4 flex items-center gap-3">
          <Avatar className="border-border/50 h-10 w-10 border-2 shadow-md">
            <AvatarFallback className="from-primary/20 via-accent/20 to-secondary/20 text-primary bg-gradient-to-br text-sm font-semibold">
              {email.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm leading-none font-medium">
              {email.split("@")[0]}
            </p>
            <p className="text-muted-foreground truncate text-xs">{email}</p>
          </div>
        </div>
        <Badge
          variant="secondary"
          className="border-border/50 from-card via-muted/30 to-card flex h-9 w-full items-center justify-center border bg-gradient-to-r px-4 py-2 text-sm font-semibold text-white shadow-sm"
        >
          <Coins className="text-primary mr-2 h-4 w-4" />
          {credits} credits
        </Badge>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-2">
        <Link
          href="/dashboard"
          onClick={closeMenu}
          className="hover:bg-muted/50 flex items-center gap-3 rounded-lg p-3 text-sm font-medium transition-colors"
        >
          <LayoutDashboard className="text-primary h-4 w-4" />
          <span>Dashboard</span>
        </Link>
        <Link
          href="/dashboard/profile"
          onClick={closeMenu}
          className="hover:bg-muted/50 flex items-center gap-3 rounded-lg p-3 text-sm font-medium transition-colors"
        >
          <User className="text-muted-foreground h-4 w-4" />
          <span>Profile</span>
        </Link>
        <Link
          href="/dashboard/billing"
          onClick={closeMenu}
          className="hover:bg-muted/50 flex items-center gap-3 rounded-lg p-3 text-sm font-medium transition-colors"
        >
          <CreditCard className="text-muted-foreground h-4 w-4" />
          <span>Billing</span>
        </Link>
      </nav>

      {/* Sign Out */}
      <div className="border-border/30 mt-auto border-t p-4">
        <Button
          variant="ghost"
          onClick={async () => {
            try {
              await signOut({ redirectTo: "/" });
              closeMenu();
            } catch (error) {
              console.error("Failed to sign out:", error);
            }
          }}
          className="text-destructive hover:bg-destructive/10 flex w-full items-center justify-start gap-3 p-3 text-sm font-medium"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign out</span>
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
