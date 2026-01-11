import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-md">
      <div className="absolute h-[300px] w-[300px] rounded-full bg-orange-500/10 blur-[100px]" />

      <div className="relative flex flex-col items-center">
        <div className="relative mb-6">
          <div className="absolute inset-0 animate-ping rounded-full bg-orange-500/20" />

          <div className="relative rounded-2xl bg-gradient-to-b from-orange-400 to-orange-600 p-4 shadow-xl shadow-orange-500/20">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-lg font-medium tracking-tight text-foreground">
            Updating your view
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            This will only take a moment...
          </p>
        </div>

        <div className="mt-8 flex gap-1.5">
          <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-orange-500 [animation-delay:-0.3s]" />
          <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-orange-500 [animation-delay:-0.15s]" />
          <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-orange-500" />
        </div>
      </div>
    </div>
  );
}
