"use client";
import Link from 'next/link';
import { useState } from 'react';
import Image from "next/image";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'; // Import useRouter outside the function

const Header = () => {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const { data: session } = useSession();  // Check if there's an active session
  const router = useRouter(); // Use useRouter here at the top level of the component

  const handleToggleOpen = () => {
    setIsToggleOpen(!isToggleOpen);
  };

  const handleToggleClose = () => {
    setIsToggleOpen(false);
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });  // Sign out without redirecting
    router.push('/');  // Redirect to home page after logout
  };

  return (
    <div>
      <div className="nav-container w-full max-w-[1260px] mx-auto flex items-center justify-between pt-5 px-[15px]  md:px-[25px]">
        <div className="nav_logo">
          <Link href="/" className="nav-logo-link">
            <Image
              src="https://thewebmax.org/react/jobzilla/assets/images/skins-logo/logo-skin-2.png"
              alt="About Us"
              width={300}   // Set an appropriate width
              height={300}  // Set an appropriate height
            />
          </Link>
        </div>
        <ul className={`nav-menu ${isToggleOpen ? 'open' : ''}`}>
          <button className="close-btn lg:hidden" onClick={handleToggleClose}>close</button>
          <li>
            <Link href="/" className="nav-menu-list">Home</Link>
          </li>
          <li>
            <Link href="/about" className="nav-menu-list">About</Link>
          </li>
          <li>
            <Link href="/faq" className="nav-menu-list">FAQ</Link>
          </li>
          <li>
            <Link href="/productpage" className="nav-menu-list">product page</Link>
          </li>

          {/* Conditionally render the Login or Logout button */}
          {!session ? (
            <li>
              <Link href="/login" className="nav-menu-list lg:!inline-block lg:text-sm lg:text-white lg:bg-[#283C63] rounded-[30px] lg:!px-[30px] !py-[13px]">Login</Link>
            </li>
          ) : (
            <li>
              <a onClick={handleLogout} style={{ cursor: 'pointer' }}>
                <span className="text-[#283C63] text-[600]">Log Out</span>
              </a>
            </li>
          )}
        </ul>

        <p className="menuToggleBtn lg:hidden" onClick={handleToggleOpen}>open</p>
      </div>
    </div>
  );
};

export default Header;
