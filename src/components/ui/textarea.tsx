import * as React from "react";

import { cn } from "./utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  const ref = React.useRef<HTMLTextAreaElement>(null);
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        // Improved contrast for dark mode
        "text-foreground",
        "dark:text-white dark:placeholder:text-white/50",
        // Autofill styles
        "[&:-webkit-autofill]:!bg-background [&:-webkit-autofill]:!text-black dark:[&:-webkit-autofill]:!text-white",
        "[&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_hsl(var(--background))]",
        "[&:-webkit-autofill:hover]:shadow-[inset_0_0_0px_1000px_hsl(var(--background))]",
        "[&:-webkit-autofill:focus]:shadow-[inset_0_0_0px_1000px_hsl(var(--background))]",
        "[&:-webkit-autofill]:[-webkit-text-fill-color:black] dark:[&:-webkit-autofill]:[-webkit-text-fill-color:white]",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
}

export { Textarea };