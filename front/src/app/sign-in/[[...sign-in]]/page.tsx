import { Suspense } from "react";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#151821] px-4 py-12">
      <Suspense fallback={<div className="text-muted-foreground text-sm">Loading...</div>}>
        <SignIn forceRedirectUrl="/dashboard" fallbackRedirectUrl="/dashboard" />
      </Suspense>
    </div>
  );
}
