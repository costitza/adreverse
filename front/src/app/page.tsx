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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  LandingNavbar,
  HeroAuthActions,
  PricingAuthAction,
} from "@/components/LandingAuthButtons";

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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-violet-600 text-white flex items-center justify-center font-bold">
                  AR
                </div>
                <span className="font-bold text-lg">AdReverse AI</span>
              </div>
            </div>
          </header>
        }
      >
        <LandingNavbar />
      </Suspense>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
        {/* Glow ambient background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-violet-500/20 to-indigo-500/10 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-300 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            AI-Driven Growth Hackathon Platform
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]">
            Reverse-engineer winning competitor ads.{" "}
            <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-500 bg-clip-text text-transparent">
              Generate lethal counter-campaigns.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto font-normal leading-relaxed">
            Stop guessing what converts. We scrape high-performing ads across Meta, Instagram, and TikTok, dissect their psychological hooks, detect vulnerability gaps, and produce ready-to-launch UGC storyboards tailored to your brand.
          </p>

          <Suspense
            fallback={
              <div className="mt-8 flex justify-center">
                <Link href="/dashboard">
                  <Button size="lg" className="h-12 px-8">
                    Open Workspace
                  </Button>
                </Link>
              </div>
            }
          >
            <HeroAuthActions />
          </Suspense>

          {/* Social Proof Badges */}
          <div className="mt-12 pt-8 border-t border-border/40 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-foreground">10x</div>
              <div className="text-xs text-muted-foreground mt-1 font-medium">Faster Creative Iteration</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-foreground">&lt; 30s</div>
              <div className="text-xs text-muted-foreground mt-1 font-medium">Vision & Copy Breakdown</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-foreground">89%</div>
              <div className="text-xs text-muted-foreground mt-1 font-medium">Lower Creative Research Cost</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-foreground">3 Platforms</div>
              <div className="text-xs text-muted-foreground mt-1 font-medium">Meta, Instagram & TikTok</div>
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

      {/* Feature Highlight / Deep Dive */}
      <section id="features" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-violet-600 dark:text-violet-400">
                Cognitive Ad Deconstruction
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-2 tracking-tight">
                Understand WHY their ad works, then expose the blind spots.
              </h2>
              <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                AdReverse AI doesn&apos;t just copy competitors. It isolates the psychological mechanism behind ad retention and pinpoints their exact weakness—like hidden pricing, generic messaging, or weak guarantees.
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Longevity & Spend Scoring</h4>
                    <p className="text-xs text-muted-foreground">Identify ads that have run for 30+ days—the undisputed proof of direct ROI.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Vulnerability Gap Extraction</h4>
                    <p className="text-xs text-muted-foreground">Find missing customer assurances and high shipping fees that your brand can exploit.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Multi-Angle Generation</h4>
                    <p className="text-xs text-muted-foreground">Direct Comparison, Problem Agitation, and Review Stacking in one single click.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link href="/dashboard">
                  <Button className="gap-2">
                    Try the Interactive Audit
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Interactive Preview Mock Card */}
            <div id="demo-preview" className="rounded-2xl border border-border bg-card p-6 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-border/40">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="text-xs text-muted-foreground font-mono ml-2">AdReverse // Vision Inspector</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-semibold border border-emerald-500/20">
                  92/100 Effectiveness
                </span>
              </div>

              <div className="mt-4 space-y-4">
                <div className="p-3 rounded-xl bg-muted/40 border border-border/50">
                  <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Hook Deconstruction</div>
                  <div className="text-xs font-semibold text-foreground mt-1">
                    &ldquo;Tired of spending $200/mo on salon treatments? Watch this 10-second hack.&rdquo;
                  </div>
                  <div className="mt-2 flex gap-2">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-violet-500/10 text-violet-700 dark:text-violet-300 font-medium">
                      Curiosity + Price Contrast
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-700 dark:text-blue-300 font-medium">
                      Active 45 Days
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-rose-500/5 border border-rose-500/20">
                  <div className="text-[10px] uppercase font-bold text-rose-600 dark:text-rose-400 tracking-wider">Vulnerability Gap Detected</div>
                  <div className="text-xs text-foreground mt-1 font-medium">
                    Fails to mention skin sensitivity or chemical risks; customers complain of irritation in comment sentiment.
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                  <div className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 tracking-wider">Generated Counter-Angle</div>
                  <div className="text-xs text-foreground mt-1 font-semibold">
                    &ldquo;Same salon results, 100% hypoallergenic organic certification. Zero irritation guarantee.&rdquo;
                  </div>
                  <div className="mt-2 text-[10px] text-muted-foreground">
                    Estimated creative turnaround: <strong className="text-foreground">Under 1 hour</strong> (Save $1,200 agency fee)
                  </div>
                </div>
              </div>
            </div>
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
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <div className="w-5 h-5 rounded bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold">
              AR
            </div>
            AdReverse AI
          </div>
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
