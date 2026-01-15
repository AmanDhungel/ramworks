import { useFormContext } from "react-hook-form";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TaskFormValues } from "./schema";
import { useGetContact } from "@/services/contact.service";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const MOCK_USERS = [
  { id: "1", name: "John Doe", img: "https://github.com/shadcn.png" },
  { id: "2", name: "Jane Doe", img: "https://github.com/shadcn.png" },
];

export default function MembersTab() {
  const { control } = useFormContext<TaskFormValues>();
  const { data: contacts } = useGetContact();

  return (
    <TabsContent value="members" className="space-y-4">
      <div className="space-y-4">
        <h3 className="font-bold">Members</h3>
        <div className="space-y-2"></div>

        <div className="space-y-2 pt-4">
          <div className="space-y-1">
            <FormField
              control={control}
              name="contacts"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Members</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between font-normal",
                            !field.value?.length && "text-muted-foreground"
                          )}>
                          {field?.value?.length > 0
                            ? `${field?.value.length} members selected`
                            : "Select members..."}
                          <span className="ml-2 opacity-50">▼</span>
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="start">
                      <Command>
                        <CommandInput placeholder="Search contacts..." />
                        <CommandList>
                          <CommandEmpty>No contact found.</CommandEmpty>
                          <CommandGroup>
                            {contacts?.data.map((contact) => (
                              <CommandItem
                                key={contact._id}
                                value={contact.name}
                                onSelect={() => {
                                  const currentValue = field.value || [];
                                  const newValue = currentValue.includes(
                                    contact._id
                                  )
                                    ? currentValue.filter(
                                        (v: string) => v !== contact._id
                                      )
                                    : [...currentValue, contact._id];
                                  field.onChange(newValue);
                                }}>
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    field.value?.includes(contact._id)
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {contact.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </TabsContent>
  );
}
