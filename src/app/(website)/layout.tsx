'use client';
import "@/app/globals.css";
import { Antic_Didone } from "next/font/google";
import Header from "@/app/(website)/components/Header";
import localFont from 'next/font/local'
import { usePathname } from 'next/navigation';



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const hideFooterRoutes = ['/login', '/forgotpassword', '/resetpassword', '/signup', '/admin'];

  return (
    <html lang="en">
      <body className={`test`}>
        <Header />
        {children}
        {!hideFooterRoutes.includes(pathname)}
      </body>
    </html>
  );
}
