import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import Header from "../components/header";
import { Toaster } from "../components/ui/sonner";
import { ThemeProvider } from "./../components/theme-provider.jsx";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Sansai – AI Career Coach",
  description:
    "AI-powered platform to build resumes, track skills, and prepare for interviews. Built by Darshan.",
  openGraph: {
    title: "Sansai – AI Career Coach",
    description:
      "AI-powered platform to build resumes, track skills, and prepare for interviews. Built by Darshan.",
    url: "https://sansai-ten.vercel.app",
    siteName: "Sansai",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "Sansai Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sansai – AI Career Coach",
    description: "AI-powered platform for resume building and interview prep.",
    images: ["/preview.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{ baseTheme: "dark" }}>
      <html lang="en" suppressHydrationWarning>
        <body className={` ${inter.className} `}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {/* header */}
            <Header />
            <main className="min-h-screen">{children}</main>
            <Toaster richColors />
            {/* footer */}
            <footer className="bg-muted/50 py-12">
              <div className="container mx-auto px-4 text-center text-gray-200">
                <p>Made with ❤️ by WebExperts</p>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
