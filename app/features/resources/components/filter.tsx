import { CircleQuestionMark } from 'lucide-react'
import { Link, useSearchParams, type SetURLSearchParams } from 'react-router'
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

interface ResourceFilterCategoryProps {
  filters: {
    data: { id: number; name: string; personal_site?: string }[]
    count: number
  }
  filterTitle: string
  tooltip: string
  searchTag: string
  searchParams: URLSearchParams
  setSearchParams: SetURLSearchParams
}

export default function ResourceFilter({ authors, tags }: ResourceFilterProps) {
  const [searchParams, setSearchParams] = useSearchParams()

  return (
    <aside className='flex-2/6 xl:flex-1/6'>
      <h2 className='sr-only'>Resource Filter</h2>

      <div className='grid gap-2 pb-4'>
        <ResourceFilterCategory
          filters={authors}
          filterTitle={'Authors'}
          searchTag={'author'}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          tooltip='URL query: ?author='
        />
        <ResourceFilterCategory
          filters={tags}
          filterTitle={'Tags'}
          searchTag={'tag'}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          tooltip='URL query: ?tag='
        />
      </div>

      <Button
        className={cn({ hidden: searchParams.size == 0 })}
        // Override link behavior if JS is enabled
        onClick={(e) => {
          e.preventDefault()

          setSearchParams({})
        }}
        asChild
      >
        <Link to={'/resources'}>Clear all filter(s)</Link>
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
}: ResourceFilterCategoryProps) {
  function checkCurrentQueryParam({
    searchParamName,
  }: {
    searchParamName: string
  }) {
    const encodedParam = encodeURI(searchParamName)

    if (searchParams.has(searchTag, searchParamName)) {
      const regex = new RegExp(`&?${searchTag}=${encodedParam}&?`, 'g')

      // TODO: Use exec() or test() to check if the regex contains more than 2
      // ampersands, for more complicated regex replacement
      return `?${searchParams.toString().replace(regex, '&')}`
    }

    return !searchParams.has(searchTag, searchParamName)
      ? `?${searchParams.toString()}&${searchTag}=${searchParamName}`
      : `?${searchTag}=${searchParamName}`
  }

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
              if (
                searchParams.getAll(searchTag).length === filters.data.length
              ) {
                return
              }

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
                  <Link
                    to={checkCurrentQueryParam({
                      searchParamName,
                    })}
                    // Override link behavior if JS is enabled
                    onClick={(e) => {
                      e.preventDefault()

                      if (!searchParams.has(searchTag, searchParamName)) {
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
                  >
                    <span>{searchParamName}</span>
                  </Link>
                </Label>
              )
            })
          : null}
      </div>
    </>
  )
}
