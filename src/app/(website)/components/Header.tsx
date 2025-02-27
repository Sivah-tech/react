"use client";
import Link from 'next/link';
import { useState } from 'react';
import logo from "@/assets/logo.png";
import Image from "next/image";

const Header = () => {
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  const handleToggleOpen = () => {
    setIsToggleOpen(!isToggleOpen);
  };

  const handleToggleClose = () => {
    setIsToggleOpen(false);
  };

  const iconstyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "12px",
    color: "#fff",
  };

  return (
    <div>
      <div className='nav-container w-full max-w-[1260px] mx-auto flex items-center justify-between pt-5 px-[15px]  md:px-[25px]'>
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
          <button className="close-btn lg:hidden" onClick={handleToggleClose}>

          </button>
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
            <Link href="/login" className="nav-menu-list lg:!inline-block lg:text-sm lg:text-white lg:bg-[#283C63] rounded-[30px] lg:!px-[30px] !py-[13px]">Login</Link>
          </li>
        </ul>

        <p className="menuToggleBtn lg:hidden" onClick={handleToggleOpen}>

        </p>
      </div>
    </div>
  );
};

export default Header;
