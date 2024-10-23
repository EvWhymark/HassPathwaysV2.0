import "./globals.css";
import "./components.css";
import "./typography.css";
import { Inter } from "next/font/google";
import AppContextProvider from "./contexts/appContext/AppProvider";
import { ReactNode } from "react";
import { clsx } from "clsx";
import { cn } from "./lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HASSPathways",
  description: "Here you can explore the different pathways RPI has to offer.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <AppContextProvider>
        <body className={inter.className}>
          <div className="max-w-screen-4xl mx-auto">{children}</div>
        </body>
      </AppContextProvider>
    </html>
  );
}
