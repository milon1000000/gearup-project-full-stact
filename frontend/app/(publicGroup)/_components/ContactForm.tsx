"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, Loader2, CheckCircle2 } from "lucide-react";

type ContactFormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const ContactForm = () => {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<ContactFormValues>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = (): boolean => {
    const nextErrors: Partial<ContactFormValues> = {};

    if (!values.name.trim()) nextErrors.name = "Please enter your name.";
    if (!values.email.trim()) {
      nextErrors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!values.subject.trim()) nextErrors.subject = "Please add a subject.";
    if (!values.message.trim()) {
      nextErrors.message = "Please write your message.";
    } else if (values.message.trim().length < 10) {
      nextErrors.message = "Message should be at least 10 characters long.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    // Simulated API call — backend contact endpoint can be plugged in later.
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setValues(initialValues);
      toast.success("Message sent successfully! We'll get back to you soon.", {
        duration: 4000,
      });
      setTimeout(() => setSubmitted(false), 4000);
    }, 1200);
  };

  const inputClass = (hasError?: string) =>
    `w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-colors ${
      hasError
        ? "border-rose-300 focus:ring-rose-200"
        : "border-slate-200 focus:ring-emerald-200 focus:border-emerald-400"
    }`;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 space-y-5"
      noValidate
    >
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <Send className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">Send us a message</h3>
          <p className="text-xs text-slate-500">
            We usually respond within 24 hours.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-xs font-bold text-slate-700">
            Full Name
          </Label>
          <Input
            id="name"
            name="name"
            placeholder="John Doe"
            value={values.name}
            onChange={handleChange}
            className={inputClass(errors.name)}
          />
          {errors.name && (
            <p className="text-[11px] font-medium text-rose-500">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-xs font-bold text-slate-700">
            Email Address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            value={values.email}
            onChange={handleChange}
            className={inputClass(errors.email)}
          />
          {errors.email && (
            <p className="text-[11px] font-medium text-rose-500">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Subject */}
      <div className="space-y-1.5">
        <Label htmlFor="subject" className="text-xs font-bold text-slate-700">
          Subject
        </Label>
        <Input
          id="subject"
          name="subject"
          placeholder="How can we help you?"
          value={values.subject}
          onChange={handleChange}
          className={inputClass(errors.subject)}
        />
        {errors.subject && (
          <p className="text-[11px] font-medium text-rose-500">{errors.subject}</p>
        )}
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <Label htmlFor="message" className="text-xs font-bold text-slate-700">
          Message
        </Label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell us about your query, gear request, or feedback..."
          value={values.message}
          onChange={handleChange}
          className={`${inputClass(errors.message)} resize-none`}
        />
        {errors.message && (
          <p className="text-[11px] font-medium text-rose-500">{errors.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-11 rounded-xl text-sm font-semibold gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 transition-all"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : submitted ? (
          <>
            <CheckCircle2 className="h-4 w-4" />
            Message Sent!
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
};

export default ContactForm;
