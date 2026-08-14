import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { parsedResumeSchema } from "../schemas/resume.schema";
import { ParsedResume } from "../types/resume.types";
import { useResumeStore } from "../store/resume.store";
import { useBuildResume, useUpdateResume } from "../hooks/useResume";
import { Plus, Trash2, Save, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const ResumeBuilder: React.FC = () => {
  const parsedResume = useResumeStore((state) => state.parsedResume);
  const currentResume = useResumeStore((state) => state.currentResume);
  const { mutate: buildResume, isPending: isBuilding } = useBuildResume();
  const { mutate: updateResume, isPending: isUpdating } = useUpdateResume();

  const isPending = isBuilding || isUpdating;

  const defaultValues: ParsedResume = parsedResume || {
    personalInfo: { name: "", email: "", phone: "", location: "" },
    summary: "",
    education: [],
    experience: [],
    skills: [],
    projects: [],
    certifications: [],
    achievements: [],
    languages: [],
    socialLinks: { portfolio: "", github: "", linkedin: "" },
  };

  const { register, control, handleSubmit, formState: { errors }, reset } = useForm<ParsedResume>({
    resolver: zodResolver(parsedResumeSchema as any) as any,
    defaultValues,
  });

  useEffect(() => {
    if (parsedResume) {
      reset(parsedResume);
    }
  }, [parsedResume, reset]);

  // Removed unused eduFields

  const { fields: expFields, append: appendExp, remove: removeExp } = useFieldArray({
    control,
    name: "experience",
  });

  const onSubmit = (data: ParsedResume) => {
    if (currentResume?._id) {
      updateResume({ id: currentResume._id, data });
    } else {
      buildResume(data);
    }
  };

  const InputField = ({ label, name, error, type = "text", ...props }: any) => (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <input
        type={type}
        {...register(name)}
        className={cn(
          "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          error ? "border-destructive focus-visible:ring-destructive" : "border-input"
        )}
        {...props}
      />
      {error && <span className="text-xs text-destructive">{error.message}</span>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-4xl mx-auto pb-20">
      
      {/* Personal Info */}
      <section className="space-y-4 p-6 bg-card rounded-xl border border-border/50">
        <h2 className="text-xl font-semibold">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Full Name" name="personalInfo.name" error={errors.personalInfo?.name} />
          <InputField label="Email" name="personalInfo.email" error={errors.personalInfo?.email} type="email" />
          <InputField label="Phone" name="personalInfo.phone" error={errors.personalInfo?.phone} />
          <InputField label="Location" name="personalInfo.location" error={errors.personalInfo?.location} />
        </div>
      </section>

      {/* Summary */}
      <section className="space-y-4 p-6 bg-card rounded-xl border border-border/50">
        <h2 className="text-xl font-semibold">Professional Summary</h2>
        <div className="flex flex-col gap-1.5">
          <textarea
            {...register("summary")}
            className={cn(
              "flex min-h-[120px] w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              errors.summary ? "border-destructive focus-visible:ring-destructive" : "border-input"
            )}
            placeholder="A brief summary of your professional background..."
          />
          {errors.summary && <span className="text-xs text-destructive">{errors.summary.message}</span>}
        </div>
      </section>

      {/* Experience */}
      <section className="space-y-4 p-6 bg-card rounded-xl border border-border/50">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Experience</h2>
          <button
            type="button"
            onClick={() => appendExp({ id: crypto.randomUUID(), company: "", position: "", location: "", startDate: "", endDate: "", current: false, description: [""] })}
            className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80"
          >
            <Plus className="w-4 h-4" /> Add Experience
          </button>
        </div>
        
        {expFields.map((field, index) => (
          <div key={field.id} className="p-4 bg-background border border-border/50 rounded-lg space-y-4 relative">
            <button
              type="button"
              onClick={() => removeExp(index)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-destructive transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="Company" name={`experience.${index}.company`} error={errors.experience?.[index]?.company} />
              <InputField label="Position" name={`experience.${index}.position`} error={errors.experience?.[index]?.position} />
              <InputField label="Start Date" name={`experience.${index}.startDate`} error={errors.experience?.[index]?.startDate} placeholder="MM/YYYY" />
              <InputField label="End Date" name={`experience.${index}.endDate`} error={errors.experience?.[index]?.endDate} placeholder="MM/YYYY or Present" />
            </div>
            {/* Note: In a full app, description would be a field array for multiple bullet points */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">Responsibilities (comma separated for now)</label>
              <textarea
                {...register(`experience.${index}.description.0`)}
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
          </div>
        ))}
      </section>

      {/* Save Action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-md border-t border-border z-10">
        <div className="max-w-4xl mx-auto flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-8 py-2 gap-2 shadow-sm"
          >
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Resume
          </button>
        </div>
      </div>
    </form>
  );
};
