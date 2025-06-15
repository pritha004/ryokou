"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { navLinks } from "@/constants/nav-links";
import Link from "next/link";
import { LogOut, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";

export function AppSidebar({ user }: any) {
  const { open, toggleSidebar } = useSidebar();

  return (
    <>
      <Sidebar collapsible="icon" className="hidden md:flex">
        <SidebarContent className="p-2">
          <SidebarMenu>
            <span className="flex justify-between items-center">
              {open && (
                <span className="flex px-2 items-center text-xl font-playfair py-4">
                  RYOKOU
                </span>
              )}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Menu onClick={toggleSidebar} />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </span>

            {navLinks.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.url}>
                    <item.icon className="h-8 w-8" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-full border-[1px] border-gray-100">
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback className="rounded-full">
                    {user.name
                      .split(" ")
                      .map((n: string) => n.charAt(0).concat())}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <Button
            onClick={async () => redirect("/logout")}
            size="sm"
            className={`mt-2 text-left w-fit bg-transparent text-sm hover:bg-transparent cursor-pointer ${
              !open ? "p-2" : ""
            } text-red-500 `}
          >
            <LogOut size={20} />
            {open && <span className="ml-2">Logout</span>}
          </Button>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <MobileSidebar user={user} />
    </>
  );
}

function MobileSidebar({ user }: any) {
  return (
    <nav className="fixed bottom-0 z-50 flex w-full justify-around items-center border-t bg-black py-2 shadow md:hidden">
      {navLinks.map((item) => (
        <Link
          key={item.title}
          href={item.url}
          className={"flex flex-col items-center text-xs text-gray-100 gap-y-1"}
        >
          <item.icon className="h-6 w-6" />
          <span className="text-[10px]">{item.title}</span>
        </Link>
      ))}
      <DropdownMenu>
        <DropdownMenuTrigger
          className={
            "flex flex-col items-center text-xs text-gray-100 gap-y-1 cursor-pointer"
          }
        >
          <Avatar className="h-6 w-6 rounded-full border-[1px] border-gray-100">
            <AvatarImage src={user.image} alt={user.name} />
            <AvatarFallback className="rounded-full text-[8px]">
              {user.name.split(" ").map((n: string) => n.charAt(0).concat())}
            </AvatarFallback>
          </Avatar>
          <span className="text-[10px]">{user.name}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            <Button
              onClick={async () => redirect("/logout")}
              size="sm"
              className={`mt-2 text-left w-fit bg-transparent text-sm hover:bg-transparent cursor-pointer text-red-500 `}
            >
              <LogOut size={20} />
              <span className="ml-2">Logout</span>
            </Button>
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
