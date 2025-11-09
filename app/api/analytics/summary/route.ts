import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    // Get visitors in last 24 hours
    const visitors = await prisma.visitor.findMany({
      where: {
        firstSeen: {
          gte: oneDayAgo
        }
      },
      include: {
        pageViews: true
      }
    });

    // Calculate metrics
    const totalVisitors = visitors.length;
    const totalPageViews = visitors.reduce((sum, v) => sum + v.pageViews.length, 0);

    // Active now (last 5 minutes)
    const fiveMinAgo = new Date(now.getTime() - 5 * 60 * 1000);
    const activeNow = await prisma.visitor.count({
      where: {
        lastSeen: {
          gte: fiveMinAgo
        }
      }
    });

    // Traffic sources
    const organic = visitors.filter(v => v.referrerDomain?.includes('google') || v.referrerDomain?.includes('bing')).length;
    const direct = visitors.filter(v => !v.referrer || v.referrer === 'Direct').length;
    const referral = visitors.filter(v => v.referrer && v.referrer !== 'Direct' && !v.referrerDomain?.includes('google') && !v.referrerDomain?.includes('bing')).length;
    const social = visitors.filter(v => v.referrerDomain?.includes('facebook') || v.referrerDomain?.includes('twitter') || v.referrerDomain?.includes('instagram')).length;

    // Device breakdown
    const mobile = visitors.filter(v => v.device === 'Mobile').length;
    const desktop = visitors.filter(v => v.device === 'Desktop').length;
    const tablet = visitors.filter(v => v.device === 'Tablet').length;

    // Competitor tracking
    const competitorVisits = visitors.filter(v => v.isCompetitor).length;
    const vpnDetections = visitors.filter(v => v.isVpn).length;

    return NextResponse.json({
      totalVisitors,
      totalPageViews,
      activeNow,
      traffic: {
        organic,
        direct,
        referral,
        social
      },
      devices: {
        mobile,
        desktop,
        tablet
      },
      security: {
        competitorVisits,
        vpnDetections
      }
    });

  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
