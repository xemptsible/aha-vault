import { Separator } from '@radix-ui/react-dropdown-menu'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { Link } from 'react-router'
import { AhaExternalLinkIcon } from '~/components/icon'
import { Badge } from '~/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import type { Resource } from '~/types/resource'

export default function ResourceCard({ resource }: { resource: Resource }) {
  dayjs.extend(customParseFormat)

  function getClickableImageLink() {
    const image = resource.image

    if (image && image.url.length > 0) {
      if (image.url.includes('wsrv')) {
        return image.url.replace('&q=1', '')
      }
      if (image.url.includes('imgur')) {
        return image.url.replace('t.', '.')
      }
    }

    return resource.image?.url ?? ''
  }

  return (
    <Card className='h-min'>
      <CardHeader>
        <CardTitle className='flex flex-col gap-0.5'>
          <Link
            className='flex items-center gap-1 underline underline-offset-2'
            target='_blank'
            to={resource.url}
          >
            {resource.title}
            <AhaExternalLinkIcon className='size-[14px] dark:invert' />
          </Link>
          <span className='text-muted-foreground text-xs'>
            Last checked:{' '}
            <time dateTime={dayjs(resource.updated_at).toString()}>
              {dayjs(resource.updated_at).format('MMM DD, YY')}
            </time>
          </span>
        </CardTitle>
        <div
          data-slot='card-name'
          className='flex flex-wrap items-center gap-2'
        >
          {resource.authors.length > 0 ? (
            resource.authors.map((author) => {
              return author.personal_site.length > 0 ? (
                <Badge
                  key={author.id}
                  variant={'ba-default'}
                  asChild
                >
                  <Link
                    to={author.personal_site}
                    key={author.id}
                  >
                    <span>{author.name}</span>
                    <AhaExternalLinkIcon />
                  </Link>
                </Badge>
              ) : (
                <Badge
                  variant={'ba-default'}
                  key={author.id}
                >
                  <span>{author.name}</span>
                </Badge>
              )
            })
          ) : (
            <Badge variant={'ba-default'}>
              <span>Unknown</span>
            </Badge>
          )}
        </div>
        <Link
          target='_blank'
          to={getClickableImageLink()}
        >
          <picture>
            <source
              srcSet={resource.image?.url}
              type='image/webp'
            />
            <img
              src={'/placeholder-arona.webp'}
              alt={
                resource.image?.alt_text ??
                'Placeholder image with Arona, the AI assistant from Blue Archive drawn in chibi artstyle'
              }
              width={250}
              height={250}
              className='mx-auto aspect-square object-cover'
              loading='lazy'
            />
          </picture>
        </Link>
        <Separator />
        <div
          data-slot='card-tag'
          className='flex flex-wrap items-center gap-2'
        >
          {resource.tags && resource.tags?.length > 0 ? (
            resource.tags.map((tag) => {
              return <Badge key={tag.id}>{tag.name}</Badge>
            })
          ) : (
            <span className='text-muted-foreground text-xs'>
              No tag(s) provided
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {resource.description && resource.description.length > 0 ? (
          <p>{resource.description}</p>
        ) : (
          <p>No description provided.</p>
        )}
      </CardContent>
    </Card>
  )
}
