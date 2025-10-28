import type { Metadata } from "next";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
