import { parseAsString, createLoader } from 'nuqs/server'

// Describe your search params, and reuse this in useQueryStates / createSerializer:
export const resourceSearchParams = {
  name: parseAsString.withDefault(''),
}

export const loadSearchParams = createLoader(resourceSearchParams)
