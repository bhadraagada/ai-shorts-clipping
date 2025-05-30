"use client";

import type { VariantProps } from "class-variance-authority";
import {
  AlertCircle,
  ArrowLeftIcon,
  CheckIcon,
  Clock,
  CreditCard,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { PriceId } from "~/actions/stripe";
import { Button, type buttonVariants } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { cn } from "~/lib/utils";

interface PricingPlanProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonVariant: VariantProps<typeof buttonVariants>["variant"];
  isPopular?: boolean;
  savePercentage?: string;
  priceId: PriceId;
}

const plans: PricingPlanProps[] = [
  {
    title: "Small Pack",
    price: "$9.99",
    description: "Perfect for occasional podcast creators",
    features: ["50 credits", "No expiration", "Download all clips"],
    buttonText: "Buy 50 credits",
    buttonVariant: "outline",
    priceId: "small",
  },
  {
    title: "Medium Pack",
    price: "$24.99",
    description: "Best value for regular podcasters",
    features: ["150 credits", "No expiration", "Download all clips"],
    buttonText: "Buy 150 credits",
    buttonVariant: "default",
    isPopular: true,
    savePercentage: "Save 17%",
    priceId: "medium",
  },
  {
    title: "Large Pack",
    price: "$69.99",
    description: "Ideal for podcast studios and agencies",
    features: ["500 credits", "No expiration", "Download all clips"],
    buttonText: "Buy 500 credits",
    buttonVariant: "outline",
    isPopular: false,
    savePercentage: "Save 30%",
    priceId: "large",
  },
];

