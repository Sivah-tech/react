import type { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import "../globals.css";
import Header from "./components/Header";  
import AdminMobileHeader from "./components/AdminMobileHeader";
import SideNav from "./components/SideNav";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard for application management",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  
  // Redirect to login if not authenticated
  if (!session) {
    redirect("/");
  }
  
  // Check if user has admin role
  const isAdmin = (session?.user as any)?.role === 'admin';
  
  if (!isAdmin) {
    return (
      <>
        <div className="p-3 bg-black h-screen text-white flex items-center justify-center flex-col">
          <p className="mb-4">You are not authorized to view this page</p>
          <Link href="/" className="p-3 text-black bg-white rounded hover:bg-gray-200 transition-colors">
            Return to Login
          </Link>
        </div>
      </>
    );
  }
  
  return (
    <>
      <div className="w-full lg:h-screen lg:flex-row lg:overflow-hidden">
        <div className="flex-none hidden h-[100vh] lg:block float-left w-[250px]">
          <SideNav />
        </div>
        <div className="w-full lg:hidden">
          <AdminMobileHeader />
        </div>
        <div className="float-left w-full lg:w-[calc(100%-250px)]">
          <Header />
          <main className="p-[15px] lg:h-[calc(100vh-116px)] pb-10 overflow-auto lg:pb-10 lg:px-[25px]">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}