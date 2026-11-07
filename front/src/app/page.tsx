import { Suspense } from "react";
import Link from "next/link";
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
  Radar,
  Eye,
  Crosshair,
  Timer,
  Flame,
  ArrowUpRight,
  Terminal,
  Activity,
  Globe,
  Database,
  Lock,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  LandingNavbar,
  HeroAuthActions,
  PricingAuthAction,
} from "@/components/LandingAuthButtons";
import { BrandLogo } from "@/components/layout/BrandLogo";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/20 selection:text-primary">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 text-white text-xs font-medium py-2 px-4 text-center tracking-wide">
        🚀 Powered by Groq Llama 3.3 & Llama 3.2 Vision • Competitor Reverse-Engineering Engine
      </div>

      {/* Main Navigation (Client Island) */}
      <Suspense
        fallback={
          <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
              <BrandLogo size="lg" />
            </div>
          </header>
        }
      >
        <LandingNavbar />
      </Suspense>

      {/* Hero Section - Technical B2B SaaS Interface */}
      <section className="relative pt-12 pb-24 md:pt-16 md:pb-32 overflow-hidden border-b border-white/[0.06]">
        {/* Subtle grid pattern background */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Direct, Technical Positioning Copy */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Punchy Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] font-sans">
                Ad Intelligence &amp; <br />
                <span className="text-zinc-400">Counter-Campaign Engine.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-zinc-400 max-w-xl font-normal leading-relaxed">
                Reverse-engineer competitor creative hooks, isolate psychological retention mechanisms, and synthesize high-converting counter-ads across Meta, Instagram, and TikTok in seconds.
              </p>

              {/* CTA Controls */}
              <div className="pt-2">
                <Suspense
                  fallback={
                    <div className="flex gap-4">
                      <Link href="/dashboard">
                        <Button size="lg" className="h-12 px-8 rounded-xl bg-white text-zinc-950 font-semibold">
                          Open Workspace
                        </Button>
                      </Link>
                    </div>
                  }
                >
                  <HeroAuthActions />
                </Suspense>
              </div>

              {/* Bottom Technical Specs Pill Row */}
              <div className="pt-6 flex flex-wrap items-center gap-y-3 gap-x-6 text-xs font-mono text-zinc-500 border-t border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Real-time Scrape Pipeline</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  <span>&lt;2.4s Breakdown Latency</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Enterprise Data Isolation</span>
                </div>
              </div>
            </div>

            {/* Right Column: Creative Duel (Before & After Ad Intelligence) */}
            <div className="lg:col-span-5 relative">
              {/* Ambient Glow */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#9e93d7]/10 via-[#6cbb7a]/10 to-transparent rounded-3xl blur-2xl pointer-events-none -z-10" />

              <div className="flex flex-col relative">
                {/* CARD A: Competitor Scraped Ad */}
                <div className="rounded-2xl bg-[#191d26] border border-zinc-800/80 p-5 sm:p-6 shadow-xl relative space-y-4">
                  {/* Card Header */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-xs">
                        GD
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-zinc-100 font-sans">GlowDose Skincare</div>
                        <div className="text-[11px] text-[#99d3df] font-sans">Meta Ad Library • Active 45d</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-sans px-2.5 py-1 rounded-full bg-zinc-800/90 text-zinc-300 border border-zinc-700/60 font-medium">
                      Scale Status: $50k+/mo
                    </span>
                  </div>

                  {/* Ad Body Quote */}
                  <div className="bg-[#12151c]/90 rounded-xl p-3.5 border border-white/5">
                    <div className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 mb-1">
                      Scraped Hook (Pattern Interrupt)
                    </div>
                    <p className="text-sm sm:text-base font-semibold text-zinc-100 font-sans leading-snug">
                      &ldquo;Stop wasting $60 on fancy creams that are 90% water.&rdquo;
                    </p>
                  </div>

                  {/* Vulnerability Gap Badge */}
                  <div className="bg-[#28241F] border border-[#e8b98d]/40 text-[#e8b98d] text-xs px-3.5 py-2 rounded-xl flex items-center gap-2 shadow-xs">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span className="font-sans leading-tight">
                      <strong>Vulnerability Gap:</strong> 18% refund complaints due to hidden subscription policy
                    </span>
                  </div>
                </div>

                {/* Floating Connection Pill */}
                <div className="z-10 -my-3.5 mx-auto w-fit bg-[#13161c] border border-zinc-700/60 px-4 py-1.5 rounded-full text-xs text-zinc-200 font-medium flex items-center gap-2 shadow-lg">
                  <Zap className="w-3.5 h-3.5 text-[#6cbb7a]" />
                  <span>AdReverse Counter-Engine</span>
                </div>

                {/* CARD B: Production-Ready Counter-Campaign */}
                <div className="rounded-2xl bg-[#162520] border border-[#6cbb7a]/40 p-5 sm:p-6 shadow-2xl relative space-y-4">
                  {/* Card Header */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#6cbb7a] animate-pulse" />
                      <span className="text-xs font-bold text-zinc-100 font-sans tracking-tight">
                        Production Ready Counter-Script
                      </span>
                    </div>
                    <span className="text-[11px] font-sans px-2.5 py-1 rounded-full bg-[#6cbb7a]/20 text-[#6cbb7a] border border-[#6cbb7a]/40 font-bold">
                      Est. CTR +2.8x
                    </span>
                  </div>

                  {/* Winning Counter-Angle Script */}
                  <div className="bg-[#0f1b17] rounded-xl p-4 border border-[#6cbb7a]/20 border-l-4 border-l-[#6cbb7a] space-y-2">
                    <div className="text-[10px] uppercase font-bold tracking-wider text-[#6cbb7a]">
                      Winning Angle • Direct Comparison
                    </div>
                    <p className="text-sm sm:text-base font-semibold text-zinc-100 font-sans leading-snug">
                      &ldquo;Why pay $60 for watered-down formulas? Get 100% active ingredients with our 60-day bottle-free refund guarantee.&rdquo;
                    </p>
                  </div>

                  {/* Actionable Micro-Footer */}
                  <div className="flex flex-wrap items-center justify-between text-xs text-zinc-400 font-sans pt-1 border-t border-white/5 gap-2">
                    <span className="flex items-center gap-1.5 text-zinc-300">
                      <CheckCircle className="w-3.5 h-3.5 text-[#6cbb7a]" />
                      4-Frame UGC Storyboard Included
                    </span>
                    <span className="text-[#6cbb7a] font-medium font-mono text-[11px]">
                      Generated in 1.8s
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4-Step Workflow Section */}
      <section id="how-it-works" className="py-20 bg-muted/20 border-y border-border/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-violet-600 dark:text-violet-400">
              The 4-Step Loop
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-2 tracking-tight">
              From competitor URL to production-ready campaign in minutes
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base mt-3">
              The contract-first pipeline powering AdReverse AI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-card border border-border shadow-xs hover:border-violet-500/40 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 font-bold flex items-center justify-center text-sm mb-4">
                  01
                </div>
                <h3 className="text-lg font-bold text-foreground">Brand Onboarding</h3>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  Provide your niche, USP, and value props. AdReverse establishes your unique brand voice matrix.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border/40 text-[11px] font-medium text-violet-600 dark:text-violet-400 flex items-center gap-1">
                <Target className="w-3.5 h-3.5" />
                Positioning Defined
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-card border border-border shadow-xs hover:border-violet-500/40 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center text-sm mb-4">
                  02
                </div>
                <h3 className="text-lg font-bold text-foreground">Market Discovery</h3>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  Autonomous discovery scans your sector, identifies tier 1 competitors, and calculates market share estimates.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border/40 text-[11px] font-medium text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                <Search className="w-3.5 h-3.5" />
                Live Competitor Matrix
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-card border border-border shadow-xs hover:border-violet-500/40 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center text-sm mb-4">
                  03
                </div>
                <h3 className="text-lg font-bold text-foreground">Ad Reverse-Eng</h3>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  Vision models break down visual hooks, emotional triggers, pricing mechanisms, and exploit vulnerability gaps.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border/40 text-[11px] font-medium text-blue-600 dark:text-blue-400 flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5" />
                Llama 3.2 Vision Analysis
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-2xl bg-card border border-border shadow-xs hover:border-violet-500/40 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center text-sm mb-4">
                  04
                </div>
                <h3 className="text-lg font-bold text-foreground">Counter-Campaign</h3>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  Generate full UGC storyboards, frame-by-frame scripts, hooks, and punchy copy that out-converts competitors.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border/40 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <Video className="w-3.5 h-3.5" />
                UGC Storyboards & Script
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlight / Deep Dive - Bento Grid Deconstruction */}
      <section id="features" className="py-24 relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-violet-600/10 via-sky-500/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header with punchy copy */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181b24] border border-violet-500/30 text-xs font-mono text-[#9e93d7] mb-4">
              <Radar className="w-3.5 h-3.5 animate-pulse text-[#9e93d7]" />
              <span>COGNITIVE DECONSTRUCTION ENGINE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight font-sans">
              Isolate Winning Psychology. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9e93d7] via-[#99d3df] to-[#6cbb7a]">
                Exploit Competitor Flaws.
              </span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Stop guessing creative fatigue. AdReverse reverse-engineers high-retention ad mechanics into actionable market conquest.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
            
            {/* CARD 1: Hook & Cognitive Mechanism (Span 7) */}
            <div className="lg:col-span-7 rounded-3xl bg-[#181b24] border border-white/5 p-7 sm:p-8 flex flex-col justify-between shadow-2xl hover:border-[#9e93d7]/30 transition-all duration-300 group">
              <div>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#9e93d7]/15 border border-[#9e93d7]/30 flex items-center justify-center text-[#9e93d7] group-hover:scale-110 transition-transform">
                    <Eye className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-[#13161c] border border-white/10 text-[11px] font-mono text-zinc-400">
                      FRAME 0:00 - 0:03
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-[#9e93d7]/15 text-[#9e93d7] border border-[#9e93d7]/30 text-[11px] font-mono font-semibold">
                      RETENTION 89%
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#9e93d7]">
                    <span>Phase 01</span>
                    <span>•</span>
                    <span>Vision Inspector</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground font-sans tracking-tight">
                    Hook & Pattern Interrupt
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed pt-1">
                    Isolates the psychological trigger in the first 3 seconds to expose how competitors stop the infinite scroll.
                  </p>
                </div>
              </div>

              {/* Simulated UI: Hook inspector snippet */}
              <div className="mt-6 pt-5 border-t border-white/5">
                <div className="bg-[#13161c] rounded-2xl p-4 border border-white/5 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-400 font-mono text-[11px]">Deconstructed Hook Script</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-[#6cbb7a] border border-[#6cbb7a]/20">
                      CONFIRMED SCALER
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-zinc-200 italic border-l-2 border-[#9e93d7] pl-3 py-0.5">
                    &ldquo;Tired of spending $200/mo on salon treatments? Watch this 10-second hack.&rdquo;
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="text-[11px] px-2.5 py-1 rounded-lg bg-[#181b24] text-[#9e93d7] border border-[#9e93d7]/20 font-mono">
                      Curiosity + Price Contrast
                    </span>
                    <span className="text-[11px] px-2.5 py-1 rounded-lg bg-[#181b24] text-zinc-300 border border-white/10 font-mono">
                      Format: TikTok / Reels 9:16
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 2: Longevity & Ad Spend Signals (Span 5) */}
            <div className="lg:col-span-5 rounded-3xl bg-[#13161c] border border-white/5 p-7 sm:p-8 flex flex-col justify-between shadow-2xl hover:border-[#6cbb7a]/30 transition-all duration-300 group">
              <div>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#6cbb7a]/15 border border-[#6cbb7a]/30 flex items-center justify-center text-[#6cbb7a] group-hover:scale-110 transition-transform">
                    <Flame className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#6cbb7a]/15 text-[#6cbb7a] border border-[#6cbb7a]/30 text-xs font-mono font-bold flex items-center gap-1.5">
                    <Timer className="w-3.5 h-3.5" /> 45 Days Live
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#6cbb7a]">
                    <span>Phase 02</span>
                    <span>•</span>
                    <span>Longevity Signal</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground font-sans tracking-tight">
                    Proof-of-Profit Scoring
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed pt-1">
                    Filters out burning ad tests. Tracks creatives actively running past 30 days — the undisputed signal of direct ROI.
                  </p>
                </div>
              </div>

              {/* Simulated UI: Longevity progress bar & metrics */}
              <div className="mt-6 pt-5 border-t border-white/5 space-y-3">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-zinc-400">Longevity Confidence</span>
                  <span className="text-[#6cbb7a] font-bold">96.4% Top Tier</span>
                </div>
                {/* Visual Progress Bar */}
                <div className="w-full bg-[#181b24] rounded-full h-2.5 overflow-hidden p-0.5 border border-white/5">
                  <div className="bg-gradient-to-r from-[#6cbb7a]/80 to-[#6cbb7a] h-full rounded-full w-[94%]" />
                </div>
                <div className="flex justify-between items-center text-[11px] font-mono text-zinc-500 pt-1">
                  <span>Threshold: 14d</span>
                  <span className="text-zinc-300 font-semibold">Active: 45d (Profitable)</span>
                  <span>Max: 90d+</span>
                </div>
              </div>
            </div>

            {/* CARD 3: Vulnerability Gap Extraction (Span 6) */}
            <div className="lg:col-span-6 rounded-3xl bg-[#13161c] border border-white/5 p-7 sm:p-8 flex flex-col justify-between shadow-2xl hover:border-[#e8b98d]/30 transition-all duration-300 group">
              <div>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#e8b98d]/15 border border-[#e8b98d]/30 flex items-center justify-center text-[#e8b98d] group-hover:scale-110 transition-transform">
                    <Crosshair className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-mono font-semibold">
                    BLIND SPOT FOUND
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#e8b98d]">
                    <span>Phase 03</span>
                    <span>•</span>
                    <span>Flaw Detection</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground font-sans tracking-tight">
                    Vulnerability Gap Mining
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed pt-1">
                    Cross-references negative sentiment and offer terms to extract weak guarantees, hidden pricing, or friction points.
                  </p>
                </div>
              </div>

              {/* Simulated UI: Flaw checklist pill cards */}
              <div className="mt-6 pt-5 border-t border-white/5 space-y-2.5">
                <div className="p-3 rounded-2xl bg-[#181b24] border border-rose-500/20 flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                  <div className="text-xs">
                    <strong className="text-rose-300 font-mono">Competitor Weakness:</strong>
                    <p className="text-zinc-400 mt-0.5">Omits skin-sensitivity certification; customer comments express irritation anxiety.</p>
                  </div>
                </div>
                <div className="p-3 rounded-2xl bg-[#181b24] border border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-400">Offer Weakness Score</span>
                  <span className="text-[#e8b98d] font-bold">High Exploitability (Level A)</span>
                </div>
              </div>
            </div>

            {/* CARD 4: Lethal Counter-Angles (Span 6) - Before / After tag */}
            <div className="lg:col-span-6 rounded-3xl bg-[#181b24] border border-white/5 p-7 sm:p-8 flex flex-col justify-between shadow-2xl hover:border-[#99d3df]/30 transition-all duration-300 group">
              <div>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#99d3df]/15 border border-[#99d3df]/30 flex items-center justify-center text-[#99d3df] group-hover:scale-110 transition-transform">
                    <Zap className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#99d3df]/15 text-[#99d3df] border border-[#99d3df]/30 text-xs font-mono font-bold flex items-center gap-1">
                    <ArrowUpRight className="w-3.5 h-3.5" /> 1-Click Synthesis
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#99d3df]">
                    <span>Phase 04</span>
                    <span>•</span>
                    <span>Counter Strategy</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground font-sans tracking-tight">
                    Instant Conquest Angles
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed pt-1">
                    Generates 3 lethal counter-angles engineered to dismantle competitor claims and capture customer trust instantly.
                  </p>
                </div>
              </div>

              {/* Simulated UI: Before / After Comparison */}
              <div className="mt-6 pt-5 border-t border-white/5 space-y-2.5">
                {/* Before Pill */}
                <div className="p-2.5 rounded-xl bg-[#13161c] border border-white/5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 font-mono text-[10px] font-bold uppercase">
                      BEFORE
                    </span>
                    <span className="text-zinc-400 truncate max-w-[240px] sm:max-w-xs text-[11px]">
                      Generic hype without dermatological proof
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono">High CPA</span>
                </div>

                {/* After Pill */}
                <div className="p-2.5 rounded-xl bg-[#99d3df]/10 border border-[#99d3df]/30 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-[#99d3df] text-zinc-950 font-mono text-[10px] font-bold uppercase">
                      AFTER (AI)
                    </span>
                    <span className="text-zinc-200 font-medium truncate max-w-[240px] sm:max-w-xs text-[11px]">
                      &ldquo;100% Hypoallergenic Certification Guarantee&rdquo;
                    </span>
                  </div>
                  <span className="text-[10px] text-[#99d3df] font-mono font-bold">-42% CPA</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Interactive CTA Strip */}
          <div className="mt-12 text-center">
            <Link href="/dashboard">
              <Button size="lg" className="rounded-2xl px-8 py-6 text-sm font-semibold gap-3 shadow-xl bg-violet-600 hover:bg-violet-500 text-white transition-all hover:shadow-violet-600/25">
                <span>Try Interactive Ad Deconstruction</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing / Value Comparison Section */}
      <section id="pricing" className="py-20 bg-muted/20 border-t border-border/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase font-bold tracking-widest text-violet-600 dark:text-violet-400">
            Agency Cost vs AdReverse
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-2 tracking-tight">
            Stop burning $5,000/mo on creative agencies
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mt-3 max-w-xl mx-auto">
            Get unlimited competitor scans, instant hooks, and full UGC video scripts at zero agency overhead.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 text-left">
            {/* Traditional Agency */}
            <div className="p-8 rounded-2xl bg-card border border-border shadow-xs">
              <h3 className="text-xl font-bold text-muted-foreground">Traditional Agency</h3>
              <div className="mt-4 text-3xl font-extrabold text-foreground">$3,500 - $6,000<span className="text-sm font-normal text-muted-foreground"> /month</span></div>
              <p className="text-xs text-muted-foreground mt-2">Slow turnarounds and manual spreadsheets</p>

              <ul className="mt-6 space-y-3 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">❌ 2 to 3 weeks turnaround per campaign</li>
                <li className="flex items-center gap-2">❌ Subjective guessing without vision analysis</li>
                <li className="flex items-center gap-2">❌ Additional fees for video script revisions</li>
                <li className="flex items-center gap-2">❌ Limited cross-platform coverage</li>
              </ul>
            </div>

            {/* AdReverse AI */}
            <div className="p-8 rounded-2xl bg-card border-2 border-violet-500 shadow-xl relative">
              <div className="absolute -top-3 right-6 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Hackathon Free Tier
              </div>
              <h3 className="text-xl font-bold text-foreground">AdReverse Platform</h3>
              <div className="mt-4 text-3xl font-extrabold text-foreground">$0<span className="text-sm font-normal text-muted-foreground"> / hackathon preview</span></div>
              <p className="text-xs text-violet-600 dark:text-violet-400 mt-2 font-medium">Instant AI intelligence & UGC automation</p>

              <ul className="mt-6 space-y-3 text-xs text-foreground">
                <li className="flex items-center gap-2 font-medium">✅ Sub-30 second full campaign generation</li>
                <li className="flex items-center gap-2 font-medium">✅ Vision-powered frame deconstruction</li>
                <li className="flex items-center gap-2 font-medium">✅ 3 battle-tested strategic angles</li>
                <li className="flex items-center gap-2 font-medium">✅ Direct export for UGC creators & editors</li>
              </ul>

              <Suspense
                fallback={
                  <div className="mt-8">
                    <Link href="/dashboard">
                      <Button className="w-full h-11 text-sm font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
                        Enter Workspace
                      </Button>
                    </Link>
                  </div>
                }
              >
                <PricingAuthAction />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Bar */}
      <section className="py-16 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Ready to outsmart your market rivals?
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2 max-w-lg mx-auto">
            Test the full 4-step pipeline now: Brand Onboarding, Market Discovery, Ad Reverse-Engineering, and Counter-Campaign Generation.
          </p>
          <div className="mt-6">
            <Link href="/dashboard">
              <Button size="lg" className="h-11 px-8 gap-2 font-semibold">
                Start Counter-Campaign Generator
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 text-center text-xs text-muted-foreground bg-background">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <BrandLogo />
          <div>
            AdReverse AI &copy; 2026. Built with Next.js App Router, Clerk, and Groq Llama Models.
          </div>
          <div className="flex items-center gap-4 text-xs">
            <Link href="/dashboard" className="hover:underline">
              Dashboard
            </Link>
            <a href="#how-it-works" className="hover:underline">
              Pipeline
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
