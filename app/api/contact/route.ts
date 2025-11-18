import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message } = body;

    // Validate required fields
    if (!name || !email || !phone || !service) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Format service type for display
    const serviceLabels: Record<string, string> = {
      residential: 'Residential',
      commercial: 'Commercial',
      construction: 'Construction',
      recycling: 'Recycling',
      rolloff: 'Roll-Off Dumpster',
      junk: 'Junk Removal',
    };

    // Email content
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #FF8C69, #FF6B45); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">New Quote Request</h1>
        </div>

        <div style="padding: 20px; background: #f5f5f5;">
          <h2 style="color: #1A2B4A; margin-top: 0;">Contact Information</h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold; width: 120px;">Name:</td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Email:</td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">
                <a href="mailto:${email}">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Phone:</td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">
                <a href="tel:${phone}">${phone}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Service:</td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${serviceLabels[service] || service}</td>
            </tr>
          </table>

          ${message ? `
            <h3 style="color: #1A2B4A; margin-top: 20px;">Message</h3>
            <div style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #FF8C69;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          ` : ''}
        </div>

        <div style="padding: 15px; background: #1A2B4A; text-align: center;">
          <p style="color: #E8DCC4; margin: 0; font-size: 12px;">
            This quote request was submitted from patriotdisposalphx.com
          </p>
        </div>
      </div>
    `;

    // Send email to Patriot Disposal
    await transporter.sendMail({
      from: `"Patriot Disposal Website" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || 'info@pdphx.com',
      replyTo: email,
      subject: `New Quote Request - ${serviceLabels[service] || service} - ${name}`,
      html: emailHtml,
    });

    // Send confirmation email to customer
    const confirmationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #FF8C69, #FF6B45); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Thank You!</h1>
        </div>

        <div style="padding: 20px; background: #f5f5f5;">
          <p style="font-size: 16px; color: #333;">
            Hi ${name},
          </p>

          <p style="font-size: 16px; color: #333;">
            Thank you for contacting Patriot Disposal Phoenix! We've received your quote request for <strong>${serviceLabels[service] || service}</strong> service.
          </p>

          <p style="font-size: 16px; color: #333;">
            One of our team members will review your request and get back to you within 24 hours. If you need immediate assistance, please call us at <a href="tel:480-851-2000" style="color: #FF6B45;">480-851-2000</a>.
          </p>

          <div style="background: #1A2B4A; padding: 20px; border-radius: 5px; margin-top: 20px; text-align: center;">
            <p style="color: #E8DCC4; margin: 0 0 10px 0; font-weight: bold;">
              Patriot Disposal. Locally owned. Veteran proud. Valley strong.
            </p>
          </div>
        </div>

        <div style="padding: 15px; background: #1A2B4A; text-align: center;">
          <p style="color: #E8DCC4; margin: 0; font-size: 12px;">
            Patriot Disposal Phoenix | 480-851-2000 | info@pdphx.com
          </p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Patriot Disposal Phoenix" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Thank you for your quote request - Patriot Disposal Phoenix',
      html: confirmationHtml,
    });

    // Also save to VPS backend if available
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      await fetch(`${apiUrl}/api/patriot/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, service, message }),
      });
    } catch (dbError) {
      // Log but don't fail if DB save fails
      console.error('Failed to save to database:', dbError);
    }

    return NextResponse.json({ success: true, message: 'Quote request sent successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
