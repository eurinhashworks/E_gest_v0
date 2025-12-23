'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { XIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

/**
 * @component Dialog
 * @description The root component for a dialog or modal, based on Radix UI.
 * @param {React.ComponentProps<typeof DialogPrimitive.Root>} props - Props for the component.
 * @returns {JSX.Element} The root dialog component.
 */
function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

/**
 * @component DialogTrigger
 * @description The button or element that opens the dialog.
 * @param {React.ComponentProps<typeof DialogPrimitive.Trigger>} props - Props for the component.
 * @returns {JSX.Element} The trigger component for the dialog.
 */
function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

/**
 * @component DialogPortal
 * @description Portals the dialog content to the end of the document body.
 * @param {React.ComponentProps<typeof DialogPrimitive.Portal>} props - Props for the component.
 * @returns {JSX.Element} The portal component.
 */
function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

/**
 * @component DialogClose
 * @description A button or element that closes the dialog.
 * @param {React.ComponentProps<typeof DialogPrimitive.Close>} props - Props for the component.
 * @returns {JSX.Element} The close button component.
 */
function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

/**
 * @component DialogOverlay
 * @description A semi-transparent overlay that covers the page content when the dialog is open.
 * @param {React.ComponentProps<typeof DialogPrimitive.Overlay>} props - Props for the component.
 * @returns {JSX.Element} The overlay component.
 */
function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
        className,
      )}
      {...props}
    />
  )
}

/**
 * @component DialogContent
 * @description The main content container for the dialog. Includes an optional close button.
 * @param {React.ComponentProps<typeof DialogPrimitive.Content> & { showCloseButton?: boolean }} props - Props for the component.
 * @returns {JSX.Element} The content container component.
 */
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg',
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

/**
 * @component DialogHeader
 * @description The header section of the dialog, typically containing the title and description.
 * @param {React.ComponentProps<'div'>} props - Props for the component.
 * @returns {JSX.Element} The header component.
 */
function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-header"
      className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
      {...props}
    />
  )
}

/**
 * @component DialogFooter
 * @description The footer section of the dialog, typically containing action buttons.
 * @param {React.ComponentProps<'div'>} props - Props for the component.
 * @returns {JSX.Element} The footer component.
 */
function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
        className,
      )}
      {...props}
    />
  )
}

/**
 * @component DialogTitle
 * @description The title of the dialog.
 * @param {React.ComponentProps<typeof DialogPrimitive.Title>} props - Props for the component.
 * @returns {JSX.Element} The title component.
 */
function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn('text-lg leading-none font-semibold', className)}
      {...props}
    />
  )
}

/**
 * @component DialogDescription
 * @description The description or body text of the dialog.
 * @param {React.ComponentProps<typeof DialogPrimitive.Description>} props - Props for the component.
 * @returns {JSX.Element} The description component.
 */
function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
