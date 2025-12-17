import type { VariantProps } from 'class-variance-authority'
import type { ReactNode } from 'react'
import Tooltip from '~/components/tooltip'
import { Badge } from '~/components/ui/badge'
import { cn } from '~/lib/utils'
import { BANNER_TYPE, type BannerType, type Character } from '~/types/character'

interface BannerTagProps
  extends Pick<Character, 'type' | 'has_free_pulls'>,
    VariantProps<typeof Badge> {
  tooltip?: ReactNode
  className?: string
}

export default function BannerTag({
  tooltip,
  type,
  has_free_pulls: hasFreePulls,
  className,
  ...props
}: BannerTagProps) {
  const getTag = (type: BannerType) => {
    if (type === BANNER_TYPE[1]) {
      return {
        tooltip: (
          <p>
            This student is a <strong>FES</strong> unit. The rate of obtaining a
            3* student on this banner is doubled (6%) and there is a small
            chance of obtaining other FES students on this banner.
          </p>
        ),
        className: 'bg-gradient-to-r from-purple-300 to-rose-300',
        element: (
          <div>
            <span aria-hidden>{'\ud83c\udf89'}</span> Anniversary
          </div>
        ),
      }
    }
    if (type === BANNER_TYPE[2]) {
      return {
        tooltip: (
          <p>
            This student is a <strong>LIMITED</strong> unit and cannot be
            obtained outside of their banner.
          </p>
        ),
        className: 'text-primary-foreground bg-red-700',
        element: <div>Limited</div>,
      }
    }

    return {
      tooltip: '',
      className: '',
      element: <div>Permanant</div>,
    }
  }

  if (tooltip || (getTag(type) && getTag(type).tooltip)) {
    const defaultTooltip = getTag(type).tooltip

    return (
      <>
        <Tooltip
          tooltip={tooltip || defaultTooltip}
          asChild
        >
          <Badge
            variant={'ba-default'}
            className={cn(getTag(type).className, className)}
            {...props}
          >
            {getTag(type).element}
          </Badge>
        </Tooltip>
        <FreePullsTag has_free_pulls={hasFreePulls} />
      </>
    )
  }

  return (
    <>
      <Badge
        variant={'ba-default'}
        className={cn(getTag(type).className, className)}
        {...props}
      >
        {getTag(type).element}
      </Badge>
      <FreePullsTag has_free_pulls={hasFreePulls} />
    </>
  )
}

function FreePullsTag({
  has_free_pulls: hasFreePulls,
  className,
  ...props
}: Omit<BannerTagProps, 'type'>) {
  if (!hasFreePulls) {
    return null
  }

  return (
    <Tooltip
      tooltip={
        <p>
          For the duration of this banner, this student can be pulled using the{' '}
          <strong>free daily pulls</strong> for a total of 100.
        </p>
      }
      asChild
    >
      <Badge
        variant={'ba-default'}
        className={cn('bg-[#f9eaf6]', className)}
        {...props}
      >
        <div>
          <span aria-hidden>{'\u2728'}</span> 100 Free Pulls
        </div>
      </Badge>
    </Tooltip>
  )
}
