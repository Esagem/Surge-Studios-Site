"use client";

import { FormEvent, useState } from "react";
import InteractiveCard from "@/components/InteractiveCard";
import SiteFooter from "@/components/SiteFooter";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitState("idle");
    setSubmitMessage("");

    try {
      const form = event.currentTarget;
      const formData = new FormData(form);
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const payload = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || "Unable to send details right now.");
      }

      form.reset();
      setSubmitState("success");
      setSubmitMessage("Thanks. Your details were sent.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to send details right now.";
      setSubmitState("error");
      setSubmitMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <main className="page-section">
        <section className="mx-auto w-full max-w-6xl px-5 sm:px-6">
          <p className="hero-kicker text-xs">Contact</p>
          <h1 className="display-heading mt-3 text-4xl font-semibold sm:text-6xl">
            Reach out. We&apos;ll keep it simple<span className="text-[rgb(var(--accent))]">.</span>
          </h1>
          <p className="mt-5 max-w-3xl text-[rgb(var(--muted))]">
            Send a short form with your timeline and goals and we will follow up quickly.
          </p>
        </section>

        <section id="book-a-call" className="mx-auto mt-12 w-full max-w-6xl px-5 sm:px-6">
          <InteractiveCard className="rounded-[2rem] border border-[rgba(var(--border)/0.9)] bg-[rgb(var(--card))] p-6 sm:p-8">
            <div id="quote" />
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="hero-kicker text-xs">Book a Call or Send a Brief</p>
                <h2 className="display-heading mt-2 text-3xl font-semibold sm:text-4xl">
                  Share your project details
                </h2>
              </div>
            </div>
            <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm">
                  Name
                  <input
                    name="name"
                    className="form-field rounded-xl border border-[rgba(var(--border)/0.9)] px-3 py-2"
                    placeholder="Your name"
                    required
                  />
                </label>
                <label className="grid gap-2 text-sm">
                  Email
                  <input
                    name="email"
                    type="email"
                    className="form-field rounded-xl border border-[rgba(var(--border)/0.9)] px-3 py-2"
                    placeholder="you@company.com"
                    required
                  />
                </label>
              </div>

              <label className="grid gap-2 text-sm">
                What are you building?
                <textarea
                  name="projectDetails"
                  className="form-field min-h-28 rounded-xl border border-[rgba(var(--border)/0.9)] px-3 py-2"
                  placeholder="Website, app, SaaS, refactor, or cleanup work"
                  required
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm">
                  Timeline
                  <select
                    name="timeline"
                    className="form-field rounded-xl border border-[rgba(var(--border)/0.9)] px-3 py-2"
                    required
                  >
                    <option>ASAP (2-4 weeks)</option>
                    <option>1-2 months</option>
                    <option>2-4 months</option>
                    <option>Exploring timeline</option>
                  </select>
                </label>
                <label className="grid gap-2 text-sm">
                  Budget range (optional)
                  <select
                    name="budget"
                    className="form-field rounded-xl border border-[rgba(var(--border)/0.9)] px-3 py-2"
                  >
                    <option>Under $10k</option>
                    <option>$10k-$25k</option>
                    <option>$25k-$50k</option>
                    <option>$50k+</option>
                    <option>Not sure yet</option>
                  </select>
                </label>
              </div>

              <label className="grid gap-2 text-sm">
                Links / wireframes (if any)
                <input
                  name="links"
                  className="form-field rounded-xl border border-[rgba(var(--border)/0.9)] px-3 py-2"
                  placeholder="Figma, Loom, site link, docs"
                />
              </label>

              <label className="grid gap-2 text-sm">
                Preferred call times (optional)
                <input
                  name="preferredCallTimes"
                  className="form-field rounded-xl border border-[rgba(var(--border)/0.9)] px-3 py-2"
                  placeholder="Weekdays after 2pm CT"
                />
              </label>

              <button
                type="submit"
                className="btn-primary mt-2 w-full rounded-2xl px-5 py-3 text-sm font-medium sm:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send details"}
              </button>
              {submitState !== "idle" ? (
                <p
                  className={`text-sm ${
                    submitState === "success"
                      ? "text-[rgb(var(--accent))]"
                      : "text-[rgb(255,120,120)]"
                  }`}
                >
                  {submitMessage}
                </p>
              ) : null}
            </form>
          </InteractiveCard>
        </section>

        <section className="mx-auto mt-14 w-full max-w-6xl px-5 pb-16 sm:px-6">
          <InteractiveCard className="rounded-[2rem] border border-[rgba(var(--border)/0.9)] bg-[rgb(var(--card))] p-8 sm:p-10">
            <h2 className="display-heading text-3xl font-semibold sm:text-4xl">What happens next</h2>
            <p className="mt-3 max-w-3xl text-[rgb(var(--muted))]">
              We review fit, reply quickly, and tell you whether we are a good
              match. If we are a fit, we will discuss a clear next-step plan with milestones.
            </p>
          </InteractiveCard>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
