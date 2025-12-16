import type { ApiGetAll } from '~/types/_generic'
import type { Banner } from '~/types/banner'
import BannerCard from './card'
import EmptyBannerView from './empty'

export default function BannerView({
  resolvedBanners,
}: {
  resolvedBanners: ApiGetAll<Banner>
}) {
  if (resolvedBanners.count === 0) {
    return <EmptyBannerView />
  }

  return resolvedBanners.data.map((banner) => (
    <BannerCard
      key={banner.id}
      banner={banner}
    />
  ))
}
