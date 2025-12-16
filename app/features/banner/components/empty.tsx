import { BookMarked } from 'lucide-react'
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '~/components/ui/empty'

export default function EmptyBannerView() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia
          variant='icon'
          className='dark:bg-gray-600'
        >
          <BookMarked />
        </EmptyMedia>
        <EmptyTitle>No Banners Found</EmptyTitle>
      </EmptyHeader>
    </Empty>
  )
}
