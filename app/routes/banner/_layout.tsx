import { Outlet } from 'react-router'
import { getBanners } from '~/features/banner/api/banner'
import { extractSearchParams } from '~/lib/utils'
import type { Route } from '../../+types/root'

export async function loader({ request }: Route.LoaderArgs) {
  const [banners] = await Promise.all([
    getBanners(extractSearchParams(request)),
  ])

  return { banners }
}

export default function Layout() {
  return <Outlet />
}
