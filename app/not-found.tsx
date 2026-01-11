"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export function SearchHandler() {
  const searchParams = useSearchParams();
  const query = searchParams.get("search");
  return <div>Searching for: {query}</div>;
}

export default function NotFound() {
  return (
    <div>
      <h1>Page Not Found</h1>
      {/* This Suspense boundary is required */}
      <Suspense fallback={<div>Loading search...</div>}>
        <SearchHandler />
      </Suspense>
    </div>
  );
}
