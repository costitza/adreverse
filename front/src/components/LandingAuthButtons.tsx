"use client";

import Link from "next/link";
import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Search,
  Cpu,
  Video,
  BarChart3,
  CheckCircle,
  Zap,
  TrendingUp,
  Target,
  Play,
  Layers,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function LandingNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white font-black text-base shadow-sm group-hover:scale-105 transition-transform">
            AR
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight block leading-tight">
              AdReverse AI
            </span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest block font-medium">
              Intelligence & Counter-Ads
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#how-it-works" className="hover:text-foreground transition-colors">
            How It Works
          </a>
          <a href="#features" className="hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#demo-preview" className="hover:text-foreground transition-colors">
            Ad Breakdown
          </a>
          <a href="#pricing" className="hover:text-foreground transition-colors">
            Value ROI
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm" className="font-medium text-xs sm:text-sm">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button size="sm" className="gap-1.5 font-semibold text-xs sm:text-sm shadow-sm bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-95 text-white">
                Get Started Free
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <Link href="/dashboard">
              <Button size="sm" className="gap-1.5 font-medium text-xs sm:text-sm">
                Go to App
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
    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
      <Show when="signed-out">
        <SignUpButton mode="modal">
          <Button size="lg" className="h-12 px-8 text-base font-semibold shadow-lg shadow-violet-500/20 bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-95 text-white gap-2 w-full sm:w-auto">
            Launch Free Audit
            <ArrowRight className="w-4 h-4" />
          </Button>
        </SignUpButton>
      </Show>
      <Show when="signed-in">
        <Link href="/dashboard" className="w-full sm:w-auto">
          <Button size="lg" className="h-12 px-8 text-base font-semibold shadow-lg shadow-violet-500/20 bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-95 text-white gap-2 w-full">
            Open Workspace
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </Show>
      <Link href="/dashboard" className="w-full sm:w-auto">
        <Button variant="outline" size="lg" className="h-12 px-8 text-base font-medium w-full sm:w-auto gap-2">
          <Play className="w-4 h-4 fill-current text-muted-foreground" />
          Explore Live Demo
        </Button>
      </Link>
    </div>
  );
}

export function PricingAuthAction() {
  return (
    <div className="mt-8">
      <Show when="signed-out">
        <SignUpButton mode="modal">
          <Button className="w-full h-11 text-sm font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:opacity-95">
            Get Started Now
          </Button>
        </SignUpButton>
      </Show>
      <Show when="signed-in">
        <Link href="/dashboard">
          <Button className="w-full h-11 text-sm font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:opacity-95">
            Enter Workspace
          </Button>
        </Link>
      </Show>
    </div>
  );
}
