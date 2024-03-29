import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

// Components
import Navbar from "./components/navbar/Navbar";
// import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/modals/RegisterModal";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./components/modals/RentModal";
import SearchModal from "./components/modals/SearchModal";
import { Suspense } from "react";
import Loader from "./components/shared/Loader";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AiryBnB",
  description: "AiryBnB - Airbnb styled site",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        {/* <ClientOnly> */}
        <Toaster />
        <RegisterModal />
        <LoginModal />
        <Suspense fallback={<Loader></Loader>}>
          <SearchModal />
          <Navbar user={currentUser} />
        </Suspense>
        <RentModal />
        <div className="pb-20 pt-28">{children}</div>

        {/* </ClientOnly> */}
      </body>
    </html>
  );
}
