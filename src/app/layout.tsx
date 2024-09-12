import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Box } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";

import "@/styles/globals.css";

import { theme } from "../contexts/theme";
import AuthContextProvider from "@/contexts/AuthContext";
import Copyright from "@/components/Copyright";
import NavBar from "@/components/NavBar";

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
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <AuthContextProvider>
            <body className={inter.className}>
              <NavBar />
              <Box id="main-wrapper">{children}</Box>
              <Copyright />
            </body>
          </AuthContextProvider>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </html>
  );
}
