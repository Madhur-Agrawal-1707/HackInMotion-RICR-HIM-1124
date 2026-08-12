import React from "react";
import { useResumeStore } from "../store/resume.store";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";

export const AtsAnalysis: React.FC = () => {
  const atsScore = useResumeStore((state) => state.atsScore);

  if (!atsScore) {
    return (
      <div className="p-8 text-center bg-card rounded-xl border border-border/50">
        <h3 className="text-lg font-medium text-muted-foreground">No ATS analysis available</h3>
        <p className="text-sm text-muted-foreground mt-2">Upload and analyze a resume to see the score.</p>
      </div>
    );
  }

  const { overallScore, sectionScores, missingKeywords, improvementSuggestions, priorityFixes } = atsScore;

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getStrokeColor = (score: number) => {
    if (score >= 80) return "#22c55e"; // green-500
    if (score >= 60) return "#eab308"; // yellow-500
    return "#ef4444"; // red-500
  };

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 bg-card rounded-xl border border-border/50 p-6 flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold mb-4">Overall ATS Score</h3>
          <div className="w-32 h-32">
            <CircularProgressbar
              value={overallScore}
              text={`${overallScore}%`}
              styles={buildStyles({
                pathColor: getStrokeColor(overallScore),
                textColor: "var(--foreground)",
                trailColor: "var(--secondary)",
              })}
            />
          </div>
          <p className="mt-4 text-sm text-center text-muted-foreground">
            {overallScore >= 80 ? "Excellent! Your resume is highly ATS optimized." :
             overallScore >= 60 ? "Good, but there is room for improvement." :
             "Needs significant improvements to pass ATS."}
          </p>
        </div>

        {/* Priority Fixes */}
        <div className="col-span-1 md:col-span-2 bg-card rounded-xl border border-border/50 p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            Priority Fixes
          </h3>
          {priorityFixes && priorityFixes.length > 0 ? (
            <ul className="space-y-3">
              {priorityFixes.map((fix, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm">
                  <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>{fix}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex items-center gap-2 text-green-500">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-sm font-medium">No priority fixes required!</span>
            </div>
          )}
        </div>
      </div>

      {/* Missing Keywords & Suggestions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl border border-border/50 p-6">
          <h3 className="text-lg font-semibold mb-4">Missing Keywords</h3>
          <div className="flex flex-wrap gap-2">
            {missingKeywords?.map((kw, idx) => (
              <span key={idx} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                {kw}
              </span>
            ))}
            {(!missingKeywords || missingKeywords.length === 0) && (
              <span className="text-sm text-muted-foreground">No critical keywords missing.</span>
            )}
          </div>
        </div>
        
        <div className="bg-card rounded-xl border border-border/50 p-6">
          <h3 className="text-lg font-semibold mb-4">Improvement Suggestions</h3>
          <ul className="space-y-3 text-sm">
            {improvementSuggestions?.map((suggestion, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                <span>{suggestion}</span>
              </li>
            ))}
            {(!improvementSuggestions || improvementSuggestions.length === 0) && (
              <li className="text-muted-foreground">Your resume is well optimized.</li>
            )}
          </ul>
        </div>
      </div>

      {/* Section Scores */}
      <div className="bg-card rounded-xl border border-border/50 p-6">
        <h3 className="text-lg font-semibold mb-4">Detailed Analysis</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Object.entries(sectionScores || {}).map(([key, score]) => (
            <div key={key} className="p-4 bg-background rounded-lg border border-border/50 flex flex-col items-center">
              <div className="text-2xl font-bold mb-1 className={getScoreColor(score)}">
                <span className={getScoreColor(score)}>{score}</span><span className="text-sm text-muted-foreground">/100</span>
              </div>
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider text-center">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
