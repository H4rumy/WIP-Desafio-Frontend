/*Componente genérico para dropdowns com search.

Recebe props:

label

options

value

onChange

disabled    
*/

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

type Props = {
  options: string[]
  value: string
  onChange: (val: string) => void
  placeholder?: string
  width?: string // ex: "w-64" ou "w-[200px]"
}

export function SearchableDropdown({
  options,
  value,
  onChange,
  placeholder = "Procurar/Search",
  width = "w-64",
}: Props) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open} //verificar
          className={cn("justify-between", width)}
        >
          {value || placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">          
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            {options.map((option) => (
              <CommandItem
                key={option}
                value={option}
                onSelect={(val) => {
                  onChange(val)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === option ? "opacity-100" : "opacity-0"
                  )}
                />
                {option}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}