import { FolderLock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useActiveSession, useXcode } from "@/lib/store";

export function PermissionDialog({
  open,
  onOpenChange,
  onAllow,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onAllow: () => void;
}) {
  const session = useActiveSession();
  const setGranted = useXcode((s) => s.setFolderGranted);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent title="Agent permission">
        <div className="flex gap-3">
          <span className="glass-chip flex size-10 shrink-0 items-center justify-center rounded-full text-muted">
            <FolderLock className="size-5" />
          </span>
          <div>
            <p className="text-sm leading-relaxed text-fg">
              Grok wants to read and edit files in this working directory.
            </p>
            <p className="glass-well mt-2 rounded-md px-2.5 py-1.5 font-mono text-xs text-muted">
              {session?.cwd}
            </p>
            <p className="mt-2 text-xs text-subtle">
              This is the ACP request_permission surface. Always-approve skips it.
            </p>
          </div>
        </div>
        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Deny
          </Button>
          <Button
            onClick={() => {
              setGranted(true);
              onOpenChange(false);
              onAllow();
            }}
          >
            Allow this folder
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
