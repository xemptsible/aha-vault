import { BookMarked } from 'lucide-react'
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '~/components/ui/empty'

export default function EmptyResourceView() {
  return (
    <Empty className='col-span-full'>
      <EmptyHeader>
        <EmptyMedia
          variant='icon'
          className='dark:bg-gray-600'
        >
          <BookMarked />
        </EmptyMedia>
        <EmptyTitle>No Resources Found</EmptyTitle>
      </EmptyHeader>
    </Empty>
  )
}
