import React from "react";
import { Sidebar } from "./Sidebar";
import { useRouter } from "next/router";

const routesWithoutSidebar = ["/other"];

export function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  if (routesWithoutSidebar.includes(router.pathname)) {
    return <main>{children}</main>;
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full">{children}</main>
    </div>
  );
}
