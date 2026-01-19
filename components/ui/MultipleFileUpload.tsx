import { CloudUpload, ImageIcon, X } from "lucide-react";
import { Button } from "./button";
import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";

export function MultipleFileUploadField({
  name,
  control,
  label,
}: {
  name: string;
  control: any;
  label: string;
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        const files = Array.isArray(value) ? value : [];

        const handleAddFiles = (newFiles: File[]) => {
          const uniqueFiles = newFiles.filter(
            (newFile) =>
              !files.some(
                (existingFile) =>
                  existingFile.name === newFile.name &&
                  existingFile.size === newFile.size,
              ),
          );

          onChange([...files, ...uniqueFiles]);
        };

        const handleRemoveFile = (index: number) => {
          const updatedFiles = files.filter((_, i) => i !== index);
          onChange(updatedFiles);
        };

        return (
          <FormItem>
            <FormLabel className="text-slate-700 font-bold">
              Attachment
            </FormLabel>
            <FormControl>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border rounded-xl p-4 bg-slate-50/50">
                {/* 1. Dropzone Area */}
                <DropzoneArea onFilesAdded={handleAddFiles} />

                {/* 2. Scrollable File List */}
                <div className="flex flex-col gap-2 max-h-[180px] overflow-y-auto pr-2">
                  {files.length > 0 ? (
                    files.map((file: File, index: number) => (
                      <FilePreview
                        key={`${file.name}-${index}`}
                        file={file}
                        onRemove={() => handleRemoveFile(index)}
                      />
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full border border-dashed rounded-lg text-slate-400 p-4 min-h-[120px]">
                      <p className="text-xs italic">No files attached</p>
                    </div>
                  )}
                </div>
              </div>
            </FormControl>
            <p className="text-[10px] text-muted-foreground mt-2">{label}</p>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

function DropzoneArea({
  onFilesAdded,
}: {
  onFilesAdded: (files: File[]) => void;
}) {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setError(null); // clear previous error
      if (acceptedFiles.length > 0) {
        onFilesAdded(acceptedFiles);
      }
    },
    [onFilesAdded],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected: (fileRejections) => {
      const oversizedFile = fileRejections.find((rejection) =>
        rejection.errors.some((e) => e.code === "file-too-large"),
      );

      if (oversizedFile) {
        setError("Each file must be less than 1MB");
      } else {
        setError("Only JPG, PNG, and WEBP images are allowed");
      }
    },
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
    },
    multiple: true,
    maxSize: 1024 * 1024, // 1MB
  });

  return (
    <div className="flex flex-col gap-2">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all min-h-[130px]
        ${
          isDragActive
            ? "border-orange-500 bg-orange-50"
            : error
              ? "border-red-400 bg-red-50"
              : "border-slate-200 bg-white hover:border-orange-300"
        }`}>
        <input {...getInputProps()} />

        <div className="p-3 bg-orange-100 rounded-full mb-3">
          <CloudUpload className="w-6 h-6 text-orange-600" />
        </div>

        <p className="text-sm font-semibold text-slate-700 text-center">
          Drag files or{" "}
          <span className="text-orange-600 underline">browse</span>
        </p>
        {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
}

function FilePreview({ file, onRemove }: { file: File; onRemove: () => void }) {
  return (
    <div className="flex items-center justify-between p-2 border rounded-md bg-white shadow-sm">
      <div className="flex items-center gap-2 overflow-hidden">
        <div className="p-1 bg-slate-100 border rounded">
          <ImageIcon className="w-4 h-4 text-slate-500" />
        </div>
        <div className="flex flex-col">
          <p className="text-[11px] font-medium truncate max-w-[120px]">
            {file.name}
          </p>
          <p className="text-[9px] text-muted-foreground">
            {(file.size / 1024).toFixed(0)} KB
          </p>
        </div>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-7 w-7 hover:text-red-500"
        onClick={onRemove}>
        <X className="w-3 h-3" />
      </Button>
    </div>
  );
}
