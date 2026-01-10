import DomainWorkspace from "@/components/DomainWorkspace/DomainWorkspaceDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Domain Workspace - Ramworks",
  description: "This is domain workspace page for ramworks",
};
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {" "}
      <DomainWorkspace />
    </Suspense>
  );
};

export default page;
