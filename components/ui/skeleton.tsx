import { cn } from '@/lib/utils'

/**
 * @component Skeleton
 * @description Renders a skeleton placeholder component, typically used to indicate that content is loading.
 * It features a pulsing animation to provide visual feedback.
 * @param {React.ComponentProps<'div'>} props - Props for the component.
 * @returns {JSX.Element} The skeleton component.
 */
function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn('bg-accent animate-pulse rounded-md', className)}
      {...props}
    />
  )
}

export { Skeleton }
