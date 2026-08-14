import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, File as FileIcon, X, Loader2 } from "lucide-react";
import { useUploadResume } from "../hooks/useResume";
import { useResumeStore } from "../store/resume.store";
import { cn } from "@/lib/utils";

export const ResumeUpload: React.FC = () => {
  const { mutate: uploadResume, isPending } = useUploadResume();
  const uploadState = useResumeStore((state) => state.uploadState);
  const uploadProgress = useResumeStore((state) => state.uploadProgress);
  const setUploadState = useResumeStore((state) => state.setUploadState);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        uploadResume(file);
      }
    },
    [uploadResume]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false,
  });

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div
        {...getRootProps()}
        className={cn(
          "relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl transition-colors cursor-pointer",
          isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50",
          (isPending || uploadState === "success") && "pointer-events-none opacity-80"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
          {isPending ? (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Uploading Resume...</p>
                <div className="w-48 h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300 ease-in-out"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">{uploadProgress}%</p>
              </div>
            </div>
          ) : uploadState === "success" ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-2">
                <FileIcon className="w-6 h-6 text-green-500" />
              </div>
              <p className="text-sm font-medium text-green-600 dark:text-green-400">
                Upload Complete!
              </p>
              <p className="text-xs text-muted-foreground">
                Your resume has been successfully parsed.
              </p>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Upload className="w-6 h-6 text-primary" />
              </div>
              <p className="mb-2 text-sm font-semibold text-foreground">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">PDF or DOCX (MAX. 10MB)</p>
            </>
          )}
        </div>
      </div>
      
      {uploadState === "error" && (
        <div className="mt-4 p-4 bg-destructive/10 text-destructive rounded-lg flex items-start gap-3">
          <X className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium">Upload Failed</h4>
            <p className="text-sm opacity-90 mt-1">
              There was an error uploading your resume. Please try again.
            </p>
          </div>
          <button 
            onClick={() => setUploadState("idle")}
            className="ml-auto text-sm underline hover:no-underline"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
};
