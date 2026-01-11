import CompaniesPage from "@/components/CRM/Company/CompanyGrid";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CompaniesPage />
    </Suspense>
  );
};

export default page;
