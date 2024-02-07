import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

// Components
import Navbar from "./components/navbar/Navbar";
// import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/modals/RegisterModal";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AirBnB",
  description: "AirBnB Clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        {/* <ClientOnly> */}
        <Toaster />
        <RegisterModal />
        <Navbar />
        {/* </ClientOnly> */}
        {children}
      </body>
    </html>
  );
}
