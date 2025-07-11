import {
  BlockGameIcon,
  BlueskyIcon,
  BookOpen01Icon,
  GeometricShapes01Icon,
  Github01Icon,
  Home13Icon
} from '@hugeicons/core-free-icons'
import { Link } from '@inertiajs/react'
import { NavFooter } from '@/components/nav-footer'
import { NavMain } from '@/components/nav-main'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import type { NavItem } from '@/types'
import AppLogo from './app-logo'

const mainNavItems: NavItem[] = [
  {
    title: 'Home',
    href: '/dashboard',
    icon: Home13Icon
  },
  {
    title: 'Getting Started',
    href: '/dashboard',
    icon: BookOpen01Icon
  },
  {
    title: 'Components',
    href: '/dashboard',
    icon: GeometricShapes01Icon
  },
  {
    title: 'Blocks',
    href: '/dashboard',
    icon: BlockGameIcon
  }
]

const footerNavItems: NavItem[] = [
  {
    title: 'Github',
    href: 'https://github.com/twiceware-cloud/ui',
    icon: Github01Icon
  },
  {
    title: 'Bluesky',
    href: 'https://bsky.app/profile/ui.twiceware.cloud',
    icon: BlueskyIcon
  }
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard" prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={mainNavItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavFooter items={footerNavItems} className="mt-auto" />
      </SidebarFooter>
    </Sidebar>
  )
}
