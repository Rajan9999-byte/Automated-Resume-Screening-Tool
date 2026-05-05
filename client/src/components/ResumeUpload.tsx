import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileText, AlertCircle } from "lucide-react";

interface ResumeUploadProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { file: File; candidateName: string; candidateEmail?: string; candidatePhone?: string }) => void;
  isLoading?: boolean;
}

export function ResumeUpload({ open, onOpenChange, onSubmit, isLoading }: ResumeUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [candidateName, setCandidateName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [candidatePhone, setCandidatePhone] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (f: File) => {
    const validTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain"];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(f.type)) {
      setError("Invalid file type. Please upload PDF, DOCX, or TXT files.");
      return false;
    }

    if (f.size > maxSize) {
      setError("File size exceeds 10MB limit.");
      return false;
    }

    setError("");
    return true;
  };

  const handleFileChange = (f: File) => {
    if (validateFile(f)) {
      setFile(f);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      handleFileChange(droppedFiles[0]);
    }
  };

  const handleSubmit = () => {
    if (!file || !candidateName.trim()) {
      setError("Please select a file and enter candidate name");
      return;
    }

    onSubmit({
      file,
      candidateName: candidateName.trim(),
      candidateEmail: candidateEmail.trim() || undefined,
      candidatePhone: candidatePhone.trim() || undefined,
    });

    // Reset form
    setFile(null);
    setCandidateName("");
    setCandidateEmail("");
    setCandidatePhone("");
    setError("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Resume</DialogTitle>
          <DialogDescription>Add a candidate resume for screening and analysis</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* File Upload */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
              dragActive ? "border-blue-500 bg-blue-50" : "border-slate-300 hover:border-slate-400"
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={(e) => e.target.files && handleFileChange(e.target.files[0])}
              className="hidden"
            />

            {file ? (
              <div className="space-y-2">
                <FileText className="h-8 w-8 mx-auto text-blue-600" />
                <p className="font-medium text-slate-900">{file.name}</p>
                <p className="text-sm text-slate-600">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            ) : (
              <div className="space-y-2">
                <Upload className="h-8 w-8 mx-auto text-slate-400" />
                <p className="font-medium text-slate-900">Drag and drop your resume here</p>
                <p className="text-sm text-slate-600">or click to browse</p>
                <p className="text-xs text-slate-500 mt-2">PDF, DOCX, or TXT (max 10MB)</p>
              </div>
            )}
          </div>

          {/* Candidate Information */}
          <div className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="name">Candidate Name *</Label>
              <Input
                id="name"
                placeholder="Full name"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="candidate@example.com"
                value={candidateEmail}
                onChange={(e) => setCandidateEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                placeholder="+1 (555) 123-4567"
                value={candidatePhone}
                onChange={(e) => setCandidatePhone(e.target.value)}
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex gap-2">
              <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-2 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isLoading || !file || !candidateName.trim()} className="ml-auto">
              {isLoading ? "Uploading..." : "Upload Resume"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