const ComingSoonDialog = ({ plan }: { plan: PricingPlanProps }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>
        <Button
          variant={plan.buttonVariant}
          className={cn(
            "group relative w-full overflow-hidden font-medium transition-all duration-300 hover:scale-105",
            plan.isPopular
              ? "from-primary via-accent to-primary text-primary-foreground hover:shadow-primary/30 bg-gradient-to-r shadow-lg hover:shadow-xl"
              : "hover:bg-primary/90 hover:text-primary-foreground hover:shadow-lg",
          )}
          type="button"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <CreditCard className="h-4 w-4" />
            {plan.buttonText}
          </span>
          {plan.isPopular && (
            <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-[100%]" />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="border-border/20 bg-background/95 backdrop-blur-xl sm:max-w-lg">
        <DialogHeader className="text-center">
          <div className="from-primary/20 via-accent/20 to-secondary/20 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br shadow-lg backdrop-blur-sm">
            <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
              <Clock className="text-primary h-6 w-6 animate-pulse" />
            </div>
          </div>
          <DialogTitle className="from-primary via-accent to-secondary bg-gradient-to-r bg-clip-text w-fit text-2xl font-bold text-transparent flex flex items-center justify-center mx-auto">
            Payment System Coming Soon!
          </DialogTitle>
          <DialogDescription className="text-muted-foreground mx-auto mt-2 max-w-sm text-center leading-relaxed">
            We&apos;re crafting a premium payment experience just for you. Stay
            tuned for something amazing!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 ">
          <div className="border-primary/20 from-primary/5 via-accent/5 to-secondary/5 rounded-xl border bg-gradient-to-br p-6 shadow-md">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                <Sparkles className="text-primary h-5 w-5" />
              </div>
              <div className="flex-1">
                <h4 className="text-foreground mb-3 font-semibold">
                  What&apos;s coming your way:
                </h4>
                <div className="grid gap-2">
                  {[
                    { icon: "🔒", text: "Bank-grade security with Stripe" },
                    { icon: "⚡", text: "Instant credit delivery" },
                    { icon: "💳", text: "All major payment methods" },
                    { icon: "📊", text: "Detailed billing dashboard" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="group flex items-center gap-3 transition-all duration-300 hover:translate-x-1"
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-muted-foreground group-hover:text-foreground text-sm transition-colors">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-muted-foreground/50 bg-muted p-4 dark:border-amber-800/30 dark:bg-amber-950/30 shadow-md">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                Want early access? Follow us for updates and exclusive previews!
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col gap-3 pt-2 sm:flex-row">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="hover:bg-muted/50 w-full transition-all duration-300 hover:scale-105 sm:w-auto"
          >
            <CheckIcon className="mr-2 h-4 w-4" />
            Got it
          </Button>
          <Button
            asChild
            className="from-primary to-accent hover:from-primary/90 hover:to-accent/90 group w-full bg-gradient-to-r shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl sm:w-auto"
          >
            <Link href="/dashboard" className="flex items-center gap-2">
              <ArrowLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Dashboard
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const PricingCard = ({ plan }: { plan: PricingPlanProps }) => {
  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl",
        "border-border/40 bg-card/30 backdrop-blur-sm",
        "mt-5 flex h-full flex-col",
        plan.isPopular
          ? "border-primary/70 shadow-primary/20 shadow-lg"
          : "border shadow-md",
      )}
    >
      {/* Popular Badge */}
      {plan.isPopular && (
        <div className="from-primary via-accent to-primary text-primary-foreground absolute top-9 -right-12 rotate-45 bg-gradient-to-r px-12 py-1 text-xs font-bold shadow-md">
          MOST POPULAR
        </div>
      )}

      {/* Card Header with Gradient Border Bottom */}
      <CardHeader
        className={cn(
          "relative flex-1 pb-6",
          "after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full",
          plan.isPopular
            ? "after:from-primary/30 after:via-accent after:to-primary/30 after:bg-gradient-to-r"
            : "after:bg-border/50",
        )}
      >
        {/* Title with conditional gradient for popular plan */}
        <CardTitle
          className={cn(
            "text-2xl font-bold",
            plan.isPopular &&
              "from-primary via-accent to-secondary bg-gradient-to-r bg-clip-text text-transparent",
          )}
        >
          {plan.title}
        </CardTitle>

        {/* Price with large display */}
        <div className="mt-2 flex items-baseline">
          <span className="text-4xl font-extrabold tracking-tight">
            {plan.price}
          </span>
        </div>

        {/* Save percentage with pill design */}
        {plan.savePercentage && (
          <div className="mt-1 inline-flex items-center rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-semibold text-green-500">
            <span className="mr-1 animate-pulse">●</span>
            {plan.savePercentage}
          </div>
        )}

        {/* Description with improved styling */}
        <CardDescription className="mt-3 text-sm">
          {plan.description}
        </CardDescription>
      </CardHeader>

      {/* Features List with Improved Styling */}
      <CardContent className="flex-grow pt-6">
        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <div
                className={cn(
                  "mt-0.5 flex h-5 w-5 items-center justify-center rounded-full",
                  plan.isPopular
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground",
                )}
              >
                <CheckIcon className="h-3 w-3" />
              </div>
              <span
                className={
                  plan.isPopular ? "text-foreground" : "text-muted-foreground"
                }
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>

      {/* Card Footer with CTA Button */}
      <CardFooter className="pt-6">
        <ComingSoonDialog plan={plan} />
      </CardFooter>

      {/* Decorative Corner Elements for Popular Plan */}
      {plan.isPopular && (
        <>
          <div className="absolute top-0 left-0 h-16 w-16 overflow-hidden">
            <div className="bg-primary absolute top-0 left-0 h-1 w-1 rounded-full opacity-70"></div>
          </div>
          <div className="absolute right-0 bottom-0 h-16 w-16 overflow-hidden">
            <div className="bg-accent absolute right-0 bottom-0 h-1 w-1 rounded-full opacity-70"></div>
          </div>
        </>
      )}
    </Card>
  );
};

const BillingsPage = () => {
  return (
    <div className="mx-auto flex max-w-5xl flex-col space-y-12 px-4 py-12">
      <div className="relative flex flex-col items-center justify-center gap-6">
        <Button
          className="border-primary/20 from-primary/10 to-accent/10 hover:border-primary/40 hover:from-primary/20 hover:to-accent/20 absolute top-0 left-0 bg-gradient-to-r shadow-sm transition-all duration-200 hover:shadow-md"
          variant="outline"
          size="sm"
          asChild
        >
          <Link href="/dashboard" className="flex items-center gap-2">
            <ArrowLeftIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </Link>
        </Button>

        <div className="flex flex-col items-center space-y-3 text-center">
          <div className="from-primary via-accent to-secondary mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br shadow-lg">
            <CreditCard className="text-primary-foreground h-6 w-6" />
          </div>

          <h1 className="from-primary via-accent to-secondary bg-gradient-to-r bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
            Buy Credits
          </h1>

          <p className="text-muted-foreground max-w-md text-base">
            Purchase credits to generate more podcast clips. The more credits
            you buy, the better the value.
          </p>

          <div className="border-border/40 bg-card/30 mt-4 inline-flex items-center gap-2 rounded-lg border px-3 py-1 text-sm shadow-md backdrop-blur-sm">
            <Sparkles className="text-primary h-4 w-4" />
            <span>Unlock premium features with more credits</span>
          </div>
        </div>

        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.title}
              className={cn(
                "transition-all duration-300",
                plan.isPopular && "sm:-translate-y-1 sm:scale-105",
              )}
            >
              <PricingCard plan={plan} />
            </div>
          ))}
        </div>
      </div>

      <div className="border-border/40 from-muted/30 via-muted/50 to-muted/30 rounded-xl border bg-gradient-to-br p-8 shadow-lg backdrop-blur-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
            <Sparkles className="text-primary h-4 w-4" />
          </div>
          <h3 className="from-primary via-accent to-secondary bg-gradient-to-r bg-clip-text text-xl font-bold text-transparent">
            How Credits Work
          </h3>
        </div>

        <ul className="grid gap-4">
          {[
            { text: "1 credit = 1 minute of podcast processing", icon: "⚡" },
            {
              text: "The program will create around 1 clip per 5 minutes of podcast",
              icon: "✂️",
            },
            { text: "Credits never expire and can be used anytime", icon: "∞" },
            {
              text: "Longer podcasts require more credits based on duration",
              icon: "📊",
            },
            {
              text: "All packages are one-time purchases (not subscription)",
              icon: "💎",
            },
          ].map((item, index) => (
            <li
              key={index}
              className="group flex items-center gap-4 transition-all duration-300 hover:translate-x-2"
            >
              <div className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300">
                <span className="text-sm">{item.icon}</span>
              </div>
              <span className="text-muted-foreground group-hover:text-foreground text-sm font-medium transition-colors duration-300">
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BillingsPage;
