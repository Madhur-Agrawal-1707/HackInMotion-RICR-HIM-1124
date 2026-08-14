import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ResumeBuilder } from "../components/ResumeBuilder";
import { ResumePreview } from "../components/ResumePreview";
import { AtsAnalysis } from "../components/AtsAnalysis";
import { useResume, useAnalyzeResume } from "../hooks/useResume";
import { ArrowLeft, Loader2, Layout, Eye, BarChart } from "lucide-react";
import { cn } from "@/lib/utils";

export const ResumeBuilderPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<"edit" | "preview" | "analysis">("edit");
  
  const { data: resume, isLoading, error } = useResume(id === "new" ? "" : (id || ""));
  const { mutate: analyzeResume, isPending: isAnalyzing } = useAnalyzeResume();

  useEffect(() => {
    if (activeTab === "analysis" && id && !resume?.atsScore) {
      analyzeResume(id);
    }
  }, [activeTab, id, resume?.atsScore, analyzeResume]);

  if (id && isLoading) {
    return (
      <div className="flex h-[calc(100vh-100px)] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (id && error) {
    return (
      <div className="flex h-[calc(100vh-100px)] items-center justify-center text-destructive">
        <p>Error loading resume.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 max-w-7xl h-[calc(100vh-80px)] flex flex-col">
      <header className="flex items-center justify-between mb-6 shrink-0">
        <div className="flex items-center gap-4">
          <Link
            to="/resume"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">
            {id ? "Edit Resume" : "Create Resume"}
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex items-center p-1 bg-muted rounded-lg">
          <button
            onClick={() => setActiveTab("edit")}
            className={cn(
              "flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all",
              activeTab === "edit" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Layout className="w-4 h-4" />
            <span className="hidden sm:inline">Builder</span>
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={cn(
              "flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all",
              activeTab === "preview" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline">Preview</span>
          </button>
          {id && (
            <button
              onClick={() => setActiveTab("analysis")}
              className={cn(
                "flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all",
                activeTab === "analysis" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <BarChart className="w-4 h-4" />
              <span className="hidden sm:inline">ATS Analysis</span>
            </button>
          )}
        </div>
      </header>

      <div className="flex-1 overflow-auto bg-muted/10 rounded-xl border border-border/50 relative">
        {activeTab === "edit" && (
          <div className="p-6 h-full overflow-y-auto">
            <ResumeBuilder />
          </div>
        )}
        
        {activeTab === "preview" && (
          <div className="p-6 h-full overflow-y-auto bg-gray-100">
            <ResumePreview />
          </div>
        )}

        {activeTab === "analysis" && (
          <div className="p-6 h-full overflow-y-auto">
            {isAnalyzing ? (
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
                <p className="text-muted-foreground">Analyzing your resume for ATS compatibility...</p>
              </div>
            ) : (
              <AtsAnalysis />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
