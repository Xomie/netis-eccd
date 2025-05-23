import * as React from "react"
import {
  LayoutDashboardIcon,
  SettingsIcon,
  User,
  User2Icon,
} from "lucide-react"

import { NavMain } from "@/Components/nav-main"
import { NavSecondary } from "@/Components/nav-secondary"
import { NavUser } from "@/Components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/Components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    // {
    //   title: "Analytics",
    //   url: "#",
    //   icon: BarChartIcon,
    // },
    {
      title: "NETIS-ECCD",
      url: "/netis",
      icon: User2Icon,
    },

    
  ],

   navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: SettingsIcon,
    },
    // {
    //   title: "Get Help",
    //   url: "#",
    //   icon: HelpCircleIcon,
    // },
    // {
    //   title: "Search",
    //   url: "#",
    //   icon: SearchIcon,
    // },
  ],

}

type User = {
  id: number
  name: string
  email: string
  avatar?: string
}


export function AppSidebar({ user,...props }: React.ComponentProps<typeof Sidebar> & {user: User}) {
  console.log(user);
  
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <img src="/logo/netis-logo.png" className="h-5 w-5" />
                <span className="text-base font-semibold">NETIS ECCD.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.documents} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
