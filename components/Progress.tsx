"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import nProgress from "nprogress";

const triggerNavigationStart = () => {
  const event = new CustomEvent("app-navigation-start");
  window.dispatchEvent(event);
};

export function LoadingBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // 1. Handle Navigation Finish (Pathname change)
  useEffect(() => {
    if (loading) {
      setTimeout(() => setProgress(100), 0);
      const timer = setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    const startLoading = () => {
      setLoading(true);
      setProgress(10);
    };

    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLAnchorElement;
      const anchor = target.closest("a");
      if (
        anchor &&
        anchor.href &&
        anchor.href.startsWith(window.location.origin)
      ) {
        if (anchor.href !== window.location.href && !anchor.target) {
          startLoading();
        }
      }
    };

    window.addEventListener("click", handleAnchorClick);
    window.addEventListener("app-navigation-start", startLoading); // Catch router.push

    return () => {
      window.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("app-navigation-start", startLoading);
    };
  }, []);

  if (!loading && progress === 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] transition-all">
      <Progress
        value={progress}
        className="h-1 w-full rounded-none bg-transparent [&>div]:bg-orange-500"
      />
    </div>
  );
}
