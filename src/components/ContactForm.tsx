import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle2, AlertCircle, Mail, Sparkles } from "lucide-react";
import { siteConfig } from "../config/site";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { buttonSpringTransition } from "./motion/MotionButton";
import { InteractiveCard } from "./motion/InteractiveCard";

const schema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name too long"),
  email: z.string().email("Please enter a valid email address"),
  subject: z
    .string()
    .min(3, "Subject must be at least 3 characters")
    .max(120, "Subject too long"),
  message: z
    .string()
    .min(15, "Message must be at least 15 characters")
    .max(2000, "Message is too long"),
});

type FormValues = z.infer<typeof schema>;
type FormStatus = "idle" | "submitted";

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [arrowClicked, setArrowClicked] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema), mode: "onBlur" });

  const onSubmit = (data: FormValues) => {
    setArrowClicked(true);
    setTimeout(() => setArrowClicked(false), 500);

    const subject = encodeURIComponent(data.subject);
    const body = encodeURIComponent(
      `Hi Hemanth,\n\n${data.message}\n\n— From: ${data.name}\n— Email: ${data.email}`
    );
    window.location.href = `mailto:${siteConfig.personalEmail}?subject=${subject}&body=${body}`;
    setStatus("submitted");
  };

  if (status === "submitted") {
    return (
      <InteractiveCard accent="blue" className="p-8 sm:p-10 flex flex-col items-center gap-5 text-center shadow-xl">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
          style={{
            background: "rgba(16, 185, 129, 0.15)",
            border: "2px solid rgba(16, 185, 129, 0.4)",
          }}
        >
          <CheckCircle2 size={32} className="text-emerald-500" />
        </div>
        <h3 className="font-black text-[var(--text-primary)] text-xl">
          Email Client Triggered!
        </h3>
        <p className="text-sm text-[var(--text-secondary)] max-w-sm leading-relaxed font-normal">
          Your mail application should now open with your message prepared. If it didn't open automatically, you can email me directly at:
        </p>
        <a
          href={`mailto:${siteConfig.personalEmail}`}
          className="font-bold text-sm text-[var(--accent-blue)] underline underline-offset-4 hover:opacity-80 transition-opacity"
        >
          {siteConfig.personalEmail}
        </a>
        <button
          type="button"
          onClick={() => {
            reset();
            setStatus("idle");
          }}
          className="btn-ghost text-sm mt-3 font-bold"
        >
          Send Another Message
        </button>
      </InteractiveCard>
    );
  }

  return (
    <InteractiveCard
      as="form"
      accent="blue"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="p-6 sm:p-8 flex flex-col gap-5 shadow-xl"
      aria-label="Contact form"
    >
      <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
        <div className="flex items-center gap-3">
          <span
            className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm"
            style={{
              background: "rgba(91, 140, 255, 0.15)",
              border: "1px solid rgba(91, 140, 255, 0.3)",
            }}
          >
            <Mail size={18} className="text-[var(--accent-blue)]" aria-hidden="true" />
          </span>
          <div>
            <h3 className="font-bold text-[var(--text-primary)] text-base">
              Send a Direct Message
            </h3>
            <p className="text-xs text-[var(--text-muted)] font-medium">
              I'll get back to you as soon as possible.
            </p>
          </div>
        </div>
        <Sparkles size={16} className="text-[var(--accent-violet)] animate-pulse" />
      </div>

      {/* Name and Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="name"
            className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]"
          >
            Your Name <span className="text-rose-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="John Doe"
            aria-required="true"
            aria-invalid={!!errors.name}
            className={`form-input ${errors.name ? "error" : ""}`}
            {...register("name")}
          />
          {errors.name && (
            <p role="alert" className="text-xs text-rose-500 flex items-center gap-1 font-semibold mt-0.5">
              <AlertCircle size={12} aria-hidden="true" />
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="email"
            className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]"
          >
            Email Address <span className="text-rose-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="john@example.com"
            aria-required="true"
            aria-invalid={!!errors.email}
            className={`form-input ${errors.email ? "error" : ""}`}
            {...register("email")}
          />
          {errors.email && (
            <p role="alert" className="text-xs text-rose-500 flex items-center gap-1 font-semibold mt-0.5">
              <AlertCircle size={12} aria-hidden="true" />
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      {/* Subject */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="subject"
          className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]"
        >
          Subject <span className="text-rose-500">*</span>
        </label>
        <input
          id="subject"
          type="text"
          placeholder="Internship opportunity / Collaboration inquiry"
          aria-required="true"
          aria-invalid={!!errors.subject}
          className={`form-input ${errors.subject ? "error" : ""}`}
          {...register("subject")}
        />
        {errors.subject && (
          <p role="alert" className="text-xs text-rose-500 flex items-center gap-1 font-semibold mt-0.5">
            <AlertCircle size={12} aria-hidden="true" />
            {errors.subject.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="message"
          className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]"
        >
          Message <span className="text-rose-500">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Hello Hemanth, I came across your portfolio and would like to talk about..."
          aria-required="true"
          aria-invalid={!!errors.message}
          className={`form-input resize-none ${errors.message ? "error" : ""}`}
          {...register("message")}
        />
        {errors.message && (
          <p role="alert" className="text-xs text-rose-500 flex items-center gap-1 font-semibold mt-0.5">
            <AlertCircle size={12} aria-hidden="true" />
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Send Message Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={shouldReduceMotion ? undefined : { scale: 1.04, y: -2 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
        transition={buttonSpringTransition}
        className="btn-primary flex items-center justify-center gap-2.5 py-3 shadow-md mt-1 cursor-pointer font-bold"
        aria-label="Send message — will open your email client"
      >
        <span>Send Message</span>
        <motion.span
          animate={
            arrowClicked && !shouldReduceMotion
              ? { x: [0, 8, 0] }
              : { x: 0 }
          }
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="inline-flex items-center"
        >
          <Send size={16} aria-hidden="true" />
        </motion.span>
      </motion.button>

      {/* Footnote */}
      <p className="text-xs text-[var(--text-muted)] text-center leading-relaxed font-normal">
        Submitting safely opens your default email client with your message pre-composed.
      </p>
    </InteractiveCard>
  );
}
