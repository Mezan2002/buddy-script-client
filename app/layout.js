import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const poppins = Poppins({
  weight: ['100', '300', '400', '500', '600', '700', '800'],
  subsets: ["latin"],
});

export const metadata = {
  title: "Buddy Script",
  description: "Social application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/images/logo-copy.svg" />
        {/* Bootstrap */}
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        {/* Common Css */}
        <link rel="stylesheet" href="/assets/css/common.css" />
        {/* Custom Css */}
        <link rel="stylesheet" href="/assets/css/main.css" />
        {/* Responsive Css */}
        <link rel="stylesheet" href="/assets/css/responsive.css" />
      </head>
      <body className={poppins.className}>
        <Providers>
          {children}
        </Providers>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="/assets/js/bootstrap.bundle.min.js"></script>
        {/* Custom js */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="/assets/js/custom.js"></script>
      </body>
    </html>
  );
}
