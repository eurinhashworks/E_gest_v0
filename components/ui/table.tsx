'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * @component Table
 * @description The main wrapper for a table, which includes a container for horizontal scrolling.
 * @param {React.ComponentProps<'table'>} props - Props for the table element.
 * @returns {JSX.Element} The table component.
 */
function Table({ className, ...props }: React.ComponentProps<'table'>) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn('w-full caption-bottom text-sm', className)}
        {...props}
      />
    </div>
  )
}

/**
 * @component TableHeader
 * @description The header section of a table (`<thead>`).
 * @param {React.ComponentProps<'thead'>} props - Props for the `thead` element.
 * @returns {JSX.Element} The table header component.
 */
function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
  return (
    <thead
      data-slot="table-header"
      className={cn('[&_tr]:border-b', className)}
      {...props}
    />
  )
}

/**
 * @component TableBody
 * @description The body section of a table (`<tbody>`).
 * @param {React.ComponentProps<'tbody'>} props - Props for the `tbody` element.
 * @returns {JSX.Element} The table body component.
 */
function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
  return (
    <tbody
      data-slot="table-body"
      className={cn('[&_tr:last-child]:border-0', className)}
      {...props}
    />
  )
}

/**
 * @component TableFooter
 * @description The footer section of a table (`<tfoot>`).
 * @param {React.ComponentProps<'tfoot'>} props - Props for the `tfoot` element.
 * @returns {JSX.Element} The table footer component.
 */
function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        'bg-muted/50 border-t font-medium [&>tr]:last:border-b-0',
        className,
      )}
      {...props}
    />
  )
}

/**
 * @component TableRow
 * @description A row in a table (`<tr>`).
 * @param {React.ComponentProps<'tr'>} props - Props for the `tr` element.
 * @returns {JSX.Element} The table row component.
 */
function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        'hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors',
        className,
      )}
      {...props}
    />
  )
}

/**
 * @component TableHead
 * @description A header cell in a table (`<th>`).
 * @param {React.ComponentProps<'th'>} props - Props for the `th` element.
 * @returns {JSX.Element} The table head component.
 */
function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        'text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className,
      )}
      {...props}
    />
  )
}

/**
 * @component TableCell
 * @description A standard cell in a table (`<td>`).
 * @param {React.ComponentProps<'td'>} props - Props for the `td` element.
 * @returns {JSX.Element} The table cell component.
 */
function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        'p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className,
      )}
      {...props}
    />
  )
}

/**
 * @component TableCaption
 * @description A caption for a table (`<caption>`).
 * @param {React.ComponentProps<'caption'>} props - Props for the `caption` element.
 * @returns {JSX.Element} The table caption component.
 */
function TableCaption({
  className,
  ...props
}: React.ComponentProps<'caption'>) {
  return (
    <caption
      data-slot="table-caption"
      className={cn('text-muted-foreground mt-4 text-sm', className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
