"use client";
import { useState } from "react";
import { usePathname } from 'next/navigation';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { DashboardActiveIcon, DashboardIcon } from "@/utils/svgicons";

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
              <Link href="/user/dashboard" className="inline-block">
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
          <li className={isActive('/user/dashboard')}>
            <Link href="/user/dashboard">
              {isActive('/user/dashboard') ? <DashboardActiveIcon /> : <DashboardIcon />}
              Dashboard
            </Link>
          </li>
          {/* <li className={isActive('/leads')}>
            <Link href="/leads">
              {isActive('/leads') ? <LeadsActiveIcon /> : <LeadsIcon />}
              Leads
            </Link>
          </li>
          <li className={isActive('/target')}>
            <Link href="/target">
              {isActive('/target') ? <TargetActiveIcon /> : <TargetIcon />}
             Target
            </Link>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default SideNav;
