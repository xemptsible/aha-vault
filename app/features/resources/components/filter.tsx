import { CircleQuestionMark } from 'lucide-react'
import { useSearchParams, type SetURLSearchParams } from 'react-router'
import { Button } from '~/components/ui/button'
import { Checkbox } from '~/components/ui/checkbox'
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

      <div className='grid gap-2 pb-4'>
        <ResourceFilterCategory
          filters={authors}
          searchTag={'author'}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          filterTitle={'Authors'}
          tooltip='URL query: ?author='
        />
        <ResourceFilterCategory
          filters={tags}
          searchTag={'tag'}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          filterTitle={'Tags'}
          tooltip='URL query: ?tag='
        />
      </div>

      <Button
        className={cn({ hidden: searchParams.size == 0 })}
        onClick={() => {
          setSearchParams({})
        }}
      >
        Clear all filter(s)
      </Button>
    </aside>
  )
}

function ResourceFilterCategory({
  filters,
  filterTitle,
  tooltip = '',
  searchTag,
  searchParams,
  setSearchParams,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filters: { data: any[]; count: number }
  filterTitle: string
  tooltip?: string
  searchTag: string
  searchParams: URLSearchParams
  setSearchParams: SetURLSearchParams
}) {
  return (
    <>
      <div className='flex items-center justify-between gap-2'>
        <span className='relative flex items-center'>
          <h3>{filterTitle}</h3>
          {tooltip.length > 0 ? (
            <Button
              aria-label='filter-tooltip'
              variant={'ghost'}
              size={'icon-sm'}
              className={'tooltip hover:bg-gray-200'}
              data-tooltip={tooltip}
            >
              <CircleQuestionMark />
            </Button>
          ) : null}
        </span>
        <div className='flex items-center gap-2'>
          <Button
            onClick={() => {
              setSearchParams((searchParams) => {
                filters.data.forEach((filter) => {
                  if (!searchParams.has(searchTag, filter.name)) {
                    searchParams.append(searchTag, filter.name)
                  }
                })
                return searchParams
              })
            }}
            size={'sm'}
          >
            Select all
          </Button>
          <Button
            onClick={() => {
              setSearchParams((searchParams) => {
                searchParams.delete(searchTag)
                return searchParams
              })
            }}
            size={'sm'}
            variant={'outline'}
          >
            Clear
          </Button>
        </div>
      </div>
      <div className='grid gap-3'>
        {filters && filters.data.length > 0
          ? filters.data.map((filter) => {
              const searchParamName = filter.name

              return (
                <Label key={filter.id}>
                  <Checkbox
                    checked={searchParams.has(searchTag, searchParamName)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSearchParams((searchParams) => {
                          searchParams.append(searchTag, searchParamName)
                          return searchParams
                        })
                      } else {
                        setSearchParams((searchParams) => {
                          searchParams.delete(searchTag, searchParamName)
                          return searchParams
                        })
                      }
                    }}
                  />
                  <span>{searchParamName}</span>
                </Label>
              )
            })
          : null}
      </div>
    </>
  )
}
