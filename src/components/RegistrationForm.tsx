"use client";

/* ====================================================================
   Registration Form Section Component - Fire & Flames Inspired Design
   Features: Form validation, GSAP animations, fire effects
   ==================================================================== */

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  User,
  Mail,
  Phone,
  School,
  Code,
  Users,
  CheckCircle,
  AlertCircle,
  Loader2,
  ChevronRight,
  ChevronLeft,
  Send,
  Flame,
} from "lucide-react";

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/* ======= Form Field Interface ======= */
interface FormData {
  // Personal Information
  fullName: string;
  email: string;
  phone: string;
  // Academic Information
  college: string;
  branch: string;
  year: string;
  // Team Information
  teamName: string;
  teamSize: string;
  // Experience
  experience: string;
  skills: string;
  githubUrl: string;
  linkedinUrl: string;
  // Additional
  projectIdea: string;
  dietaryRestrictions: string;
  tshirtSize: string;
  agreeToTerms: boolean;
}

/* ======= Initial Form State ======= */
const INITIAL_FORM_DATA: FormData = {
  fullName: "",
  email: "",
  phone: "",
  college: "",
  branch: "",
  year: "",
  teamName: "",
  teamSize: "4",
  experience: "",
  skills: "",
  githubUrl: "",
  linkedinUrl: "",
  projectIdea: "",
  dietaryRestrictions: "",
  tshirtSize: "",
  agreeToTerms: false,
};

/* ======= Form Steps Configuration ======= */
const FORM_STEPS = [
  { id: 1, title: "Personal Info", icon: User },
  { id: 2, title: "Academic Details", icon: School },
  { id: 3, title: "Team & Skills", icon: Code },
  { id: 4, title: "Final Details", icon: CheckCircle },
];

/* ======= Dropdown Options ======= */
const YEAR_OPTIONS = ["1st Year", "2nd Year", "3rd Year", "4th Year", "Post Graduate"];
const TEAM_SIZE_OPTIONS = ["1", "2", "3", "4"];
const EXPERIENCE_OPTIONS = ["Beginner", "Intermediate", "Advanced", "Expert"];
const TSHIRT_OPTIONS = ["XS", "S", "M", "L", "XL", "XXL"];

/* ======= Form Input Component ======= */
interface FormInputProps {
  icon: typeof User;
  label: string;
  name: keyof FormData;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
}

