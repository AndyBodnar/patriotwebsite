import type { Metadata } from "next";
import "./globals.css";
import Analytics from "@/components/Analytics";
import VisitorTracker from "@/components/VisitorTracker";
import { AuthProvider } from "@/contexts/AuthContext";
import { APIConnectionsProvider } from "@/contexts/APIConnectionsContext";

export const metadata: Metadata = {
  title: "Patriot Disposal Phoenix | Premium Waste Management Services",
  description: "Professional waste disposal and dumpster rental services in Phoenix. Rising above the competition with reliable, efficient service.",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Patriot Disposal',
  },
  formatDetection: {
    telephone: true,
    date: false,
    email: true,
    address: true,
  },
  themeColor: '#1A2B4A',
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
          <APIConnectionsProvider>
            <Analytics />
            <VisitorTracker />
            {children}
          </APIConnectionsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
