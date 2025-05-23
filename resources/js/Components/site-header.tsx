import { ReactNode } from "react"
import { Separator } from "@/Components/ui/separator"
import { SidebarTrigger } from "@/Components/ui/sidebar"

interface SiteHeaderProps {
  children?: ReactNode
}

export function SiteHeader({ children }: SiteHeaderProps) {
  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4  lg:gap-2 ">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <div className="w-full">{children}</div>
      </div>
    </header>
  )
}
