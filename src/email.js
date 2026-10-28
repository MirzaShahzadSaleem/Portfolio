import emailjs from "@emailjs/browser";
import { profile } from "./data/content";

const { REACT_APP_EMAILJS_SERVICE_ID: SERVICE, REACT_APP_EMAILJS_TEMPLATE_ID: TEMPLATE, REACT_APP_EMAILJS_PUBLIC_KEY: KEY } = process.env;

export const emailConfigured = Boolean(SERVICE && TEMPLATE && KEY);

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

// Table layout with inline styles, since email clients ignore most <style> blocks.
export function notificationHtml({ name, email, message, sentAt }) {
  const row = (label, value) => `
    <tr><td style="padding:0 0 18px">
      <div style="font:700 11px/1 Helvetica,Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#8a8ea6;margin-bottom:6px">${label}</div>
      <div style="font:500 16px/1.5 Helvetica,Arial,sans-serif;color:#1a1b2e">${value}</div>
    </td></tr>`;
  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#f3f2fb">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f2fb;padding:32px 12px"><tr><td align="center">
  <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #e6e5f3">
    <tr><td style="background:#5b5bf7;background-image:linear-gradient(135deg,#5b5bf7,#ff8a65);padding:26px 32px">
      <table role="presentation" cellpadding="0" cellspacing="0"><tr>
        <td style="width:46px;height:46px;border-radius:14px;background:rgba(255,255,255,.22);text-align:center;font:700 17px/46px Helvetica,Arial,sans-serif;color:#fff">SS</td>
        <td style="padding-left:14px;font:700 19px/1.3 Helvetica,Arial,sans-serif;color:#fff">New message from your portfolio<div style="font:500 13px/1.4 Helvetica,Arial,sans-serif;opacity:.85">${esc(sentAt)}</div></td>
      </tr></table>
    </td></tr>
    <tr><td style="padding:30px 32px 12px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${row("From", esc(name))}
      ${row("Email", `<a href="mailto:${esc(email)}" style="color:#5b5bf7;text-decoration:none">${esc(email)}</a>`)}
      ${row("Message", `<div style="background:#f7f7fd;border-left:3px solid #5b5bf7;border-radius:8px;padding:14px 16px;white-space:pre-wrap">${esc(message)}</div>`)}
    </table></td></tr>
    <tr><td style="padding:0 32px 32px">
      <a href="mailto:${esc(email)}?subject=${encodeURIComponent("Re: your message on " + profile.name + "'s portfolio")}" style="display:inline-block;background:#1a1b2e;color:#fff;text-decoration:none;font:600 14px/1 Helvetica,Arial,sans-serif;padding:13px 22px;border-radius:12px">Reply to ${esc(name)}</a>
    </td></tr>
    <tr><td style="padding:16px 32px;background:#faf9fe;border-top:1px solid #eeedf7;font:12px/1.5 Helvetica,Arial,sans-serif;color:#8a8ea6">Sent from the contact form on ${esc(profile.name)}'s portfolio. The message is also saved in Firestore.</td></tr>
  </table>
</td></tr></table>
</body></html>`;
}

export function sendNotification({ name, email, message }) {
  const sentAt = new Date().toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" });
  return emailjs.send(
    SERVICE,
    TEMPLATE,
    {
      subject: `New portfolio message from ${name}`,
      from_name: name,
      reply_to: email,
      html: notificationHtml({ name, email, message, sentAt }),
    },
    KEY
  );
}
