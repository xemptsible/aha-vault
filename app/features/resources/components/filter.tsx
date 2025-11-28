import { CircleQuestionMark } from 'lucide-react'
import { Link, useSearchParams, type SetURLSearchParams } from 'react-router'
import { useIsClient } from 'usehooks-ts'
import { Button } from '~/components/ui/button'
import { Label } from '~/components/ui/label'
import { cn } from '~/lib/utils'
import type { Authors } from '~/types/author'
import type { Resource } from '~/types/resource'
import type { Tags } from '~/types/tag'
import FilterCheckbox from './filter-checkbox'

interface ResourceFilterProps {
  authors: Authors
  tags: Tags
}

interface ResourceFilterCategoryProps {
  filters: {
    data: {
      id: number
      name: string
      personal_site?: string
      related_resources?: Array<Resource> // Tags only
      credited_resources?: Array<Resource> // Authors only
    }[]
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
      <div className='grid gap-3'>
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
        <Button
          className={cn({ hidden: searchParams.size === 0 })}
          // Override link behavior if JS is enabled
          onClick={() => {
            setSearchParams({})
          }}
          asChild
        >
          <Link
            to={'/resources'}
            preventScrollReset
          >
            Clear all filter(s)
          </Link>
        </Button>
      </div>
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
  const isClient = useIsClient()

  function setParamLink(searchParamName: string) {
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

  function selectAllParams() {
    let param = searchParams.toString()

    for (let i = 0; i < filters.data.length; i++) {
      if (i === 0 && param.length === 0) {
        param += `?${searchTag}=${filters.data[i].name}`
      } else {
        param += `&${searchTag}=${filters.data[i].name}`
      }
    }

    return param
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
            size={'sm'}
            type='button'
            // Override link behavior if JS is enabled
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
            asChild
          >
            <Link
              to={{ search: selectAllParams() }}
              preventScrollReset
            >
              Select all
            </Link>
          </Button>
          <Button
            variant={'outline'}
            type='button'
            size={'sm'}
            aria-label={`Clear all ${searchTag} filter(s)`}
            // Override link behavior if JS is enabled
            onClick={() => {
              setSearchParams((searchParams) => {
                searchParams.delete(searchTag)
                return searchParams
              })
            }}
            asChild
          >
            <Link
              to={'/resources'}
              preventScrollReset
            >
              Clear
            </Link>
          </Button>
        </div>
      </div>

      <ul
        className='grid gap-2'
        id={`filter-${searchTag}`}
        aria-label={`List of filter option for resource-related ${searchTag}`}
      >
        {filters && filters.data.length > 0
          ? filters.data.map((filter) => {
              const searchParamName = filter.name
              const resouceCount =
                ((filter.related_resources &&
                  filter.related_resources.length) ||
                  (filter.credited_resources &&
                    filter.credited_resources.length)) ??
                0

              return (
                <li
                  className='flex'
                  key={filter.id}
                >
                  <FilterCheckbox
                    searchParamName={searchParamName}
                    searchTag={searchTag}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    isClient={isClient}
                  />
                  <Label
                    htmlFor={`checkbox-${searchParamName}`}
                    aria-label={`${filter.name}, found ${resouceCount} resources with this ${searchTag}`}
                  >
                    <Button
                      variant={'link'}
                      size={'link'}
                      className='custom-cb-btn'
                      asChild
                    >
                      <Link
                        to={setParamLink(searchParamName)}
                        preventScrollReset
                        tabIndex={isClient ? -1 : 0}
                        // Override link behavior if JS is enabled
                        onClick={() => {
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
                        {`${searchParamName} (${resouceCount})`}
                      </Link>
                    </Button>
                  </Label>
                </li>
              )
            })
          : null}
      </ul>
    </>
  )
}
