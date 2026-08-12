import React from "react";
import { useParams, Link } from "react-router-dom";
import { useResumeHistory, useRestoreResumeVersion } from "../hooks/useResume";
import { ArrowLeft, Loader2, History, CheckCircle2, RotateCcw } from "lucide-react";
import { useResumeStore } from "../store/resume.store";

export const ResumeHistoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: versions, isLoading, error } = useResumeHistory(id || "");
  const { mutate: restoreVersion, isPending: isRestoring } = useRestoreResumeVersion();
  const currentResume = useResumeStore((state) => state.currentResume);

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !versions) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-destructive">
        <p>Failed to load resume history.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-4xl space-y-8">
      <header className="flex items-center gap-4 border-b border-border/50 pb-6">
        <Link
          to={`/resume/${id}`}
          className="p-2 -ml-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Version History</h1>
          <p className="text-sm text-muted-foreground mt-1">
            View and restore previous versions of your resume.
          </p>
        </div>
      </header>

      <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
        {versions.map((version, index) => {
          const isCurrent = currentResume?.currentVersion === version._id || (index === 0 && !currentResume?.currentVersion);
          
          return (
            <div key={version._id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-secondary text-secondary-foreground shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                {isCurrent ? <CheckCircle2 className="w-5 h-5 text-primary" /> : <History className="w-4 h-4" />}
              </div>
              
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card p-4 rounded-xl border border-border/50 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-sm">
                    {new Date(version.updatedAt).toLocaleString()}
                  </h3>
                  {isCurrent && (
                    <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
                      Current
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mb-4">
                  ATS Score: {version.atsScore?.overallScore || "N/A"}%
                </p>
                
                {!isCurrent && (
                  <button
                    onClick={() => id && restoreVersion({ id, versionId: version._id })}
                    disabled={isRestoring}
                    className="inline-flex items-center gap-2 text-xs font-medium text-primary hover:text-primary/80 transition-colors disabled:opacity-50"
                  >
                    {isRestoring ? <Loader2 className="w-3 h-3 animate-spin" /> : <RotateCcw className="w-3 h-3" />}
                    Restore this version
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {versions.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No history available for this resume yet.
          </div>
        )}
      </div>
    </div>
  );
};
