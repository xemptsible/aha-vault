import { ExternalLink } from 'lucide-react'
import { Link } from 'react-router'
import type { Resource } from '~/types/resource'
import { Badge } from '../badge'
import { Card, CardContent, CardHeader, CardTitle } from '../card'
import { Separator } from '../separator'

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

  return (
    <Card className='h-min'>
      <CardHeader>
        <CardTitle>
          <Link
            className='underline underline-offset-2'
            to={resource.url}
          >
            {resource.title}
          </Link>
        </CardTitle>
        <div
          data-slot='card-name'
          className='flex flex-wrap items-center gap-2'
        >
          {resource.authors.length > 0 ? (
            resource.authors.map((author) => {
              return author.personal_site.length > 0 ? (
                <Link
                  to={author.personal_site}
                  key={author.id}
                >
                  <Badge variant={'ba-default'}>
                    <span>{author.name}</span>
                    <ExternalLink />
                  </Badge>
                </Link>
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
          <img
            src={resource.image?.url ?? '/placeholder-arona.webp'}
            alt={
              resource.image?.alt_text ??
              'Placeholder image with Arona, the AI assistant from Blue Archive in a small form'
            }
            width={'250'}
            className='mx-auto'
            loading='lazy'
          />
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
