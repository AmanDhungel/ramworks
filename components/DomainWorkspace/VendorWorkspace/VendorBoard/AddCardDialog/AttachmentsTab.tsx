import { useFormContext } from "react-hook-form";
import { TabsContent } from "@/components/ui/tabs";
import { CloudUpload, X, FileText } from "lucide-react";

export default function AttachmentsTab() {
  const { watch, setValue } = useFormContext();
  const attachments = watch("attachments") || [];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newFile = {
        id: Math.random().toString(),
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(1) + "MB",
        url: "#",
      };
      setValue("attachments", [...attachments, newFile]);
    }
  };

  return (
    <TabsContent value="attachments" className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-bold">Attach a file from your computer</h3>
        <p className="text-sm text-slate-400">
          You can also drag and drop files to upload them.
        </p>
      </div>

      <div className="border-2 border-dashed border-blue-200 rounded-xl p-10 flex flex-col items-center justify-center bg-slate-50/50 cursor-pointer hover:bg-slate-100 transition-colors relative">
        <input
          type="file"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={handleFileUpload}
        />
        <CloudUpload className="w-10 h-10 text-blue-500 mb-2" />
        <p className="text-sm font-medium">
          Drag your file(s) or{" "}
          <span className="text-blue-500 underline">browse</span>
        </p>
        <p className="text-xs text-slate-400 mt-1">
          Max 10 MB files are allowed
        </p>
      </div>

      <div className="space-y-2">
        {attachments.map((file: any, idx: number) => (
          <div
            key={file.id}
            className="flex items-center justify-between p-3 border rounded-lg bg-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-100 rounded">
                <FileText className="w-5 h-5 text-slate-500" />
              </div>
              <div>
                <p className="text-sm font-medium">{file.name}</p>
                <p className="text-xs text-slate-400">{file.size}</p>
              </div>
            </div>
            <X
              className="w-4 h-4 text-slate-400 cursor-pointer hover:text-red-500"
              onClick={() =>
                setValue(
                  "attachments",
                  attachments.filter((_: any, i: number) => i !== idx)
                )
              }
            />
          </div>
        ))}
      </div>
    </TabsContent>
  );
}
