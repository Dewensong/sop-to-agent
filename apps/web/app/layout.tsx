import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SOPilot | SOP to Agent Workflow Generator",
  description: "Turn messy business SOPs into structured, reviewable AI agent workflow specs."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
