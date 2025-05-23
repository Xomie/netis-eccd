import { MailIcon, PlusCircleIcon, UserCircle, type LucideIcon } from "lucide-react"

import { Button } from "@/Components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/Components/ui/sidebar"
import { Link, router } from "@inertiajs/react"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
  }[]
}) {
  const handlequickCreate = () => {
    localStorage.setItem('open', JSON.stringify(true)); // Store as a string
    router.visit('/netis');
  };

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <button onClick={() => handlequickCreate()} className="w-full">
              <SidebarMenuButton
                tooltip="Quick Create"
                className="min-w-8 bg-sky-700 text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
              >
                <PlusCircleIcon />
                <span>Quick Create</span>
              </SidebarMenuButton>
            </button>
            <Button
              size="icon"
              className="h-9 w-9 bg-green-700 text-zinc-100 hover:bg-green-600 hover:text-white shrink-0 group-data-[collapsible=icon]:opacity-0"
              variant="outline"
            >
              <UserCircle />
              <span className="sr-only">Inbox</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <Link href={item.url} className="flex justify-between gap-x-2 items-center">
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon className="h-5 w-5" />}
                  {item.title}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
