import * as React from "react"
import { ChevronDown } from "lucide-react"

export function Select({ children, value, onValueChange }) {
  const [open, setOpen] = React.useState(false)

  const handleSelect = (val) => {
    onValueChange(val)
    setOpen(false)
  }

  return (
    <div className="relative w-full">
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          open,
          setOpen,
          value,
          onSelect: handleSelect,
        })
      })}
    </div>
  )
}

export function SelectTrigger({ children, className, open, setOpen }) {
  return (
    <button
      onClick={() => setOpen(!open)}
      className={`flex w-full items-center justify-between rounded-md border px-3 py-2 text-sm shadow-sm ${className}`}
    >
      {children}
      <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
    </button>
  )
}

export function SelectValue({ placeholder, value }) {
  return (
    <span className="text-muted-foreground">
      {value || placeholder}
    </span>
  )
}

export function SelectContent({ children, open }) {
  if (!open) return null

  return (
    <div className="absolute z-10 mt-1 w-full rounded-md border bg-white shadow-lg">
      {children}
    </div>
  )
}

export function SelectItem({ children, value, onSelect }) {
  return (
    <div
      onClick={() => onSelect(value)}
      className="cursor-pointer px-3 py-2 hover:bg-gray-100"
    >
      {children}
    </div>
  )
}
