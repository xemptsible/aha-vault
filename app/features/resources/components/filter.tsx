import { Link, useSearchParams, type SetURLSearchParams } from 'react-router'
import { useIsClient } from 'usehooks-ts'
import { Button } from '~/components/ui/button'
import { Label } from '~/components/ui/label'
import { cn } from '~/lib/utils'
import type { ApiGetAll } from '~/types/_generic'
import type { Author } from '~/types/author'
import type { Tag } from '~/types/tag'
import FilterCheckbox from './filter-checkbox'

interface ResourceFilterProps {
  authors: ApiGetAll<Author>
  tags: ApiGetAll<Tag>
}

interface FilterDataProps extends Partial<Author>, Partial<Tag> {
  id: number
  name: string
}

interface ResourceFilterCategoryProps {
  filters: {
    data: Array<FilterDataProps>
    count: number
  }
  filterTitle: string
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
        />
        <ResourceFilterCategory
          filters={tags}
          filterTitle={'Tags'}
          searchTag={'tag'}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
        <Button
          className={cn({ hidden: searchParams.size === 0 })}
          // Override link behavior if JS is enabled
          onClick={(e) => {
            e.preventDefault()

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
  searchTag,
  searchParams,
  setSearchParams,
}: ResourceFilterCategoryProps) {
  const isClient = useIsClient()
  const paramLink = (searchParamName: string) => {
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
  const allParamLinkByTag = () => {
    let param = searchParams.toString()

    if (searchParams.getAll(searchTag).length !== filters.count) {
      for (let i = 0; i < filters.count; i++) {
        if (i === 0 && param.length === 0) {
          param += `?${searchTag}=${filters.data[i].name}`
        } else if (!searchParams.has(searchTag, filters.data[i].name)) {
          param += `&${searchTag}=${filters.data[i].name}`
        }
      }
    }

    return param
  }
  const clearParamByTag = () => {
    let param = searchParams.toString()

    for (let i = 0; i < filters.count; i++) {
      const encodedName = encodeURI(filters.data[i].name)
      if (searchParams.has(searchTag, filters.data[i].name)) {
        const regex = new RegExp(`&?${searchTag}=${encodedName}&?`, 'g')

        // TODO: Use exec() or test() to check if the regex contains more than 2
        // ampersands, for more complicated regex replacement
        param = `${param.replace(regex, '')}`
      }
    }
    return param
  }

  return (
    <>
      <div className='flex items-center justify-between gap-2'>
        <div>
          <h3>{filterTitle}</h3>
          <code
            className='text-sm'
            aria-description='You can search specific term for this tag by typing the following parameter at the end of the URL:'
          >
            <span aria-description='question mark'>?</span>
            {searchTag}=
          </code>
        </div>
        <div className='flex items-center gap-2'>
          <Button
            size={'sm'}
            // Override link behavior if JS is enabled
            onClick={(e) => {
              e.preventDefault()

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
              to={{ search: allParamLinkByTag() }}
              preventScrollReset
            >
              Select all
            </Link>
          </Button>
          <Button
            variant={'outline'}
            size={'sm'}
            aria-label={`Clear all ${searchTag} filter(s)`}
            // Override link behavior if JS is enabled
            onClick={(e) => {
              e.preventDefault()

              if (!searchParams.has(searchTag)) {
                return
              }

              setSearchParams((searchParams) => {
                searchParams.delete(searchTag)
                return searchParams
              })
            }}
            asChild
          >
            <Link
              to={clearParamByTag()}
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
          ? filters.data.map((filter: FilterDataProps) => {
              const searchParamName = filter.name
              const resourceCount =
                ((filter.related_resources &&
                  filter.related_resources.length) ||
                  (filter.credited_resources &&
                    filter.credited_resources.length)) ??
                0

              return (
                <li
                  className='flex gap-2'
                  key={filter.id}
                >
                  <FilterCheckbox
                    searchParamName={searchParamName}
                    searchTag={searchTag}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                  />
                  <Label
                    htmlFor={`checkbox-${searchParamName}`}
                    aria-label={`${filter.name}, found ${resourceCount} resources with this ${searchTag}`}
                  >
                    <Button
                      variant={'link'}
                      size={'link'}
                      asChild
                    >
                      <Link
                        to={paramLink(searchParamName)}
                        preventScrollReset
                        tabIndex={isClient ? -1 : 0}
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
                        {`${searchParamName} (${resourceCount})`}
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
