'use client';

import { useState } from "react";
import ApplicationForm, { FormData } from "@/components/application/ApplicationForm";

const SERVICE_ID = "service_3mxxtu5";
const TEMPLATE_ID_ADMIN = "template_551jcgp";
const TEMPLATE_ID_USER = "template_g09dzas";
const PUBLIC_KEY = "NKn2i3MMvUbCJLxLa";

export default function Apply() {
  const [loading, setLoading] = useState(false);

  const sendEmail = async (templateId: string, templateParams: object) => {
    const payload = {
      service_id: SERVICE_ID,
      template_id: templateId,
      user_id: PUBLIC_KEY,
      template_params: templateParams
    };

    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "Failed to send email");
    }

    // ✅ EmailJS sends plain text "OK" on success
    const text = await res.text();
    return text;
  };

  const notifyDiscord = async (data: FormData) => {
    await fetch("/api/discord", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "apply", ...data }),
    });
  };

  const handleSubmit = async (data: FormData) => {
    setLoading(true);

    try {
      // Notify Discord (free, instant)
      await notifyDiscord(data);

      // Send email to admin via EmailJS
      await sendEmail(TEMPLATE_ID_ADMIN, {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        calling: data.calling,
        season: data.season,
        companionship: data.companionship,
        energy: data.energy,
        pastExperiences: data.pastExperiences,
        expectations: data.expectations,
      });

      // Auto-reply to applicant
      await sendEmail(TEMPLATE_ID_USER, {
        fullName: data.fullName,
        email: data.email,
      });
    } catch (err) {
      console.error("Submission error:", err);
      // Discord may have succeeded even if email failed — don't surface error to user
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mb-16 md:mb-20 px-4 sm:px-6">
      {/* Page header — context + trust for first-time visitors */}
      <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
        <span className="inline-block text-primary text-xs sm:text-sm font-bold tracking-[0.2em] uppercase mb-4">
          Begin Your Yatra
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-brandSerif font-medium mb-5 leading-tight">
          Apply to Walk With Us
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          We don&apos;t sell seats — we welcome seekers. Tell us your intention,
          and we&apos;ll match you to a journey that fits your spirit and your
          fitness.
        </p>
        <p className="mt-4 text-sm text-muted-foreground/70">
          ✦ We read every application personally and reply within 24 hours.
        </p>
      </div>

      <ApplicationForm onSubmit={handleSubmit} />
      {loading && (
        <p className="text-center mt-6 text-sm text-muted-foreground animate-pulse">
          Sending your application…
        </p>
      )}
    </div>
  );
}
