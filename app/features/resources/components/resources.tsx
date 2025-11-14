import ResourceCard from '~/components/ui/custom/card'
import type { Resources } from '~/types/resource'
import EmptyResources from './empty'

export default function ResourceView({
  resolvedResources,
}: {
  resolvedResources: Resources
}) {
  if (resolvedResources.count === 0) {
    return <EmptyResources />
  }

  return resolvedResources.data.map((resource) => (
    <ResourceCard
      key={resource.id}
      resource={resource}
    />
  ))
}
