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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <BrandLogo />

        <nav className="hidden md:flex items-center gap-7 text-xs font-mono text-zinc-400">
          <a href="#how-it-works" className="hover:text-white transition-colors">
            Framework
          </a>
          <a href="#features" className="hover:text-white transition-colors">
            Deconstruction
          </a>
          <a href="#demo-preview" className="hover:text-white transition-colors">
            Live Sample
          </a>
          <a href="#pricing" className="hover:text-white transition-colors">
            ROI Metrics
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Show when="signed-out">
            <SignInButton mode="modal" forceRedirectUrl="/dashboard">
              <Button variant="ghost" size="sm" className="font-mono text-xs text-zinc-400 hover:text-white hover:bg-zinc-800/60">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal" forceRedirectUrl="/dashboard">
              <Button size="sm" className="rounded-lg bg-white text-zinc-950 font-medium px-4 py-2 text-xs hover:bg-zinc-200 transition-all gap-1.5">
                Start Audit
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <Link href="/dashboard">
              <Button size="sm" className="rounded-lg bg-white text-zinc-950 font-medium px-4 py-2 text-xs hover:bg-zinc-200 transition-all gap-1.5">
                Dashboard
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
            <div className="pl-1">
              <UserButton />
            </div>
          </Show>
        </div>
      </div>
    </header>
  );
}

export function HeroAuthActions() {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-3">
      <Show when="signed-out">
        <SignUpButton mode="modal" forceRedirectUrl="/dashboard">
          <Button size="lg" className="rounded-lg bg-white text-zinc-950 font-medium px-6 py-2.5 text-sm hover:bg-zinc-200 transition-all gap-2 w-full sm:w-auto">
            Audit Competitor Ads Free
            <ArrowRight className="w-4 h-4" />
          </Button>
        </SignUpButton>
      </Show>
      <Show when="signed-in">
        <Link href="/dashboard" className="w-full sm:w-auto">
          <Button size="lg" className="rounded-lg bg-white text-zinc-950 font-medium px-6 py-2.5 text-sm hover:bg-zinc-200 transition-all gap-2 w-full">
            Open Dashboard
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </Show>
      <Link href="/dashboard" className="w-full sm:w-auto">
        <Button variant="outline" size="lg" className="rounded-lg bg-zinc-900 border-zinc-700/80 text-zinc-300 hover:bg-zinc-800 hover:text-white text-sm font-medium px-5 py-2.5 w-full sm:w-auto gap-2">
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
