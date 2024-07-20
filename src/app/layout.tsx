import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CssBaseline, Container } from "@mui/material";
import "./globals.css";

import Copyright from "@/components/Copyright";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Whiskey Night",
  description: "Made for fun",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CssBaseline />
        <Container
          id="main-wrapper"
          sx={{ flex: 1}}
        >
          {children}
        </Container>
        <Copyright />
      </body>
    </html>
  );
}
