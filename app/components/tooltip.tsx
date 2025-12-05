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
import { flip, shift } from '@floating-ui/react-dom'
import { Slot } from '@radix-ui/react-slot'
import { useEffect, useId, useState, type ReactNode } from 'react'
import { useIsClient } from 'usehooks-ts'
import { cn } from '~/lib/utils'

interface TooltipProps {
  id?: string
  tooltip: string | ReactNode
  children?: ReactNode
}

// Bad idea to try and re-invent the wheel on an inherently hard to make accessible element
export default function Tooltip({
  id = `tooltip-text-${useId()}`, // Use React's ID generator hook if no id was provided
  tooltip,
  children,
}: TooltipProps) {
  const isClient = useIsClient()
  const [isOpen, setIsOpen] = useState(false)

  const { refs, floatingStyles, context, elements, update } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'top',
    middleware: [flip(), shift()],
  })

  const { isMounted, styles } = useTransitionStyles(context, {
    duration: 100,
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
      role='presentation'
      className={cn('relative flex flex-col', {
        'flex-col-reverse': !isClient,
      })}
    >
      <Slot
        ref={refs.setReference}
        className={cn('inline cursor-help', {
          tooltip: !isClient,
        })}
        tabIndex={0}
        aria-describedby={id}
        {...getReferenceProps()}
      >
        {children}
      </Slot>
      <div
        id={'tooltip-content'}
        role='presentation'
        ref={refs.setFloating}
        className={cn({
          'z-10 flex items-end justify-center': !isClient,
        })}
        style={isClient ? floatingStyles : undefined}
        {...getFloatingProps()}
      >
        <div
          id='tooltip-text'
          role='tooltip'
          className={cn(
            'dark:outline-input text-primary-foreground w-max max-w-[40ch] rounded-md bg-black p-1 text-center text-sm dark:outline',
            {
              hidden: isClient && !isMounted,
            },
          )}
          style={isClient ? { ...styles } : undefined}
        >
          {tooltip}
        </div>
      </div>
    </div>
  )
}
