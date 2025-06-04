import React from "react";
import Link from "next/link";

import Image from "next/image";
import { checkUser } from "@/actions/user";

const Header = async () => {
  const user = await checkUser();

  return (
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
      <nav className="container px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <Image
            src="/images/logo.svg"
            width={50}
            height={50}
            className="h-12 py-1 w-auto object-contain"
            alt="Ryokou Logo"
          />
        </Link>

        <div className="flex items-center space-x-2 lg:space-x-4">
          {user && (
            <>
              <Link href={"/logout"}>Logout</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
