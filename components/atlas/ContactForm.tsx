"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Link } from "@/i18n/navigation";

const GOALS = ["creation", "redesign", "product", "marketing", "other"] as const;

export function ContactForm() {
  const t = useTranslations("form");
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setState("success");
      form.reset();
    } catch {
      setState("error");
    }
  }

  return (
    <form onSubmit={submit} className="form">
      <div className="form-row">
        <label className="field">
          {t("firstName")}
          <input
            name="firstName"
            autoComplete="given-name"
            required
            maxLength={60}
            placeholder={t("firstNamePlaceholder")}
          />
        </label>
        <label className="field">
          {t("company")}
          <input
            name="company"
            autoComplete="organization"
            required
            maxLength={120}
            placeholder={t("companyPlaceholder")}
          />
        </label>
      </div>
      <label className="field">
        {t("email")}
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          placeholder={t("emailPlaceholder")}
        />
      </label>
      <label className="field">
        {t("goal")}
        <select name="projectGoal" required defaultValue="">
          <option value="" disabled>
            {t("goalPlaceholder")}
          </option>
          {GOALS.map((g) => (
            <option key={g} value={g}>
              {t(`goals.${g}`)}
            </option>
          ))}
        </select>
      </label>
      <label className="field">
        {t("message")}
        <textarea
          name="message"
          rows={4}
          maxLength={3000}
          placeholder={t("messagePlaceholder")}
        />
      </label>
      <div className="honeypot" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <p className="form-note">
        {t("privacy")}{" "}
        <Link href="/legal/politique-confidentialite">{t("privacyLink")}</Link>
      </p>
      <button className="btn" disabled={state === "sending"} type="submit">
        {state === "sending" ? t("sending") : t("send")}
      </button>
      <div
        className="form-status"
        role="status"
        aria-live="polite"
        data-state={state}
      >
        {state === "success" && t("success")}
        {state === "error" && t("error")}
      </div>
    </form>
  );
}
