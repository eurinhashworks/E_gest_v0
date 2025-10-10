import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * @component Card
 * @description The main container for a card layout.
 * @param {React.ComponentProps<'div'>} props - Props for the component.
 * @returns {JSX.Element} The card container component.
 */
function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card"
      className={cn(
        'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm',
        className,
      )}
      {...props}
    />
  )
}

/**
 * @component CardHeader
 * @description The header section for a card.
 * @param {React.ComponentProps<'div'>} props - Props for the component.
 * @returns {JSX.Element} The card header component.
 */
function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
        className,
      )}
      {...props}
    />
  )
}

/**
 * @component CardTitle
 * @description The title for a card, typically used inside a `CardHeader`.
 * @param {React.ComponentProps<'div'>} props - Props for the component.
 * @returns {JSX.Element} The card title component.
 */
function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn('leading-none font-semibold', className)}
      {...props}
    />
  )
}

/**
 * @component CardDescription
 * @description The description for a card, typically used inside a `CardHeader`.
 * @param {React.ComponentProps<'div'>} props - Props for the component.
 * @returns {JSX.Element} The card description component.
 */
function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

/**
 * @component CardAction
 * @description A container for action elements (e.g., buttons) within a `CardHeader`.
 * @param {React.ComponentProps<'div'>} props - Props for the component.
 * @returns {JSX.Element} The card action component.
 */
function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className,
      )}
      {...props}
    />
  )
}

/**
 * @component CardContent
 * @description The main content area of a card.
 * @param {React.ComponentProps<'div'>} props - Props for the component.
 * @returns {JSX.Element} The card content component.
 */
function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn('px-6', className)}
      {...props}
    />
  )
}

/**
 * @component CardFooter
 * @description The footer section for a card.
 * @param {React.ComponentProps<'div'>} props - Props for the component.
 * @returns {JSX.Element} The card footer component.
 */
function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center px-6 [.border-t]:pt-6', className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
