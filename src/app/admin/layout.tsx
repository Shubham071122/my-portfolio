import { Sidebar } from "@/components/admin/sidebar";
import { Header } from "@/components/admin/header";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";
import "../globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

import { ToasterProvider } from "@/components/toaster-provider";
import { cookies } from "next/headers";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = cookies().get("auth_token")?.value;
  const isAuthPage = !token;

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <TooltipProvider delayDuration={0}>
            <ToasterProvider />
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
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
