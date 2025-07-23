"use client";

import {Popover,PopoverContent,PopoverTrigger,} from "@/components/ui/popover"
import {Command,CommandEmpty,CommandGroup,CommandInput,CommandItem } from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface Option {
  value: string;
  label: string;
}
interface SearchableDropdownProps {
  options: Option[];
  placeholder?: string;
  selectedValue: string;
  onValueChange: (value: string) => void;
}
export function SearchableDropdown({
  options,
  placeholder = "Selecionar...",
  selectedValue,
  onValueChange,
}: SearchableDropdownProps) {
  const [open, setOpen] = useState(false);

  const selectedLabel =
    options.find((opt) => opt.value === selectedValue)?.label || placeholder;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedLabel}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command className="max-h-60 overflow-y-auto">
          <CommandInput placeholder="Procurar..." />
          <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
          <CommandGroup>
            {options.map((opt) => (
              <CommandItem
                key={opt.value}
                value={opt.label}
                onSelect={() => {
                  onValueChange(opt.value);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedValue === opt.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {opt.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}