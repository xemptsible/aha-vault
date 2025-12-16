import { Link } from 'react-router'
import {
  AhaExternalLinkIcon,
  AhaMidokuniIcon,
  AhaSchaleDBIcon,
} from '~/components/icon'
import Tooltip from '~/components/tooltip'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import type { Banner } from '~/types/banner'
import BannerTag from './tag'

export default function BannerCard({ banner }: { banner: Banner }) {
  return (
    <Card className='w-full gap-0'>
      <CardHeader>
        <CardTitle>
          {new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(
            new Date(banner.start_at),
          )}{' '}
          -{' '}
          {new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(
            new Date(banner.end_at),
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className='flex flex-col'>
          {banner.characters.map((character) => (
            <li
              key={character.id}
              className='not-last:border-b-input/50 flex flex-col justify-between gap-3 py-4 not-last:border-b lg:flex-row'
            >
              <div className='flex items-center gap-3'>
                <picture>
                  <source
                    // srcSet={`https://wsrv.nl/?url=https://schaledb.com/images/student/collection/${testImageMath()}.webp&q=40`}
                    // srcSet='/test-banner-char.webp'
                    srcSet={character.image?.url}
                  ></source>
                  <img
                    src='/placeholder-arona.webp'
                    className='aspect-square max-w-[72px] rounded-md object-cover'
                    loading='lazy'
                    width={72}
                    height={72}
                    alt={character.image?.alt_text}
                  ></img>
                </picture>
                <div className='grid gap-2'>
                  <span className='text-xl font-bold'>
                    {character.character_name}
                  </span>
                  <div className='z-10 flex flex-wrap items-center gap-2'>
                    <BannerTag
                      type={character.type}
                      has_free_pulls={character.has_free_pulls}
                    />
                  </div>
                </div>
              </div>
              <div className='flex shrink-0 flex-col gap-3'>
                <Tooltip
                  tooltip={'View on SchaleDB'}
                  asChild
                >
                  <Button
                    size={'sm'}
                    variant={'outline'}
                    className='p-0 transition lg:size-9 dark:hover:[&_img]:invert-0'
                    asChild
                  >
                    <Link
                      to={`https://schaledb.com/student/${character.character_id}`}
                      target='_blank'
                    >
                      <AhaSchaleDBIcon className='size-5 dark:invert' />
                      <span className='flex items-center gap-1 lg:sr-only'>
                        View on SchaleDB
                        <AhaExternalLinkIcon className='dark:invert' />
                      </span>
                    </Link>
                  </Button>
                </Tooltip>
                <Tooltip
                  size={'sm'}
                  tooltip={'View on Hina Loves Midokuni'}
                  asChild
                >
                  <Button
                    variant={'outline'}
                    className='p-0 transition lg:size-9 dark:hover:[&_img]:invert-0'
                    asChild
                  >
                    <Link
                      to={`https://hina.loves.midokuni.com/StudentInsights/${character.character_id}`}
                      target='_blank'
                    >
                      <AhaMidokuniIcon className='size-5 dark:brightness-125' />
                      <span className='flex items-center gap-1 lg:sr-only'>
                        View on Hina Loves Midokuni
                        <AhaExternalLinkIcon className='dark:invert' />
                      </span>
                    </Link>
                  </Button>
                </Tooltip>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
