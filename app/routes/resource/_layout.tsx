import { Outlet } from 'react-router'
import { getAuthors } from '~/features/resources/api/author'
import { getResources } from '~/features/resources/api/resource'
import { getTags } from '~/features/resources/api/tag'
import { extractSearchParams } from '~/lib/utils'
import type { Route } from '../../+types/root'

export async function loader({ request }: Route.LoaderArgs) {
  const [resources, authors, tags] = await Promise.all([
    getResources(extractSearchParams(request)),
    getAuthors(),
    getTags(),
  ])

  return { resources, authors, tags }
}

export default function Layout() {
  return <Outlet />
}
