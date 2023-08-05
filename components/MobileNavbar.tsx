"use client";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./Sidebar";

const MobileNavbar = () => {
  return (
    <Sheet>
      <SheetTrigger className='block md:hidden'>
        <Menu />
      </SheetTrigger>
      <SheetContent className='p-0 bg-secondary pt-10 w-32' side='left'>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;
