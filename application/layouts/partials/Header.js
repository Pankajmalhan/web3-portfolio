import Logo from "@components/Logo";
import menu from "@config/menu.json";
import socical from "@config/social.json";
import Social from "@layouts/components/Social";
import ThemeSwitcher from "@layouts/components/ThemeSwitcher";
import SearchModal from "@partials/SearchModal";
import { ConnectWallet } from "@thirdweb-dev/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";

const Header = ({ isAdmin, linkedin, github, email,phone }) => {
  // distructuring the main menu from menu object
  const [showMenu, setShowMenu] = useState(false);

  // Router
  const router = useRouter();

  //stop scrolling when nav is open
  useEffect(() => {
    if (showMenu) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  }, [showMenu]);


  return (
    <header className="header">
      <nav className="navbar container px-1 sm:px-8">
        <div className="order-0">
          <Logo />
        </div>
        <div className="flex items-center space-x-4 xl:space-x-8">
          <div
            className={`collapse-menu ${!showMenu && "translate-x-full"
              } lg:flex lg:translate-x-0`}
          >
            <button
              className="absolute right-6 top-11 lg:hidden"
              onClick={() => setShowMenu(false)}
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                <title>Menu Close</title>
                <polygon
                  points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
                  transform="rotate(45 10 10)"
                />
              </svg>
            </button>
            {/* header social */}
            {!isAdmin && (<Social source={{ linkedin, github, email,phone }} className="socials" />)}
            {isAdmin && <ConnectWallet
              theme="light"
              modalTitle="Login"
              btnTitle="Connect Wallet" />}
          </div>
          {/* Header search */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white lg:hidden"
          >
            {showMenu ? (
              <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                <title>Menu Close</title>
                <polygon
                  points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
                  transform="rotate(45 10 10)"
                />
              </svg>
            ) : (
              <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                <title>Menu Open</title>
                <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z" />
              </svg>
            )}
          </button>
        </div>
      </nav>
      {showMenu && (
        <div className="header-backdrop absolute top-0 left-0 h-[100vh] w-full bg-black/50 lg:hidden"></div>
      )}
    </header>
  );
};

export default Header;
