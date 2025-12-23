'use client'

import * as React from 'react'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

/**
 * @component AlertDialog
 * @description The root component for an alert dialog, based on Radix UI.
 * @param {React.ComponentProps<typeof AlertDialogPrimitive.Root>} props - Props for the component.
 * @returns {JSX.Element} The root alert dialog component.
 */
function AlertDialog({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
}

/**
 * @component AlertDialogTrigger
 * @description The button or element that opens the alert dialog.
 * @param {React.ComponentProps<typeof AlertDialogPrimitive.Trigger>} props - Props for the component.
 * @returns {JSX.Element} The trigger component for the alert dialog.
 */
function AlertDialogTrigger({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  )
}

/**
 * @component AlertDialogPortal
 * @description Portals the alert dialog content to the end of the document body.
 * @param {React.ComponentProps<typeof AlertDialogPrimitive.Portal>} props - Props for the component.
 * @returns {JSX.Element} The portal component.
 */
function AlertDialogPortal({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  )
}

/**
 * @component AlertDialogOverlay
 * @description A semi-transparent overlay that covers the page content when the dialog is open.
 * @param {React.ComponentProps<typeof AlertDialogPrimitive.Overlay>} props - Props for the component.
 * @returns {JSX.Element} The overlay component.
 */
function AlertDialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      className={cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
        className,
      )}
      {...props}
    />
  )
}

/**
 * @component AlertDialogContent
 * @description The main content container for the alert dialog.
 * @param {React.ComponentProps<typeof AlertDialogPrimitive.Content>} props - Props for the component.
 * @returns {JSX.Element} The content container component.
 */
function AlertDialogContent({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content>) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        className={cn(
          'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg',
          className,
        )}
        {...props}
      />
    </AlertDialogPortal>
  )
}

/**
 * @component AlertDialogHeader
 * @description The header section of the alert dialog, typically containing the title and description.
 * @param {React.ComponentProps<'div'>} props - Props for the component.
 * @returns {JSX.Element} The header component.
 */
function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
      {...props}
    />
  )
}

/**
 * @component AlertDialogFooter
 * @description The footer section of the alert dialog, typically containing action buttons.
 * @param {React.ComponentProps<'div'>} props - Props for the component.
 * @returns {JSX.Element} The footer component.
 */
function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
        className,
      )}
      {...props}
    />
  )
}

/**
 * @component AlertDialogTitle
 * @description The title of the alert dialog.
 * @param {React.ComponentProps<typeof AlertDialogPrimitive.Title>} props - Props for the component.
 * @returns {JSX.Element} The title component.
 */
function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn('text-lg font-semibold', className)}
      {...props}
    />
  )
}

/**
 * @component AlertDialogDescription
 * @description The description or body text of the alert dialog.
 * @param {React.ComponentProps<typeof AlertDialogPrimitive.Description>} props - Props for the component.
 * @returns {JSX.Element} The description component.
 */
function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

/**
 * @component AlertDialogAction
 * @description The primary action button for the alert dialog (e.g., "Confirm").
 * @param {React.ComponentProps<typeof AlertDialogPrimitive.Action>} props - Props for the component.
 * @returns {JSX.Element} The action button component.
 */
function AlertDialogAction({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action>) {
  return (
    <AlertDialogPrimitive.Action
      className={cn(buttonVariants(), className)}
      {...props}
    />
  )
}

/**
 * @component AlertDialogCancel
 * @description The cancel button for the alert dialog.
 * @param {React.ComponentProps<typeof AlertDialogPrimitive.Cancel>} props - Props for the component.
 * @returns {JSX.Element} The cancel button component.
 */
function AlertDialogCancel({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>) {
  return (
    <AlertDialogPrimitive.Cancel
      className={cn(buttonVariants({ variant: 'outline' }), className)}
      {...props}
    />
  )
}

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
