import { useRouteLoaderData } from 'react-router'
import BannerView from '~/features/banner/components/view'

export default function Banner() {
  const { banners } = useRouteLoaderData('banner-loader')

  return (
    <>
      <title>Resources</title>
      <meta
        name='description'
        content='For past, present and future Blue Archive character banners'
      />
      <div className='grid gap-3 md:grid-cols-2 xl:grid-cols-3'>
        <BannerView resolvedBanners={banners} />
      </div>
    </>
  )
}
