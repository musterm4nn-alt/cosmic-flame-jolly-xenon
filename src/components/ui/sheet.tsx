import type { ReactNode } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const Sheet = DialogPrimitive.Root;

export function SheetContent({
  className,
  children,
  title,
  side = "left",
}: {
  className?: string;
  children: ReactNode;
  title: string;
  side?: "left" | "right";
}) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-desktop/45 backdrop-blur-md" />
      <DialogPrimitive.Content
        className={cn(
          "glass-panel fixed inset-y-3 z-50 flex w-full max-w-xs flex-col overflow-hidden rounded-xl",
          side === "left" ? "left-3" : "right-3",
          className,
        )}
      >
        <div className="flex h-12 items-center justify-between px-3">
          <DialogPrimitive.Title className="text-sm font-medium">{title}</DialogPrimitive.Title>
          <DialogPrimitive.Close asChild>
            <Button variant="ghost" size="icon-sm" aria-label="Close">
              <X />
            </Button>
          </DialogPrimitive.Close>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
