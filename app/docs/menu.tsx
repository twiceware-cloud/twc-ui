import { BookOpenTextIcon, ShapesIcon } from 'lucide-react'

import type { SidebarNavItem } from '@/components/docs/layouts'
import { routes } from '@/lib/docs'
import { GeometricShapes01Icon, BookOpen01Icon, WebhookIcon } from '@hugeicons/core-free-icons'

const base = routes.docs

const components = base.components.base

export const docsComponentNavItems: SidebarNavItem[] = [
  {
    title: 'Forms',
    isLabel: true
  },
  {
    title: 'Reveal Text',
    href: `${components}/reveal-text`
  },
  {
    title: 'Scramble Text',
    href: `${components}/scramble-text`
  },
  {
    title: 'Distort Text',
    href: `${components}/distort-text`
  },
  {
    title: 'Squash Text',
    href: `${components}/squash-text`
  },
  {
    title: 'Bouncing Text',
    href: `${components}/bouncing-text`
  },
  {
    title: 'Buttons',
    isLabel: true
  },
  {
    title: 'Mouse Wave Text',
    href: `${components}/mouse-wave-text`
  },
  {
    title: 'Reveal on Scroll',
    href: `${components}/reveal-on-scroll`
  },
  {
    title: 'Stagger on Scroll',
    href: `${components}/stagger-on-scroll`
  },
  {
    title: 'Date + Time',
    isLabel: true
  },
  {
    title: 'Calendar',
    href: `${components}/calendar`
  },
  {
    title: 'Navigation',
    isLabel: true
  },
  {
    title: 'Text Fall Button',
    href: `${components}/text-fall-button`
  },
  {
    title: 'Spring Button',
    href: `${components}/spring-button`
  },
  {
    title: 'Overlays',
    isLabel: true
  },
  {
    title: 'Draw Line Text',
    href: `${components}/draw-line-text`
  },
  {
    title: 'Tilt Card',
    href: `${components}/tilt-card`
  },
  {
    title: 'Flip Reveal',
    href: `${components}/flip-reveal`
  }
]

export const docsSidebarNavItems: SidebarNavItem[] = [
  {
    title: 'Getting Started',
    icon: BookOpen01Icon,
    expanded: true,
    items: [
      {
        title: 'Introduction',
        href: base.home
      },
      {
        title: 'Installation',
        href: base.installation
      }
    ]
  },
  {
    title: 'Components',
    icon: GeometricShapes01Icon,
    expanded: true,
    items: docsComponentNavItems
  },
  {
    title: 'Hooks',
    icon: WebhookIcon,
    expanded: true,
    items: [
      {
        title: 'useForm',
        href: base.home
      }
    ]
  }
]
