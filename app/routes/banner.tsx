import { Link } from 'react-router'
import {
  AhaExternalLinkIcon,
  AhaMidokuniIcon,
  AhaSchaleDBIcon,
} from '~/components/icon'
import Tooltip from '~/components/tooltip'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'

export default function Banner() {
  return (
    <>
      <title>Resources</title>
      <meta
        name='description'
        content='For past, present and future Blue Archive character banners'
      />
      <div className='grid gap-3 md:grid-cols-2 xl:grid-cols-3'>
        {Array.from({ length: 6 }).map((_, index) => (
          <Card
            className='w-full gap-0'
            key={index}
          >
            <CardHeader>
              <CardTitle>Dec 26th, 2025 - Jan 1st, 2026</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className='flex flex-col'>
                {Array.from({ length: 4 }).map((_, index) => (
                  <BannerCharacter key={index} />
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}

function BannerCharacter() {
  // const testImageMath = () => 10000 + Math.round(Math.random() * 10)
  // const testImageMath = () => 10000

  return (
    <li className='not-last:border-b-input/50 flex flex-col justify-between gap-3 py-4 not-last:border-b lg:flex-row'>
      <div className='flex items-center gap-3'>
        <picture>
          <source
            // srcSet={`https://wsrv.nl/?url=https://schaledb.com/images/student/collection/${testImageMath()}.webp&q=40`}
            srcSet='/test-banner-char.webp'
          ></source>
          <img
            src='/placeholder-arona.webp'
            className='aspect-square max-w-[72px] rounded-md object-cover'
            loading='lazy'
            width={72}
            height={72}
            alt=''
          ></img>
        </picture>
        <div className='grid gap-2'>
          <span className='text-xl font-bold'>test</span>
          <div className='z-10 flex flex-wrap items-center gap-2'>
            <Tooltip
              tooltip={'Only available for the duration of this banner.'}
            >
              <Badge
                variant={'ba-default'}
                className='text-primary-foreground bg-red-700'
              >
                <div>Limited</div>
              </Badge>
            </Tooltip>
            <Tooltip
              tooltip={
                'Only available during the biannual Fes/Anniversary Banners.'
              }
            >
              <Badge
                variant={'ba-default'}
                className='bg-purple-300'
              >
                <div>
                  <span aria-hidden>{'\ud83c\udf89'}</span> Anniversary
                </div>
              </Badge>
            </Tooltip>
            <Tooltip
              tooltip={
                'Only available for the duration of this banner in the form of daily free pulls.'
              }
            >
              <Badge
                variant={'ba-default'}
                className='bg-[#f3aed9] outline outline-gray-600 dark:bg-[#f9eaf6] dark:outline-0'
              >
                <div>
                  <span aria-hidden>{'\u2728'}</span> 100 Free Pulls
                </div>
              </Badge>
            </Tooltip>
          </div>
        </div>
      </div>
      <div className='flex shrink-0 flex-col gap-3'>
        <Button
          size={'sm'}
          variant={'outline'}
          className='p-0 transition lg:size-9 dark:hover:[&_img]:invert-0'
          asChild
        >
          <Link
            to={'https://schaledb.com/home'}
            target='_blank'
          >
            <AhaSchaleDBIcon className='size-5 dark:invert' />
            <span className='flex items-center gap-1 text-xs lg:sr-only'>
              View on SchaleDB
              <AhaExternalLinkIcon className='dark:invert' />
            </span>
          </Link>
        </Button>
        <Button
          size={'sm'}
          variant={'outline'}
          className='p-0 transition lg:size-9 dark:hover:[&_img]:invert-0'
          asChild
        >
          <Link
            to={'https://hina.loves.midokuni.com/'}
            target='_blank'
          >
            <AhaMidokuniIcon className='size-5 dark:brightness-125' />
            <span className='flex items-center gap-1 text-xs lg:sr-only'>
              View on Hina Loves Midokuni
              <AhaExternalLinkIcon className='dark:invert' />
            </span>
          </Link>
        </Button>
      </div>
    </li>
  )
}
