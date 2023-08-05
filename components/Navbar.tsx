import React from "react";
import { Menu, Sparkles } from "lucide-react";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import MobileNavbar from "./MobileNavbar";

const font = Poppins({
  weight: "600",
  subsets: ["latin"],
});

const Navbar = () => {
  return (
    <div className='fixed w-full h-16 z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary'>
      <div className='flex items-center'>
        {/* <BiMenu /> */}
        <MobileNavbar />
        <Link href='/'>
          <h1
            className={cn(
              "hidden md:block text-xl md:text-3xl font-bold text-primary",
              font.className
            )}
          >
            Ai<span className='text-pink-500'>K</span>o
          </h1>
        </Link>
      </div>
      <div className='flex items-center gap-x-3'>
        <Button variant='prenium' size='sm'>
          Upgrade <Sparkles className='h-4 w-4 fill-white text-white' />
        </Button>
        <ModeToggle />
        <UserButton afterSignOutUrl='/' />
      </div>
    </div>
  );
};

export default Navbar;
