import { Suspense } from "react";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#151821] px-4 py-12">
      <Suspense fallback={<div className="text-muted-foreground text-sm">Loading...</div>}>
        <SignUp forceRedirectUrl="/dashboard" fallbackRedirectUrl="/dashboard" />
      </Suspense>
    </div>
  );
}
