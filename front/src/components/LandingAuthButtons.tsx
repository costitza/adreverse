"use client";

import Link from "next/link";
import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import {
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { BrandLogo } from "@/components/layout/BrandLogo";

export function LandingNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-[#0d0f12]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <BrandLogo size="lg" />

        <nav className="hidden md:flex items-center gap-2 lg:gap-4">
          <a
            href="#how-it-works"
            className="px-4 py-2 rounded-xl text-lg font-bold text-zinc-200 hover:text-white hover:bg-zinc-800/60 transition-all tracking-tight"
          >
            Framework
          </a>
          <a
            href="#features"
            className="px-4 py-2 rounded-xl text-lg font-bold text-zinc-200 hover:text-white hover:bg-zinc-800/60 transition-all tracking-tight"
          >
            Deconstruction
          </a>
          <a
            href="#pricing"
            className="px-4 py-2 rounded-xl text-lg font-bold text-zinc-200 hover:text-white hover:bg-zinc-800/60 transition-all tracking-tight"
          >
            Pricing
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <Show when="signed-out">
            <SignInButton mode="modal" forceRedirectUrl="/dashboard">
              <Button variant="ghost" size="default" className="text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-800/60 px-5 py-2.5 h-12 rounded-xl">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal" forceRedirectUrl="/dashboard">
              <Button size="default" className="rounded-xl bg-white text-zinc-950 font-semibold px-6 py-2.5 text-base hover:bg-zinc-200 transition-all gap-2 h-12 shadow-md">
                Start Audit
                <ArrowRight className="w-4 h-4" />
              </Button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <Link href="/dashboard">
              <Button size="default" className="rounded-xl bg-white text-zinc-950 font-semibold px-6 py-2.5 text-base hover:bg-zinc-200 transition-all gap-2 h-12 shadow-md">
                Dashboard
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <div className="flex items-center pl-2">
              <UserButton
                appearance={{
                  elements: {
                    rootBox: "flex items-center justify-center !w-14 !h-14",
                    userButtonTrigger: "focus:outline-none focus:ring-0 !w-14 !h-14 flex items-center justify-center",
                    userButtonAvatarBox: "!w-14 !h-14 ring-2 ring-zinc-700/80 hover:ring-violet-500 transition-all rounded-full overflow-hidden shadow-lg",
                    userButtonAvatarImage: "!w-14 !h-14 object-cover",
                    avatarBox: "!w-14 !h-14",
                    avatarImage: "!w-14 !h-14 object-cover",
                  },
                }}
              />
            </div>
          </Show>
        </div>
      </div>
    </header>
  );
}

export function HeroAuthActions() {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
      <Show when="signed-out">
        <SignUpButton mode="modal" forceRedirectUrl="/dashboard">
          <Button size="lg" className="rounded-xl bg-white text-zinc-950 font-semibold px-6 py-3 text-sm hover:bg-zinc-200 transition-all gap-2 h-12 shadow-sm">
            Audit Competitor Ads Free
            <ArrowRight className="w-4 h-4" />
          </Button>
        </SignUpButton>
      </Show>
      <Show when="signed-in">
        <Link href="/dashboard">
          <Button size="lg" className="rounded-xl bg-white text-zinc-950 font-semibold px-6 py-3 text-sm hover:bg-zinc-200 transition-all gap-2 h-12 shadow-sm">
            Launch Workspace
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </Show>
      <Link href="/dashboard">
        <Button variant="outline" size="lg" className="rounded-xl bg-[#181b24] border-white/10 text-zinc-300 hover:bg-[#202430] hover:text-white text-sm font-medium px-5 py-3 h-12 gap-2">
          <span>Live Demo Workspace</span>
          <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
        </Button>
      </Link>
    </div>
  );
}

export function PricingAuthAction() {
  return (
    <div className="mt-8">
      <Show when="signed-out">
        <SignUpButton mode="modal" forceRedirectUrl="/dashboard">
          <Button className="w-full rounded-lg bg-white text-zinc-950 font-medium py-2.5 text-sm hover:bg-zinc-200 transition-all">
            Start Free Hackathon Access
          </Button>
        </SignUpButton>
      </Show>
      <Show when="signed-in">
        <Link href="/dashboard">
          <Button className="w-full rounded-lg bg-white text-zinc-950 font-medium py-2.5 text-sm hover:bg-zinc-200 transition-all">
            Enter Workspace
          </Button>
        </Link>
      </Show>
    </div>
  );
}
