'use client'

import { useFeatureIsOn } from '@growthbook/growthbook-react'
import { AppFeatures, defaultFeatures } from '@/lib/growthbook'

/**
 * Hook to check if a feature flag is enabled
 * Returns false while GrowthBook is loading or if the flag is not set
 */
export function useFeatureFlag<K extends keyof AppFeatures>(
  flagKey: K
): boolean {
  const isOn = useFeatureIsOn(flagKey as string)

  // Return the GrowthBook value, falling back to default if not available
  return isOn ?? defaultFeatures[flagKey]
}

/**
 * Convenience hook specifically for demo controls
 */
export function useDemoControlsEnabled(): boolean {
  return useFeatureFlag('demo-controls-enabled')
}
