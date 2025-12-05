import { cn } from '~/lib/utils'

export function AhaExternalLinkIcon({
  className,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      src='external-link.svg'
      className={cn('size-3', className)}
      loading='lazy'
      alt=''
      {...props}
    ></img>
  )
}

export function AhaSchaleDBIcon({
  className,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      src='schaledb.svg'
      className={cn('size-3', className)}
      loading='lazy'
      alt=''
      {...props}
    ></img>
  )
}

export function AhaMidokuniIcon({
  className,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      src='midokuni.svg'
      className={cn('size-3', className)}
      loading='lazy'
      alt=''
      {...props}
    ></img>
  )
}
