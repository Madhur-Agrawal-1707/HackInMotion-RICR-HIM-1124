import React from "react";
import { Link } from "react-router-dom";
import { useResumes } from "../hooks/useResume";
import { FileText, Upload, Plus, History, Activity, AlertCircle, ArrowLeft } from "lucide-react";

export const ResumeDashboard: React.FC = () => {
  const { data: resumes, isLoading, error } = useResumes();

  return (
    <div className="container mx-auto py-8 max-w-6xl space-y-8">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors -ml-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>
      
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resume Intelligence</h1>
          <p className="text-muted-foreground mt-1">
            Build, analyze, and optimize your ATS-friendly resume.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/resume/upload"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2 gap-2"
          >
            <Upload className="w-4 h-4" />
            Upload PDF
          </Link>
          <Link
            to="/resume/build/new"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 gap-2"
          >
            <Plus className="w-4 h-4" />
            New Resume
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Quick Stats / Overview */}
        <div className="col-span-1 md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-card rounded-xl border border-border/50 p-6 flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg text-primary">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Resumes</p>
              <h4 className="text-2xl font-bold">{resumes?.length || 0}</h4>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border/50 p-6 flex items-center gap-4">
            <div className="p-3 bg-green-500/10 rounded-lg text-green-500">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Avg. ATS Score</p>
              <h4 className="text-2xl font-bold">
                {resumes?.length
                  ? Math.round(
                      resumes.reduce((acc, curr) => acc + (curr.atsScore?.overallScore || 0), 0) /
                        resumes.length
                    )
                  : 0}%
              </h4>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border/50 p-6 flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500">
              <History className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Recent Activity</p>
              <h4 className="text-2xl font-bold">
                {resumes?.length ? new Date(resumes[0].updatedAt).toLocaleDateString() : "None"}
              </h4>
            </div>
          </div>
        </div>

        {/* Resumes List */}
        <div className="col-span-1 md:col-span-3 space-y-4">
          <h2 className="text-xl font-semibold">Your Resumes</h2>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 bg-muted animate-pulse rounded-xl" />
              ))}
            </div>
          ) : error ? (
            <div className="p-6 bg-destructive/10 text-destructive rounded-xl flex items-center gap-3">
              <AlertCircle className="w-5 h-5" />
              Failed to load resumes. Please try again.
            </div>
          ) : !resumes || resumes.length === 0 ? (
            <div className="text-center py-16 bg-card rounded-xl border border-border/50 border-dashed">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No resumes found</h3>
              <p className="text-sm text-muted-foreground mt-2 mb-6">
                Get started by uploading an existing resume or building one from scratch.
              </p>
              <div className="flex items-center justify-center gap-3">
                <Link
                  to="/resume/upload"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2"
                >
                  Upload Resume
                </Link>
                <Link
                  to="/resume/build/new"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                >
                  Build New
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {resumes.map((resume) => (
                <Link
                  key={resume._id}
                  to={`/resume/build/${resume._id}`}
                  className="group block bg-card rounded-xl border border-border/50 p-5 hover:border-primary/50 transition-colors hover:shadow-sm"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <FileText className="w-6 h-6" />
                    </div>
                    {resume.atsScore && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        {resume.atsScore.overallScore}% ATS
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-lg truncate">
                    {resume.parsedResume?.personalInfo?.name || "Untitled Resume"}
                  </h3>
                  <p className="text-sm text-muted-foreground truncate mb-4">
                    {resume.parsedResume?.summary || "No summary provided."}
                  </p>
                  <div className="text-xs text-muted-foreground flex items-center justify-between mt-auto">
                    <span>Updated {new Date(resume.updatedAt).toLocaleDateString()}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
