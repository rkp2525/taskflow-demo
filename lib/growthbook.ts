import { GrowthBook } from '@growthbook/growthbook-react'

// Feature flag types for type safety
export interface AppFeatures {
  'demo-controls-enabled': boolean
}

// Create and configure the GrowthBook instance
export function createGrowthBookInstance(): GrowthBook<AppFeatures> {
  return new GrowthBook<AppFeatures>({
    apiHost: 'https://cdn.growthbook.io',
    clientKey: process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY || '',
    enableDevMode: process.env.NODE_ENV === 'development',
    // Disable streaming for simpler setup
    backgroundSync: true,
    subscribeToChanges: true,
  })
}

// Default feature values (used when GrowthBook is loading or unavailable)
export const defaultFeatures: AppFeatures = {
  'demo-controls-enabled': false,
}
