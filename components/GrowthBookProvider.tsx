'use client'

import { useEffect, useState } from 'react'
import { GrowthBookProvider as GBProvider } from '@growthbook/growthbook-react'
import { createGrowthBookInstance, AppFeatures } from '@/lib/growthbook'
import type { GrowthBook } from '@growthbook/growthbook-react'

interface Props {
  children: React.ReactNode
}

export default function GrowthBookProvider({ children }: Props) {
  const [growthbook, setGrowthbook] = useState<GrowthBook<AppFeatures> | null>(null)

  useEffect(() => {
    // Create GrowthBook instance on the client side only
    const gb = createGrowthBookInstance()

    // Load features from GrowthBook
    gb.init({ streaming: true }).then(() => {
      setGrowthbook(gb)
    })

    // Cleanup on unmount
    return () => {
      gb.destroy()
    }
  }, [])

  // Render children even while loading - feature flags will default to false
  if (!growthbook) {
    return <>{children}</>
  }

  return (
    <GBProvider growthbook={growthbook}>
      {children}
    </GBProvider>
  )
}
