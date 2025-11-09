import type { Metadata } from "next";
import "./globals.css";
import Analytics from "@/components/Analytics";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: "Patriot Disposal Phoenix | Premium Waste Management Services",
  description: "Professional waste disposal and dumpster rental services in Phoenix. Rising above the competition with reliable, efficient service.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          <Analytics />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
