import {
  autoUpdate,
  safePolygon,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useTransitionStyles,
} from '@floating-ui/react'
import { flip, limitShift, shift } from '@floating-ui/react-dom'
import { Slot } from '@radix-ui/react-slot'
import { useEffect, useId, useState, type ReactNode } from 'react'
import { useIsClient } from 'usehooks-ts'
import { cn } from '~/lib/utils'
import { Button } from './ui/button'

interface TooltipProps {
  id?: string
  tooltip: string | ReactNode
  children?: ReactNode
  asChild?: boolean
  className?: string
}

// Bad idea to try and re-invent the wheel on an inherently hard to make accessible element
export default function Tooltip({
  id = `tooltip-text`, // Use React's ID generator hook if no id was provided
  tooltip,
  children,
  asChild,
  className,
  ...props
}: TooltipProps & React.ComponentProps<typeof Button>) {
  const tooltipId = id + `-${useId()}`
  const isClient = useIsClient()
  const [isOpen, setIsOpen] = useState(false)

  const Comp = asChild ? Slot : Button

  const { refs, floatingStyles, context, elements, update } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'top',
    whileElementsMounted(referenceEl, floatingEl, update) {
      const cleanup = autoUpdate(referenceEl, floatingEl, update, {
        layoutShift: false,
      })
      return cleanup
    },
    middleware: [
      shift({
        limiter: limitShift(),
      }),
      flip(),
    ],
  })

  const { isMounted, styles } = useTransitionStyles(context, {
    duration: 100,
    initial: {
      scale: 0,
      transform: 'scale(1)',
    },
  })

  const hover = useHover(context, {
    delay: {
      open: 500,
    },
    handleClose: safePolygon({
      buffer: 1,
    }),
  })
  const focus = useFocus(context)
  const dismiss = useDismiss(context)

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
  ])

  // https://floating-ui.com/docs/autoupdate#usage
  useEffect(() => {
    if (isMounted && elements.reference && elements.floating) {
      const cleanup = autoUpdate(elements.reference, elements.floating, update)
      return cleanup
    }
  }, [isMounted, elements, update])

  // TODO:
  // Replace isClient hacks with CSS Anchor positioning once it's considered Baseline
  // See https://github.com/web-platform-dx/web-features/issues/3558.
  return (
    <div
      id='tooltip-wrapper'
      className={cn('relative flex flex-col', {
        'flex-col-reverse': !isClient,
      })}
    >
      <Comp
        ref={refs.setReference}
        className={cn(
          'cursor-help',
          {
            tooltip: !isClient,
          },
          className,
        )}
        aria-describedby={tooltipId}
        {...props}
        {...getReferenceProps()}
      >
        {children}
      </Comp>
      <div
        id={'tooltip-content'}
        ref={refs.setFloating}
        className={cn('z-10', {
          'flex items-end justify-center': !isClient,
          'pointer-events-none': isClient && !isMounted,
        })}
        style={isClient ? floatingStyles : undefined}
        {...getFloatingProps()}
      >
        <div
          id={tooltipId}
          role='tooltip'
          className={cn(
            'dark:outline-input text-primary-foreground w-max max-w-[calc(100dvw-10px)] rounded-md bg-black p-1 text-center text-xs text-pretty md:max-w-[40ch] md:text-sm dark:outline',
          )}
          style={isClient ? { ...styles } : undefined}
        >
          {tooltip}
        </div>
      </div>
    </div>
  )
}
