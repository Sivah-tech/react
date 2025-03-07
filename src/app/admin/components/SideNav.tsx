"use client";
import { useState } from "react";
import { usePathname } from 'next/navigation';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { DashboardActiveIcon, DashboardIcon ,LeadsActiveIcon, LeadsIcon} from "@/utils/svgicons";

const SideNav = () => {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);


  const pathname = usePathname();

  const toggleSidebar = () => { 
    setIsCollapsed(!isCollapsed);
  };
  const isActive = (path: string) => pathname === path ? 'active' : '';
  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push('/');
  }
  return (
    <div className={`sideNav ${isCollapsed ? 'collapsed' : ''} h-[100%] overflo-custom`} >
      <div className="">
        <div className="mb-[40px] ">
              <Link href="/admin/dashboard" className="inline-block">
              <Image
              src="https://thewebmax.org/react/jobzilla/assets/images/skins-logo/logo-skin-2.png"
              alt="About Us"
              width={300}   // Set an appropriate width
              height={300}  // Set an appropriate height
            />
              </Link>
          <button onClick={toggleSidebar} className="hamburgerButton">
          </button>
        </div>
        <ul className="navList">
          <li className={isActive('/admin/dashboard')}>
            <Link href="/admin/dashboard">
              {isActive('/admin/dashboard') ? <DashboardActiveIcon /> : <DashboardIcon />}
              Dashboard
            </Link>
          </li>
          <li className={isActive('/admin/users')}>
            <Link href="/admin/users">
              {isActive('/admin/users') ? <LeadsActiveIcon /> : <LeadsIcon />}
              Users
            </Link>
          </li>
          <li className={isActive('/admin/category')}>
            <Link href="/admin/category">
              {isActive('/admin/category') ? <LeadsActiveIcon /> : <LeadsIcon />}
              Category
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideNav;
