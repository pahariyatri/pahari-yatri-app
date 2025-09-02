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

  const handleSubmit = async (data: FormData) => {
    console.log("Form Data Submitted:", data);

    setLoading(true);

    try {
      // 1️⃣ Send email to admin (with all details)
      const adminRes = await sendEmail(TEMPLATE_ID_ADMIN, {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        calling: data.calling,
        season: data.season,
        companionship: data.companionship,
        energy: data.energy,
        pastExperiences: data.pastExperiences,
        expectations: data.expectations
      });
      console.log("Admin email sent:", adminRes);

      // 2️⃣ Auto-reply to user using the EmailJS template
      // Only pass the variables that the template expects
      // User auto-reply
      const userRes = await sendEmail(TEMPLATE_ID_USER, {
        fullName: data.fullName,
        email: data.email
      });
      console.log("Auto-reply email sent:", userRes);
      alert("Form submitted and emails sent successfully!");
    } catch (err) {
      console.error("Email sending error:", err);
      alert("Failed to send emails. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mb-16 md:mb-20 px-4 sm:px-0">
      <ApplicationForm onSubmit={handleSubmit} />
      {loading && <p className="text-center mt-4 text-sm text-muted-foreground">Sending emails...</p>}
    </div>
  );
}
