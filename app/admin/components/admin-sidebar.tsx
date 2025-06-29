"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  TrendingUp,
  ImageIcon,
  Flag,
  Shield,
  Settings,
  ChevronDown,
  LogOut,
  Megaphone,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/context/auth-context"

interface AdminSidebarProps {
  userRole: string | null
}

export default function AdminSidebar({ userRole }: AdminSidebarProps) {
  const pathname = usePathname()
  const { signOut } = useAuth()
  const [collapsed, setCollapsed] = useState(false)

  const isSuperAdmin = userRole === "super_admin"

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Investments",
      href: "/admin/investments",
      icon: <TrendingUp className="h-5 w-5" />,
    },
    {
      name: "Users",
      href: "/admin/users",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "Announcements",
      href: "/admin/announcements",
      icon: <Megaphone className="h-5 w-5" />,
      roles: ["admin", "super_admin"],
    },
    {
      name: "Media",
      href: "/admin/media",
      icon: <ImageIcon className="h-5 w-5" />,
    },
    {
      name: "Reports & Flags",
      href: "/admin/reports",
      icon: <Flag className="h-5 w-5" />,
    },
    {
      name: "Admin Management",
      href: "/admin/admin-management",
      icon: <Shield className="h-5 w-5" />,
      superAdminOnly: true,
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <aside
      className={cn(
        "bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300",
        collapsed ? "w-20" : "w-64",
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <Link href="/admin" className="flex items-center">
            {!collapsed && <span className="text-xl font-bold text-gray-800 dark:text-white">Centace Admin</span>}
            {collapsed && <span className="text-xl font-bold text-gray-800 dark:text-white">CA</span>}
          </Link>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ChevronDown className={cn("h-5 w-5 transition-transform", collapsed ? "rotate-90" : "rotate-270")} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => {
              if (item.superAdminOnly && !isSuperAdmin) return null

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
                      pathname === item.href && "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
                    )}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {!collapsed && <span>{item.name}</span>}
                    {item.superAdminOnly && !collapsed && (
                      <span className="ml-2 text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded-full">
                        🔒
                      </span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => signOut()}
            className="flex items-center w-full px-4 py-2 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <LogOut className="h-5 w-5 mr-3" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  )
}
