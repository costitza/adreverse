import { Suspense } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Search,
  Cpu,
  Video,
  Check,
  X,
  Zap,
  TrendingUp,
  Target,
  Eye,
  Crosshair,
  Timer,
  Flame,
  ArrowUpRight,
  Activity,
  Database,
  Lock,
  Radio,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  LandingNavbar,
  HeroAuthActions,
  PricingAuthAction,
} from "@/components/LandingAuthButtons";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { HeroCarousel } from "@/components/landing/HeroCarousel";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#11131a] text-zinc-100 flex flex-col font-sans selection:bg-white/20 selection:text-white">
      {/* 1. Main Navigation */}
      <Suspense
        fallback={
          <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-[#11131a]/80 backdrop-blur-md">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
              <BrandLogo size="lg" />
            </div>
          </header>
        }
      >
        <LandingNavbar />
      </Suspense>

      {/* 2. Hero Section (Linear / Vercel style) */}
      <section className="relative pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden border-b border-zinc-800/80">
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Left Column: Direct, Technical Positioning Copy */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-zinc-900/80 border border-zinc-800 px-3.5 py-1 text-xs text-zinc-300 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="font-mono text-[11px] text-zinc-400">INTELLIGENCE PLATFORM</span>
                <span className="text-zinc-600">&bull;</span>
                <span className="text-zinc-200">Reverse-Engineering Engine</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]">
                Ad Reverse-Engineering &amp; <br />
                <span className="text-zinc-400">Counter-Campaign Studio.</span>
              </h1>

              <p className="text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed font-sans">
                Deconstruct scaled competitor ad hooks, uncover hidden friction points, and synthesize high-converting counter-campaigns with UGC frame-by-frame scripts in seconds.
              </p>

              {/* CTA Controls */}
              <div className="pt-2">
                <Suspense
                  fallback={
                    <div className="flex gap-4">
                      <Link href="/dashboard">
                        <Button className="rounded-full bg-white text-zinc-950 hover:bg-zinc-200 font-medium px-6 py-2.5 text-xs transition-colors shadow-xs">
                          Open Workspace
                        </Button>
                      </Link>
                    </div>
                  }
                >
                  <HeroAuthActions />
                </Suspense>
              </div>

              {/* Bottom Specs Pill Row */}
              <div className="pt-6 flex flex-wrap items-center gap-y-3 gap-x-6 text-[11px] font-mono text-zinc-500 border-t border-zinc-800/80">
                <div className="flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Autonomous Radar</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Multi-tier AI Pipeline</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Isolated Brand Vaults</span>
                </div>
              </div>
            </div>

            {/* Right Column: Multi-Platform Ad Carousel (Instagram, TikTok, Facebook) */}
            <div className="lg:col-span-5 flex justify-center">
              <HeroCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* 3. The 4-Step Pipeline Section */}
      <section id="how-it-works" className="py-20 border-b border-zinc-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-14 space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
              Contract-First Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              From competitor domain to counter-ad studio
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              A 4-step autonomous intelligence loop built for modern performance marketers
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Step 1 */}
            <div className="rounded-2xl bg-zinc-900/40 border border-zinc-800/80 p-5 flex flex-col justify-between hover:border-zinc-700 hover:bg-zinc-900/60 transition-colors">
              <div className="space-y-3">
                <span className="font-mono text-xs text-zinc-500">01</span>
                <h3 className="text-sm font-semibold text-white">Brand Workspace</h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  Define your brand identity, product niche, and customer demographic parameters.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-zinc-800/60 flex items-center gap-1.5 text-[11px] font-mono text-zinc-400">
                <Target className="w-3 h-3 text-zinc-400" />
                <span>Identity Defined</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="rounded-2xl bg-zinc-900/40 border border-zinc-800/80 p-5 flex flex-col justify-between hover:border-zinc-700 hover:bg-zinc-900/60 transition-colors">
              <div className="space-y-3">
                <span className="font-mono text-xs text-zinc-500">02</span>
                <h3 className="text-sm font-semibold text-white">Market Radar</h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  Autonomous discovery surfaces top rival brands and computes reach metrics.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-zinc-800/60 flex items-center gap-1.5 text-[11px] font-mono text-zinc-400">
                <Search className="w-3 h-3 text-zinc-400" />
                <span>Competitor Vault</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="rounded-2xl bg-zinc-900/40 border border-zinc-800/80 p-5 flex flex-col justify-between hover:border-zinc-700 hover:bg-zinc-900/60 transition-colors">
              <div className="space-y-3">
                <span className="font-mono text-xs text-zinc-500">03</span>
                <h3 className="text-sm font-semibold text-white">Ad Deconstruction</h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  AI isolates psychological hooks, mechanisms, and exploits vulnerability gaps.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-zinc-800/60 flex items-center gap-1.5 text-[11px] font-mono text-zinc-400">
                <Cpu className="w-3 h-3 text-zinc-400" />
                <span>Strategic Analysis</span>
              </div>
            </div>

            {/* Step 4 */}
            <div className="rounded-2xl bg-zinc-900/40 border border-zinc-800/80 p-5 flex flex-col justify-between hover:border-zinc-700 hover:bg-zinc-900/60 transition-colors">
              <div className="space-y-3">
                <span className="font-mono text-xs text-zinc-500">04</span>
                <h3 className="text-sm font-semibold text-white">Campaign Studio</h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  Generate full UGC video storyboards, frame-by-frame scripts, and copy.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-zinc-800/60 flex items-center gap-1.5 text-[11px] font-mono text-zinc-400">
                <Video className="w-3 h-3 text-zinc-400" />
                <span>Storyboards &amp; Copy</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Feature Intelligence Grid */}
      <section id="features" className="py-20 border-b border-zinc-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-14 space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
              Core Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Engineered to out-convert competitor fatigue
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Extract what converts in your niche and turn competitor weaknesses into your brand advantages
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card 1: Hook Isolation */}
            <div className="rounded-2xl bg-zinc-900/40 border border-zinc-800/80 p-6 space-y-4 hover:border-zinc-700 transition-colors">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-zinc-800/80 flex items-center justify-center text-zinc-300">
                  <Eye className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono text-zinc-400 bg-zinc-800/60 px-2 py-0.5 rounded-md">
                  First 3 Seconds
                </span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Hook &amp; Pattern Interrupt</h3>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Isolates opening creative tactics that capture attention and prevent scrolling across TikTok and Meta.
                </p>
              </div>
              <div className="bg-black/20 rounded-xl p-3 border border-zinc-800/50 text-xs italic text-zinc-300">
                &ldquo;Tired of supplements with zero transparency? Watch this 10-second breakdown.&rdquo;
              </div>
            </div>

            {/* Card 2: Longevity Signals */}
            <div className="rounded-2xl bg-zinc-900/40 border border-zinc-800/80 p-6 space-y-4 hover:border-zinc-700 transition-colors">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-zinc-800/80 flex items-center justify-center text-zinc-300">
                  <Timer className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono text-zinc-400 bg-zinc-800/60 px-2 py-0.5 rounded-md">
                  Active Longevity
                </span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Proof-of-Profit Signals</h3>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Filter out burning ad tests to focus strictly on campaigns running past 30+ days with positive return.
                </p>
              </div>
              <div className="bg-black/20 rounded-xl p-3 border border-zinc-800/50 flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-400">Longevity Indicator</span>
                <span className="text-emerald-400 font-semibold">45 Days Active (Scaled)</span>
              </div>
            </div>

            {/* Card 3: Vulnerability Extraction */}
            <div className="rounded-2xl bg-zinc-900/40 border border-zinc-800/80 p-6 space-y-4 hover:border-zinc-700 transition-colors">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-zinc-800/80 flex items-center justify-center text-zinc-300">
                  <Crosshair className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                  Opportunity Detection
                </span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Vulnerability Gap Mining</h3>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Discovers where competitor offers fall short: weak guarantees, hidden pricing, or unaddressed customer friction.
                </p>
              </div>
              <div className="bg-black/20 rounded-xl p-3 border border-zinc-800/50 text-xs text-zinc-300">
                <span className="text-zinc-500 font-mono text-[11px] block">Extracted Friction</span>
                Competitor charges hidden subscription fees; lacks satisfaction guarantee.
              </div>
            </div>

            {/* Card 4: UGC Video Storyboard */}
            <div className="rounded-2xl bg-zinc-900/40 border border-zinc-800/80 p-6 space-y-4 hover:border-zinc-700 transition-colors">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-zinc-800/80 flex items-center justify-center text-zinc-300">
                  <Video className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono text-zinc-400 bg-zinc-800/60 px-2 py-0.5 rounded-md">
                  Creator Ready
                </span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Frame-by-Frame UGC Scripts</h3>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Generates ready-to-record second-by-second creator storyboards with visual prompts, voiceover, and text overlays.
                </p>
              </div>
              <div className="bg-black/20 rounded-xl p-3 border border-zinc-800/50 flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-400">Format Output</span>
                <span className="text-zinc-200">4 Frames &bull; 9:16 Vertical</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Pricing / Value Comparison Section */}
      <section id="pricing" className="py-20 border-b border-zinc-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-12">
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
              Agency Cost Comparison
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Replace agency overhead with instant intelligence
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto">
              Unlimited competitor analysis and production-ready UGC campaigns without 3-week delays
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            {/* Traditional Agency */}
            <div className="rounded-2xl bg-zinc-900/30 border border-zinc-800/80 p-6 space-y-4">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                Traditional Creative Agency
              </span>
              <div className="text-2xl font-bold text-zinc-300">
                $4,500+<span className="text-xs text-zinc-500 font-normal"> /month</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Manual competitor tracking, slow spreadsheet delivery, and subjective guesswork.
              </p>

              <div className="pt-2 border-t border-zinc-800/60 space-y-2.5 text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <X className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                  <span>2 to 4 weeks turnaround per campaign</span>
                </div>
                <div className="flex items-center gap-2">
                  <X className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                  <span>Manual creative reviews without structured deconstruction</span>
                </div>
                <div className="flex items-center gap-2">
                  <X className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                  <span>Additional agency fees for storyboard revisions</span>
                </div>
              </div>
            </div>

            {/* AdReverse Platform */}
            <div className="rounded-2xl bg-zinc-900/60 border border-white/20 p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-medium">
                  AdReverse Workspace
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  Instant Access
                </span>
              </div>
              <div className="text-2xl font-bold text-white">
                $0<span className="text-xs text-zinc-400 font-normal"> / live preview</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Autonomous discovery, psychological deconstruction, and full UGC video studio in seconds.
              </p>

              <div className="pt-2 border-t border-zinc-800/60 space-y-2.5 text-xs text-zinc-200">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Sub-3-second concurrent campaign synthesis</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Psychological hook &amp; vulnerability deconstruction</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>3 strategic counter-angles (Comparison, Agitation, Proof)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Complete frame-by-frame creator storyboards</span>
                </div>
              </div>

              <div className="pt-2">
                <Suspense
                  fallback={
                    <Link href="/dashboard">
                      <Button className="w-full rounded-full bg-white text-zinc-950 font-medium hover:bg-zinc-200 text-xs py-2 transition-colors">
                        Enter Workspace
                      </Button>
                    </Link>
                  }
                >
                  <PricingAuthAction />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Call to Action Strip */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4 text-center space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Ready to analyze your competitor landscape?
          </h2>
          <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
            Run the 4-step pipeline: Onboard Brand, Discover Rivals, Reverse-Engineer Creatives, and Synthesize Counter-Campaigns.
          </p>
          <div className="pt-2">
            <Link href="/dashboard">
              <Button className="rounded-full bg-white text-zinc-950 font-medium px-6 py-2.5 text-xs hover:bg-zinc-200 transition-colors shadow-xs gap-2">
                <span>Open Dashboard Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="border-t border-zinc-800/80 py-6 text-xs text-zinc-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <BrandLogo size="sm" />
          <div className="text-[11px] font-mono">
            AdReverse &bull; AI Ad Reverse-Engineering &amp; Competitor Intelligence
          </div>
          <div className="flex items-center gap-4 text-xs text-zinc-400">
            <Link href="/dashboard" className="hover:text-white transition-colors">
              Workspace
            </Link>
            <a href="#how-it-works" className="hover:text-white transition-colors">
              Pipeline
            </a>
            <a href="#pricing" className="hover:text-white transition-colors">
              Comparison
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
