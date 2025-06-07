'use client'

import { MenuIcon, MilestoneIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { ClassNameValue } from 'tailwind-merge'
import { Drawer } from 'vaul'
import { HugeiconsIcon } from '@hugeicons/react'
import { Github01Icon, BlueskyIcon } from '@hugeicons/core-free-icons'

import { Sidebar, type SidebarNavItem } from '@/components/docs/layouts'
import { Logo } from '@/components/docs/logo'
import { Button } from '@/components/ui/button'
import { routes } from '@/lib/docs'
import { cn } from '@/lib/utils'

import { ThemeModeToggle } from '../theme-mode-toggle'

type TopbarProps = {
  menuItems?: SidebarNavItem[]
  className?: ClassNameValue
  showLogo?: boolean
}

export const Topbar = ({ menuItems = [], className, showLogo = false }: TopbarProps) => {
  const [openDrawer, setOpenDrawer] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setOpenDrawer(false)
  }, [pathname])

  const items: SidebarNavItem[] = [
    {
      title: 'Navigation',
      icon: <MilestoneIcon />,
      expanded: true,
      items: [
        {
          title: 'Components',
          href: routes.docs.components.base
        },
        {
          title: 'Blocks',
          href: routes.blocks.base
        }
      ]
    },
    ...menuItems
  ]

  return (
    <div className={cn('flex h-full items-center justify-between', className)}>
      <div className="flex items-center gap-2 md:gap-8">
        <Drawer.Root direction="left" open={openDrawer} onOpenChange={setOpenDrawer}>
          <Drawer.Trigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="cursor-pointer md:hidden"
              aria-label="Leftmenu toggle"
            >
              <MenuIcon className="!size-5" />
            </Button>
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 z-99 bg-black/40" />
            <Drawer.Content className="fixed start-2 top-2 bottom-2 z-100 outline-none">
              <Drawer.Title hidden>Hidden</Drawer.Title>
              <Sidebar items={items} className="w-64 rounded bg-background" />
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
        {showLogo && (
          <Link href={routes.landing} className="max-md:hidden">
            <Logo />
          </Link>
        )}
        <div className="hidden gap-2 md:inline-flex md:gap-6">
          <Link
            className={cn('text-[15px] text-foreground/80 transition-all hover:text-foreground', {
              'font-medium text-foreground': pathname.includes('docs')
            })}
            href={routes.docs.components.base}
          >
            Components
          </Link>
          <Link
            className={cn(
              'flex items-center gap-1.5 text-[15px] text-foreground/80 transition-all hover:text-foreground',
              {
                'font-medium text-foreground': pathname.includes('blocks')
              }
            )}
            href={routes.blocks.base}
          >
            Blocks
          </Link>
        </div>
      </div>
      <div className="flex items-center">
        <Button variant={'ghost'} size="icon" asChild aria-label="Bluesky">
          <Link href={routes.external.bluesky} target="_blank">
            <HugeiconsIcon icon={BlueskyIcon} className="!size-5" />
          </Link>
        </Button>
        <Button variant={'ghost'} size="icon" asChild aria-label="GitHub">
          <Link href={routes.external.github} target="_blank">
            <HugeiconsIcon icon={Github01Icon} className="!size-5" />
          </Link>
        </Button>
        <hr className="mx-1 h-8 border-e border-dashed" />
        <ThemeModeToggle />
      </div>
    </div>
  )
}
