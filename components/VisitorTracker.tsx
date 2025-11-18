'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { visitorApi } from '@/lib/api-client';

// Generate a simple session ID
function getSessionId(): string {
  if (typeof window === 'undefined') return '';

  let sessionId = sessionStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
}

// Get basic device info
function getDeviceInfo() {
  if (typeof window === 'undefined') return {};

  const ua = navigator.userAgent;
  let device = 'desktop';

  if (/mobile/i.test(ua)) device = 'mobile';
  else if (/tablet|ipad/i.test(ua)) device = 'tablet';

  return {
    userAgent: ua,
    device,
    referrer: document.referrer || undefined,
  };
}

// Get UTM parameters
function getUTMParams() {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get('utm_source') || undefined,
    utmMedium: params.get('utm_medium') || undefined,
    utmCampaign: params.get('utm_campaign') || undefined,
  };
}

export default function VisitorTracker() {
  const pathname = usePathname();
  const pageStartTime = useRef<number>(Date.now());
  const hasTrackedVisitor = useRef(false);

  // Track visitor on mount
  useEffect(() => {
    if (hasTrackedVisitor.current) return;

    const trackVisitor = async () => {
      try {
        const sessionId = getSessionId();
        const deviceInfo = getDeviceInfo();
        const utmParams = getUTMParams();

        await visitorApi.track({
          sessionId,
          ipAddress: 'auto', // Will be detected server-side
          ...deviceInfo,
          ...utmParams,
        });

        hasTrackedVisitor.current = true;
      } catch (error) {
        console.error('Failed to track visitor:', error);
      }
    };

    trackVisitor();
  }, []);

  // Track page views
  useEffect(() => {
    const trackPageView = async () => {
      try {
        const sessionId = getSessionId();
        const duration = Math.floor((Date.now() - pageStartTime.current) / 1000);

        await visitorApi.trackPage({
          sessionId,
          path: pathname,
          title: document.title,
          duration,
        });

        pageStartTime.current = Date.now();
      } catch (error) {
        console.error('Failed to track page view:', error);
      }
    };

    // Track page view after a short delay
    const timeout = setTimeout(trackPageView, 1000);

    return () => clearTimeout(timeout);
  }, [pathname]);

  // Track page duration on unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      try {
        const sessionId = getSessionId();
        const duration = Math.floor((Date.now() - pageStartTime.current) / 1000);

        // Use sendBeacon for reliable tracking on page unload
        // Use proxy to avoid CORS
        navigator.sendBeacon(
          `/api/proxy/patriot/visitors/page`,
          JSON.stringify({
            sessionId,
            path: pathname,
            title: document.title,
            duration,
          })
        );
      } catch (error) {
        // Silently fail on unload
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [pathname]);

  return null; // This component doesn't render anything
}
