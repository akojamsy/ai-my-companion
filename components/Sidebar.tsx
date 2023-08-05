"use client";

import { cn } from "@/lib/utils";
import { Home, Plus, Settings } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const Sidebar = () => {
  const pathName = usePathname();
  const router = useRouter();
  const routes = [
    {
      icon: Home,
      href: "/",
      label: "Settings",
      pro: false,
    },
    {
      icon: Plus,
      href: "/companion/new",
      label: "Settings",
      pro: true,
    },
    {
      icon: Settings,
      href: "/settings",
      label: "Settings",
      pro: false,
    },
  ];

  const onNavigate = (url: string, pro: Boolean) => {
    return router.push(url);
  };

  return (
    <div className='space-y-4 flex flex-col h-full text-primary bg-secondary'>
      <div className='p-3 flex flex-1 justify-center'>
        <div className='space-y-2'>
          {routes?.map((route) => (
            <div
              key={route.href}
              onClick={() => onNavigate(route.href, route.pro)}
              className={cn(
                `text-muted-foreground text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition`,
                pathName === route.href && "bg-primary/10 text-primary"
              )}
            >
              <div className='flex flex-col gap-y-2'>
                <route.icon className='h-5 w-5' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
