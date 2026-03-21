import { Sidebar } from "@/components/admin/sidebar";
import { Header } from "@/components/admin/header";
import { cookies } from "next/headers";
import React from "react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = cookies().get("auth_token")?.value;
  const isAuthPage = !token;

  return (
    <>
      {isAuthPage ? (
        <main className="min-h-screen flex items-center justify-center bg-muted/30">
          {children}
        </main>
      ) : (
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <Header />
            <main className="p-6">
              {children}
            </main>
          </div>
        </div>
      )}
    </>
  );
}
