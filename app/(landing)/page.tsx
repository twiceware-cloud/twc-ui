import { Footer, Topbar } from '@/components/docs/layouts'
import { Newsletter } from '@/components/docs/newsletter'

import { Demo } from './components/demo'
import { Feature } from './components/feature'
import { Hero } from './components/hero'

export default function LandingPage() {
  return (
    <div>
      <div className="sticky top-0 z-10 border-b border-dashed bg-background/90 backdrop-blur-md">
        <div className="container-wrapper max-2xl:!px-4 h-16">
          <Topbar showLogo />
        </div>
      </div>
      <div className="overflow-hidden">
        <div className="container-wrapper max-2xl:!px-4">
          <Hero />
          <Feature />
          <Demo />
        </div>
      </div>
      <div className="sticky top-0 z-10 border-t border-dashed bg-background/90">
        <Footer className="container-wrapper" />
      </div>
    </div>
  )
}
