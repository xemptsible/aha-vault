import { Separator } from '@radix-ui/react-dropdown-menu'
import { Link } from 'react-router'
import { AhaExternalLinkIcon } from '~/components/icon'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import type { Resource } from '~/types/resource'

export default function ResourceCard({ resource }: { resource: Resource }) {
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

  function getUnicodeFlag(tag: string) {
    if (tag === 'EN') {
      return <span>🌐</span>
    }
    if (tag === 'JP') {
      return <span>🇯🇵</span>
    }
    if (tag === 'KR') {
      return <span>🇰🇷</span>
    }
    if (tag === 'CN') {
      return <span>🇨🇳</span>
    }

    return null
  }

  return (
    <Card className='h-min'>
      <CardHeader>
        <CardTitle className='flex flex-col gap-0.5'>
          <Button
            variant={'link'}
            className='size-fit p-0 text-base font-semibold'
            asChild
          >
            <Link
              className='flex w-fit items-center gap-1'
              target='_blank'
              to={resource.url}
            >
              {resource.title}
              <AhaExternalLinkIcon className='size-[14px] dark:invert' />
            </Link>
          </Button>
          <span className='text-muted-foreground text-xs'>
            Last checked:{' '}
            <time
              dateTime={new Intl.DateTimeFormat(undefined, {
                dateStyle: 'long',
              }).format(new Date(resource.updated_at))}
            >
              {new Intl.DateTimeFormat(undefined, {
                dateStyle: 'medium',
              }).format(new Date(resource.updated_at))}
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
              return (
                <Badge key={tag.id}>
                  {getUnicodeFlag(tag.name)} {tag.name}
                </Badge>
              )
            })
          ) : (
            <span className='text-muted-foreground text-sm'>
              No tag(s) provided.
            </span>
          )}
        </div>
      </CardHeader>
      {resource.description && resource.description.length > 0 ? (
        <CardContent>
          <p>{resource.description}</p>
        </CardContent>
      ) : null}
    </Card>
  )
}
