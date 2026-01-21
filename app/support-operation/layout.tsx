import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../globals.css";

import DashboardLayout from "@/components/ComponentsLayout";
import TanStackProvider from "@/components/TanStackProvider";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard area",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <TanStackProvider>
      <div className={`${roboto.variable} antialiased flex w-full`}>
        <DashboardLayout>{children}</DashboardLayout>
      </div>
    </TanStackProvider>
  );
}
