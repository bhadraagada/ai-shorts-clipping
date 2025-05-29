import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-screen flex-col items-center justify-center overflow-auto">
      <Loader2 className="text-muted-foreground h-10 w-10 animate-spin" />
    </div>
  );
}
