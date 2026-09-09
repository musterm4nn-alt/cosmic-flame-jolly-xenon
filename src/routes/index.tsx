import { AppShell } from "@/components/app-shell";
import { SetupFlow } from "@/components/setup-flow";
import { useXcode } from "@/lib/store";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const phase = useXcode((s) => s.setupPhase);
  if (phase !== "ready") return <SetupFlow />;
  return <AppShell />;
}