function FormInput({
  icon: Icon,
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
  error,
}: FormInputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-bold text-orange-100">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-400/70" />
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full pl-12 pr-4 py-3 rounded-xl fire-glass border ${
            error ? "border-red-500" : "border-orange-500/30"
          } focus:border-orange-500/60 focus:outline-none focus:ring-2 focus:ring-orange-500/20 bg-transparent text-orange-100 placeholder-orange-300/40 transition-all`}
        />
      </div>
      {error && (
        <p className="text-red-400 text-sm flex items-center gap-1">
          <AlertCircle className="w-4 h-4" /> {error}
        </p>
      )}
    </div>
  );
}

/* ======= Form Select Component ======= */
interface FormSelectProps {
  icon: typeof User;
  label: string;
  name: keyof FormData;
  options: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  placeholder?: string;
}

function FormSelect({
  icon: Icon,
  label,
  name,
  options,
  value,
  onChange,
  required,
  placeholder,
}: FormSelectProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-bold text-orange-100">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-400/70" />
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full pl-12 pr-4 py-3 rounded-xl fire-glass border border-orange-500/30 focus:border-orange-500/60 focus:outline-none focus:ring-2 focus:ring-orange-500/20 bg-transparent text-orange-100 transition-all appearance-none cursor-pointer"
        >
          <option value="" className="bg-neutral-900 text-orange-100">
            {placeholder || `Select ${label}`}
          </option>
          {options.map((option) => (
            <option key={option} value={option} className="bg-neutral-900 text-orange-100">
              {option}
            </option>
          ))}
        </select>
        <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-400/70 rotate-90" />
      </div>
    </div>
  );
}

/* ======= Form Textarea Component ======= */
interface FormTextareaProps {
  label: string;
  name: keyof FormData;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
}

function FormTextarea({
  label,
  name,
  placeholder,
  value,
  onChange,
  rows = 4,
}: FormTextareaProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-bold text-orange-100">
        {label}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-4 py-3 rounded-xl fire-glass border border-orange-500/30 focus:border-orange-500/60 focus:outline-none focus:ring-2 focus:ring-orange-500/20 bg-transparent text-orange-100 placeholder-orange-300/40 transition-all resize-none"
      />
    </div>
  );
}

/* ======= Main Registration Form Component ======= */
export default function RegistrationForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  /* ======= GSAP Scroll Animations ======= */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        formRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ======= Handle Input Change ======= */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  /* ======= Validate Current Step ======= */
  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    switch (step) {
      case 1:
        if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
        if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
        else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, "")))
          newErrors.phone = "Invalid phone number";
        break;
      case 2:
        if (!formData.college.trim()) newErrors.college = "College name is required";
        if (!formData.branch.trim()) newErrors.branch = "Branch is required";
        if (!formData.year) newErrors.year = "Year is required";
        break;
      case 3:
        if (!formData.teamName.trim()) newErrors.teamName = "Team name is required";
        if (!formData.skills.trim()) newErrors.skills = "Please mention your skills";
        break;
      case 4:
        if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ======= Handle Next Step ======= */
  const handleNextStep = () => {
    if (validateStep(currentStep) && currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
      // Scroll form into view
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  /* ======= Handle Previous Step ======= */
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  /* ======= Handle Form Submit ======= */
  // NOTE: This function is prepared for future API integration
  // Replace the setTimeout with actual API call
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);

    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      // if (!response.ok) throw new Error('Registration failed');

      // Simulated API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Form submitted:", formData);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
      setErrors({ fullName: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ======= Render Step Content ======= */
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <FormInput
              icon={User}
              label="Full Name"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
              error={errors.fullName}
            />
            <FormInput
              icon={Mail}
              label="Email Address"
              name="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              required
              error={errors.email}
            />
            <FormInput
              icon={Phone}
              label="Phone Number"
              name="phone"
              type="tel"
              placeholder="10-digit phone number"
              value={formData.phone}
              onChange={handleChange}
              required
              error={errors.phone}
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <FormInput
              icon={School}
              label="College/University"
              name="college"
              placeholder="Enter your college name"
              value={formData.college}
              onChange={handleChange}
              required
              error={errors.college}
            />
            <FormInput
              icon={Code}
              label="Branch/Department"
              name="branch"
              placeholder="e.g., Computer Engineering"
              value={formData.branch}
              onChange={handleChange}
              required
              error={errors.branch}
            />
            <FormSelect
              icon={School}
              label="Year of Study"
              name="year"
              options={YEAR_OPTIONS}
              value={formData.year}
              onChange={handleChange}
              required
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <FormInput
              icon={Users}
              label="Team Name"
              name="teamName"
              placeholder="Enter your team name"
              value={formData.teamName}
              onChange={handleChange}
              required
              error={errors.teamName}
            />
            <FormSelect
              icon={Users}
              label="Team Size"
              name="teamSize"
              options={TEAM_SIZE_OPTIONS}
              value={formData.teamSize}
              onChange={handleChange}
            />
            <FormSelect
              icon={Code}
              label="Experience Level"
              name="experience"
              options={EXPERIENCE_OPTIONS}
              value={formData.experience}
              onChange={handleChange}
            />
            <FormInput
              icon={Code}
              label="Skills"
              name="skills"
              placeholder="e.g., React, Python, Machine Learning"
              value={formData.skills}
              onChange={handleChange}
              required
              error={errors.skills}
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <FormInput
              icon={Code}
              label="GitHub Profile URL"
              name="githubUrl"
              placeholder="https://github.com/username"
              value={formData.githubUrl}
              onChange={handleChange}
            />
            <FormInput
              icon={User}
              label="LinkedIn Profile URL"
              name="linkedinUrl"
              placeholder="https://linkedin.com/in/username"
              value={formData.linkedinUrl}
              onChange={handleChange}
            />
            <FormTextarea
              label="Project Idea (Optional)"
              name="projectIdea"
              placeholder="Briefly describe your project idea..."
              value={formData.projectIdea}
              onChange={handleChange}
            />
            <FormSelect
              icon={User}
              label="T-Shirt Size"
              name="tshirtSize"
              options={TSHIRT_OPTIONS}
              value={formData.tshirtSize}
              onChange={handleChange}
            />
            <FormInput
              icon={User}
              label="Dietary Restrictions"
              name="dietaryRestrictions"
              placeholder="e.g., Vegetarian, Vegan, None"
              value={formData.dietaryRestrictions}
              onChange={handleChange}
            />

            {/* Terms Agreement */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="mt-1 w-5 h-5 rounded border-orange-500/30 bg-transparent focus:ring-orange-500 text-orange-500 accent-orange-500"
              />
              <label className="text-sm text-orange-200/80">
                I agree to the{" "}
                <a href="#" className="text-orange-400 hover:underline font-semibold">
                  Terms & Conditions
                </a>{" "}
                and{" "}
                <a href="#" className="text-orange-400 hover:underline font-semibold">
                  Code of Conduct
                </a>
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-red-400 text-sm flex items-center gap-1">
                <AlertCircle className="w-4 h-4" /> {errors.agreeToTerms}
              </p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  /* ======= Success Message ======= */
  if (isSubmitted) {
    return (
      <section
        ref={sectionRef}
        id="register"
        className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-red-950/20 via-neutral-950 to-black"
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center animate-fire-pulse">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="fire-gradient-text">Registration Successful!</span>
            </h2>
            <p className="text-xl text-orange-200/80 mb-8">
              Thank you for registering for Hackverse 2026. We&apos;ve sent a confirmation
              email to <strong className="text-orange-400">{formData.email}</strong>.
            </p>
            <p className="text-orange-200/70 flex items-center justify-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              See you at the hackathon!
              <Flame className="w-5 h-5 text-orange-500" />
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="register"
      className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-black via-neutral-950 to-red-950/20"
    >
      {/* ======= Background Elements ======= */}
      <div className="absolute inset-0 aggressive-lines opacity-5" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* ======= Section Title ======= */}
        <div ref={titleRef} className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-600/20 to-red-600/20 border border-orange-500/30 text-orange-400 text-sm font-bold mb-4">
            <Flame className="w-4 h-4 animate-pulse" />
            Limited Spots Available
            <Flame className="w-4 h-4 animate-pulse" />
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4">
            <span className="fire-gradient-text">Register Now</span>
          </h2>
          <p className="text-xl text-orange-200/80 max-w-2xl mx-auto font-semibold">
            Secure your spot at Hackverse 2026 and ignite your coding journey
          </p>
        </div>

        {/* ======= Step Indicators ======= */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-2 md:gap-4">
            {FORM_STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    currentStep >= step.id
                      ? "bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 text-white shadow-lg shadow-orange-500/30"
                      : "fire-glass border border-orange-500/30 text-orange-200/70"
                  }`}
                >
                  <step.icon className="w-5 h-5" />
                  <span className="hidden md:inline text-sm font-bold">
                    {step.title}
                  </span>
                </div>
                {index < FORM_STEPS.length - 1 && (
                  <div
                    className={`w-8 md:w-12 h-1 mx-2 rounded-full transition-all duration-300 ${
                      currentStep > step.id
                        ? "bg-gradient-to-r from-orange-500 to-red-500"
                        : "bg-orange-500/20"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ======= Registration Form ======= */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto fire-glass rounded-3xl p-8 md:p-12 border border-orange-500/30 fire-glow-box"
        >
          {/* Step Title */}
          <h3 className="text-2xl font-black text-orange-100 mb-6 flex items-center gap-2">
            <Flame className="w-6 h-6 text-orange-500" />
            Step {currentStep}: {FORM_STEPS[currentStep - 1].title}
          </h3>

          {/* Step Content */}
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-orange-500/20">
            <button
              type="button"
              onClick={handlePrevStep}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                currentStep === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "fire-glass hover:bg-orange-500/10 border border-orange-500/30 hover:border-orange-500/60 text-orange-200"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </button>

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="group flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 bg-[length:200%_100%] text-white font-black uppercase tracking-wider hover:shadow-lg hover:shadow-orange-500/40 transition-all duration-300 hover:scale-105 animate-gradient"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 bg-[length:200%_100%] text-white font-black uppercase tracking-wider hover:shadow-lg hover:shadow-orange-500/40 transition-all duration-300 hover:scale-105 animate-gradient disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Flame className="w-5 h-5" />
                    Submit Registration
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>

      {/* ======= Decorative Fire Glow Orbs ======= */}
      <div className="absolute -left-32 top-1/4 w-64 h-64 bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -right-32 bottom-1/4 w-64 h-64 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
}
