import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      sessionId,
      path,
      title,
      referrer,
      utm_source,
      utm_medium,
      utm_campaign
    } = body;

    // Get IP address
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown';

    // Get User Agent
    const userAgent = request.headers.get('user-agent') || '';

    // TODO: Add third-party API calls here for:
    // - IP Geolocation (ipinfo.io, maxmind)
    // - Company detection (clearbit)
    // - VPN detection (ipqualityscore)
    // - Device fingerprinting (fingerprintjs)

    // For now, basic parsing
    const isMobile = /mobile|android|iphone|ipad/i.test(userAgent);
    const isTablet = /tablet|ipad/i.test(userAgent);
    const device = isTablet ? 'Tablet' : (isMobile ? 'Mobile' : 'Desktop');

    // Get or create visitor
    let visitor = await prisma.visitor.findFirst({
      where: { sessionId }
    });

    if (!visitor) {
      visitor = await prisma.visitor.create({
        data: {
          sessionId,
          ipAddress: ip,
          userAgent,
          device,
          referrer,
          utmSource: utm_source,
          utmMedium: utm_medium,
          utmCampaign: utm_campaign,
        }
      });
    } else {
      // Update last seen
      visitor = await prisma.visitor.update({
        where: { id: visitor.id },
        data: { lastSeen: new Date() }
      });
    }

    // Track page view
    await prisma.pageView.create({
      data: {
        visitorId: visitor.id,
        path,
        title
      }
    });

    return NextResponse.json({ success: true, visitorId: visitor.id });

  } catch (error) {
    console.error('Track error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to track visit' },
      { status: 500 }
    );
  }
}
