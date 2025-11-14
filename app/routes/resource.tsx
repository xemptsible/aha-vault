import { useLoaderData } from 'react-router'
import { getAuthors } from '~/features/resources/api/author'
import { getResources } from '~/features/resources/api/resource'
import { getTags } from '~/features/resources/api/tag'
import ResourceFilter from '~/features/resources/components/filter'
import ResourceView from '~/features/resources/components/resources'
import { extractSearchParams } from '~/lib/utils'
import type { Authors } from '~/types/author'
import type { Resources } from '~/types/resource'
import type { Tags } from '~/types/tag'
import type { Route } from '../+types/root'

export async function loader({ request }: Route.LoaderArgs): Promise<{
  resources: Resources
  authors: Authors
  tags: Tags
}> {
  const [resources, authors, tags] = await Promise.all([
    getResources(extractSearchParams(request)),
    getAuthors(),
    getTags(),
  ])

  return { resources, authors, tags }
}

export default function ResourceRoute() {
  const { resources, authors, tags } = useLoaderData<typeof loader>()

  return (
    <div className='flex flex-col gap-4 lg:flex-row'>
      <title>Resources</title>
      <meta
        name='description'
        content='This app is the best'
      />
      <ResourceFilter
        authors={authors}
        tags={tags}
      />
      <article className='grid flex-4/6 gap-3 md:grid-cols-2 lg:flex-5/6 xl:grid-cols-4'>
        <ResourceView resolvedResources={resources} />
      </article>
    </div>
  )
}
