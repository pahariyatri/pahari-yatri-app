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
        joinType: data.joinType,
        destination: data.destination || 'N/A',
        season: data.season || 'N/A',
        companionship: data.companionship || 'N/A',
        energy: data.energy || 0,
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
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-background px-4 sm:px-6 py-6 md:py-12 overflow-x-hidden">
      <ApplicationForm onSubmit={handleSubmit} />
      {loading && (
        <p className="text-center mt-6 text-sm text-muted-foreground animate-pulse">
          Sending your application…
        </p>
      )}
    </div>
  );
}
