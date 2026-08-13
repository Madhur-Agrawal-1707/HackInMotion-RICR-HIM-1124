import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ResumeUpload } from "../components/ResumeUpload";
import { useResumeStore } from "../store/resume.store";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export const UploadResumePage: React.FC = () => {
  const navigate = useNavigate();
  const currentResume = useResumeStore((state) => state.currentResume);
  const uploadState = useResumeStore((state) => state.uploadState);
  const resetStore = useResumeStore((state) => state.reset);

  useEffect(() => {
    // Reset state when mounting page to clear previous uploads
    resetStore();
  }, [resetStore]);

  useEffect(() => {
    // If upload is successful and we have a resume ID, redirect to builder or analysis
    if (uploadState === "success" && currentResume) {
      const timer = setTimeout(() => {
        navigate(`/resume/${currentResume._id}/analyze`); // or builder
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [uploadState, currentResume, navigate]);

  return (
    <div className="container mx-auto py-8 max-w-4xl space-y-8">
      <Link
        to="/resume"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>
      
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight">Upload Your Resume</h1>
        <p className="text-lg text-muted-foreground">
          Upload your existing resume in PDF or DOCX format. We will parse it and provide an in-depth ATS analysis.
        </p>
      </div>

      <div className="mt-8">
        <ResumeUpload />
      </div>
    </div>
  );
};
