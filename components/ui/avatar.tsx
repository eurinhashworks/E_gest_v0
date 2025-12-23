'use client'

import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'

import { cn } from '@/lib/utils'

/**
 * @component Avatar
 * @description The root component for an avatar, serving as a container for the image and fallback.
 * @param {React.ComponentProps<typeof AvatarPrimitive.Root>} props - Props for the component.
 * @returns {JSX.Element} The root avatar component.
 */
function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        'relative flex size-8 shrink-0 overflow-hidden rounded-full',
        className,
      )}
      {...props}
    />
  )
}

/**
 * @component AvatarImage
 * @description The image to be displayed within the avatar.
 * @param {React.ComponentProps<typeof AvatarPrimitive.Image>} props - Props for the component.
 * @returns {JSX.Element} The avatar image component.
 */
function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn('aspect-square size-full', className)}
      {...props}
    />
  )
}

/**
 * @component AvatarFallback
 * @description A fallback element to be displayed if the avatar image fails to load.
 * Often used to show initials.
 * @param {React.ComponentProps<typeof AvatarPrimitive.Fallback>} props - Props for the component.
 * @returns {JSX.Element} The avatar fallback component.
 */
function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        'bg-muted flex size-full items-center justify-center rounded-full',
        className,
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }
