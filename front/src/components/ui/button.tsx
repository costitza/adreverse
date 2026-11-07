import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center font-medium transition-all duration-200 outline-none select-none disabled:pointer-events-none disabled:opacity-40 cursor-pointer active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-white text-zinc-950 hover:bg-zinc-200 shadow-sm font-semibold",
        pill:
          "rounded-full bg-white text-zinc-950 hover:bg-zinc-200 shadow-sm font-medium px-6 py-2.5",
        outline:
          "border border-zinc-700/80 bg-white/[0.03] text-zinc-200 hover:bg-white/[0.08] hover:text-white hover:border-zinc-500",
        ghost:
          "text-zinc-400 hover:text-white hover:bg-white/[0.06]",
        secondary:
          "bg-zinc-800 text-zinc-200 hover:bg-zinc-700 border border-zinc-700/50",
        destructive:
          "bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30",
        link:
          "text-white underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        default: "h-9 rounded-full px-4 text-xs sm:text-sm gap-2",
        xs: "h-6 rounded-full px-2.5 text-xs gap-1",
        sm: "h-8 rounded-full px-3.5 text-xs gap-1.5",
        lg: "h-11 rounded-full px-6 text-sm sm:text-base gap-2.5 font-semibold",
        icon: "size-9 rounded-full",
        "icon-sm": "size-7 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
