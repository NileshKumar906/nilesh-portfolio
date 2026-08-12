const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(request, response) {
  if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed.' });
  const { name, email, message } = request.body || {};
  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string' || !name.trim() || !emailPattern.test(email) || message.trim().length < 10) {
    return response.status(400).json({ error: 'Please provide a name, valid email, and a message of at least 10 characters.' });
  }
  if (!process.env.RESEND_API_KEY) return response.status(503).json({ error: 'Contact service is not configured yet.' });
  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>',
        to: [process.env.CONTACT_TO_EMAIL || 'nileshkumar3291@gmail.com'],
        reply_to: email.trim(),
        subject: `Portfolio message from ${name.trim()}`,
        text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`
      })
    });
    if (!resendResponse.ok) throw new Error('Email provider rejected the request.');
    return response.status(200).json({ ok: true });
  } catch {
    return response.status(502).json({ error: 'Unable to send your message right now.' });
  }
}
