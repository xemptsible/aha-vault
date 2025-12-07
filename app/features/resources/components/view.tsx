import type { ApiGetAll } from '~/types/_generic'
import type { Resource } from '~/types/resource'
import ResourceCard from './card'
import EmptyResourceView from './empty'

export default function ResourceView({
  resolvedResources,
}: {
  resolvedResources: ApiGetAll<Resource>
}) {
  if (resolvedResources.count === 0) {
    return <EmptyResourceView />
  }

  return resolvedResources.data.map((resource) => (
    <ResourceCard
      key={resource.id}
      resource={resource}
    />
  ))
}
