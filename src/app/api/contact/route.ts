import { NextResponse } from "next/server";

const MAX_TEXT = 4000;

function asString(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function clamp(value: string, max = MAX_TEXT) {
  return value.length > max ? value.slice(0, max) : value;
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = clamp(asString(formData.get("name")), 120);
    const email = clamp(asString(formData.get("email")), 180);
    const projectDetails = clamp(asString(formData.get("projectDetails")));
    const timeline = clamp(asString(formData.get("timeline")), 120);
    const budget = clamp(asString(formData.get("budget")), 120);
    const links = clamp(asString(formData.get("links")));
    const preferredCallTimes = clamp(asString(formData.get("preferredCallTimes")));

    if (!name || !email || !projectDetails || !timeline) {
      return NextResponse.json(
        { ok: false, error: "Please fill out name, email, project details, and timeline." },
        { status: 400 }
      );
    }

    if (!isEmail(email)) {
      return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "Surge Studios <onboarding@resend.dev>";

    if (!apiKey || !toEmail) {
      return NextResponse.json(
        { ok: false, error: "Contact form is not configured yet. Add server email env vars." },
        { status: 500 }
      );
    }

    const textBody = [
      "New contact request",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Timeline: ${timeline}`,
      `Budget: ${budget || "Not provided"}`,
      `Preferred call times: ${preferredCallTimes || "Not provided"}`,
      `Links: ${links || "Not provided"}`,
      "",
      "Project details:",
      projectDetails,
    ].join("\n");

    const htmlBody = `
      <h2>New contact request</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Timeline:</strong> ${escapeHtml(timeline)}</p>
      <p><strong>Budget:</strong> ${escapeHtml(budget || "Not provided")}</p>
      <p><strong>Preferred call times:</strong> ${escapeHtml(preferredCallTimes || "Not provided")}</p>
      <p><strong>Links:</strong> ${escapeHtml(links || "Not provided")}</p>
      <p><strong>Project details:</strong></p>
      <p>${escapeHtml(projectDetails).replace(/\n/g, "<br />")}</p>
    `;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `New contact form submission from ${name}`,
        text: textBody,
        html: htmlBody,
      }),
      cache: "no-store",
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      return NextResponse.json(
        { ok: false, error: `Email service error: ${errorText || "unknown error"}` },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Unable to process request." }, { status: 500 });
  }
}
