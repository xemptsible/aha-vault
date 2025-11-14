import { useSearchParams } from 'react-router'
import { Button } from '~/components/ui/button'
import { Checkbox } from '~/components/ui/checkbox'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/custom/accordion'
import { Label } from '~/components/ui/label'
import { cn } from '~/lib/utils'
import type { Authors } from '~/types/author'
import type { Tags } from '~/types/tag'

interface ResourceFilterProps {
  authors: Authors
  tags: Tags
}

export default function ResourceFilter({ authors, tags }: ResourceFilterProps) {
  const [searchParams, setSearchParams] = useSearchParams()

  return (
    <aside className='flex-2/6 xl:flex-1/6'>
      <h2 className='sr-only'>Resource Filter</h2>
      <Accordion type='multiple'>
        <AccordionItem value='item-1'>
          <AccordionTrigger>
            <span>Author</span>
          </AccordionTrigger>
          <AccordionContent className='grid gap-3'>
            {authors && authors.data.length > 0
              ? authors.data.map((author) => {
                  const authorName = author.name

                  return (
                    <Label key={author.id}>
                      <Checkbox
                        checked={searchParams.has('author', authorName)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSearchParams((searchParams) => {
                              searchParams.append('author', authorName)
                              return searchParams
                            })
                          } else {
                            setSearchParams((searchParams) => {
                              searchParams.delete('author', authorName)
                              return searchParams
                            })
                          }
                        }}
                      />
                      <span>{authorName}</span>
                    </Label>
                  )
                })
              : null}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-2'>
          <AccordionTrigger>Tags</AccordionTrigger>
          <AccordionContent className='grid gap-3'>
            {tags && tags.data
              ? tags.data.map((tag) => {
                  const tagName = tag.name

                  return (
                    <Label key={tag.id}>
                      <Checkbox
                        checked={searchParams.has('tag', tagName)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSearchParams((searchParams) => {
                              searchParams.append('tag', tagName)
                              return searchParams
                            })
                          } else {
                            setSearchParams((searchParams) => {
                              searchParams.delete('tag', tagName)
                              return searchParams
                            })
                          }
                        }}
                      />
                      <span>{tagName}</span>
                    </Label>
                  )
                })
              : null}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Button
        className={cn({ hidden: searchParams.size == 0 })}
        onClick={() => {
          setSearchParams({})
        }}
      >
        Clear filter
      </Button>
    </aside>
  )
}
