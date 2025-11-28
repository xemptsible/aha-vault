import type { SetURLSearchParams } from 'react-router'

interface FilterCheckboxProps {
  searchParamName: string
  searchTag: string
  searchParams: URLSearchParams
  setSearchParams: SetURLSearchParams
  isClient: boolean
}

export default function FilterCheckbox({
  searchParamName,
  searchTag,
  searchParams,
  setSearchParams,
}: FilterCheckboxProps) {
  return (
    <input
      id={`checkbox-${searchParamName}`}
      type='checkbox'
      name={searchTag}
      value={searchParamName}
      checked={searchParams.has(searchTag, searchParamName)}
      className='filter-checkbox'
      onChange={() => {
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
    />
  )
}
