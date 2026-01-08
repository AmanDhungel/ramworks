import { useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const modules = [
  "Domain Workspace",
  "Private/Vendor Workspace",
  "Boards",
  "Task Lists",
  "Tasks",
  "Fields",
];

const actions = [
  "Allow All",
  "Read",
  "Write",
  "Create",
  "Delete",
  "Import",
  "Export",
];

export function PermissionsTable({ userId }: { userId: string }) {
  const { register, setValue, watch } = useFormContext();

  return (
    <div className="rounded-md border bg-white p-4">
      <div className="flex justify-between mb-4 items-center">
        <h3 className="font-semibold text-slate-800">Permissions</h3>
        <span className="text-sm text-slate-500">
          Role Name: <span className="font-bold text-black">Admin</span>
        </span>
      </div>
      <Table>
        <TableHeader className="bg-slate-100">
          <TableRow>
            <TableHead className="w-[200px]">Modules</TableHead>
            {actions.map((action) => (
              <TableHead key={action} className="text-center">
                {action}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {modules.map((module) => (
            <TableRow key={module}>
              <TableCell className="font-medium">{module}</TableCell>
              {actions.map((action) => (
                <TableCell key={action} className="text-center">
                  <Checkbox
                    onCheckedChange={(checked) => {
                      setValue(
                        `${userId}.permissions.${module}.${action}`,
                        checked
                      );
                    }}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
