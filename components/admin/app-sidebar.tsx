"use client"

import * as React from "react"
import {
  Briefcase,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  MonitorPlay,
  User,
  Wrench,
  ExternalLink
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { createClient } from "@/lib/client"

const navItems = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Projetos",
    url: "/admin/projects",
    icon: MonitorPlay,
  },
  {
    title: "Experiências",
    url: "/admin/experiences",
    icon: Briefcase,
  },
  {
    title: "Formação",
    url: "/admin/education",
    icon: GraduationCap,
  },
  {
    title: "Tecnologias",
    url: "/admin/technologies",
    icon: Wrench,
  },
  {
    title: "Perfil",
    url: "/admin/profile",
    icon: User,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader className="h-16 border-b flex items-center justify-center px-4">
        <h2 className="text-lg font-bold">Admin CMS</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="mt-4 gap-2 px-2">
          {navItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={pathname === item.url || (item.url !== "/admin" && pathname.startsWith(item.url))}>
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/" target="_blank">
                <ExternalLink />
                <span>Ver portfólio</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout}>
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
