import { useRouteLoaderData } from 'react-router'
import ResourceFilter from '~/features/resources/components/filter'
import ResourceView from '~/features/resources/components/resources'

export default function ResourceRoute() {
  const { resources, authors, tags } = useRouteLoaderData('resource-loader')

  return (
    <>
      <title>Resources</title>
      <meta
        name='description'
        content='For Blue Archive-related guides, resources and analyses'
      />
      <div className='flex flex-col gap-4 lg:flex-row'>
        <ResourceFilter
          authors={authors}
          tags={tags}
        />
        <article className='grid flex-4/6 gap-3 md:grid-cols-2 lg:flex-5/6 xl:grid-cols-4'>
          <ResourceView resolvedResources={resources} />
        </article>
      </div>
    </>
  )
}
