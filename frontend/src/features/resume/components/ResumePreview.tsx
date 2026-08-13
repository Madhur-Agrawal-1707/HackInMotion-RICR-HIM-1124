import React from "react";
import { useResumeStore } from "../store/resume.store";

export const ResumePreview: React.FC = () => {
  const parsedResume = useResumeStore((state) => state.parsedResume);

  if (!parsedResume) {
    return (
      <div className="w-full h-full min-h-[600px] flex items-center justify-center bg-muted/20 border border-border/50 rounded-xl">
        <p className="text-muted-foreground">No resume data to preview</p>
      </div>
    );
  }

  const { personalInfo, summary, experience, education, skills } = parsedResume;

  return (
    <div className="bg-white text-black p-8 shadow-xl max-w-[210mm] min-h-[297mm] mx-auto overflow-hidden text-sm">
      {/* Header */}
      <header className="border-b-2 border-gray-300 pb-4 mb-6">
        <h1 className="text-3xl font-bold uppercase tracking-wider mb-2">{personalInfo.name}</h1>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-2 text-gray-800">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-3 text-gray-800 border-b border-gray-200 pb-1">Experience</h2>
          <div className="space-y-4">
            {experience.map((exp, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                  <span className="text-gray-500 text-sm font-medium">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <div className="text-gray-600 mb-2 font-medium">{exp.company} {exp.location && `| ${exp.location}`}</div>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {exp.description.map((desc, dIdx) => (
                    <li key={dIdx} className="leading-relaxed pl-2 -indent-4 ml-4">{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-3 text-gray-800 border-b border-gray-200 pb-1">Education</h2>
          <div className="space-y-3">
            {education.map((edu, idx) => (
              <div key={idx} className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-semibold text-gray-900">{edu.degree} in {edu.fieldOfStudy}</h3>
                  <div className="text-gray-600">{edu.institution}</div>
                </div>
                <span className="text-gray-500 text-sm font-medium">
                  {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-3 text-gray-800 border-b border-gray-200 pb-1">Skills</h2>
          <div className="flex flex-wrap gap-2 text-gray-700">
            {skills.map((skill, idx) => (
              <span key={idx} className="bg-gray-100 px-2 py-1 rounded">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
