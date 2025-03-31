// import next
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

// import styles
import "./globals.css";

// import components
import Header from "./_components/header/header";
import Footer from "./_components/footer/footer";
import Container from "./_components/container/container";

//import context
import { TimerProvider } from "./_context/timerContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Study Buddy",
  description: "Your best pal to keep track of studying time",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-100 text-zinc-900 min-h-screen`}
      >
        <TimerProvider>
          <Container>
            <Header />
            {children}
            <Footer />
          </Container>
        </TimerProvider>
      </body>
    </html>
  );
}
